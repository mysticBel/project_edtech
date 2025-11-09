# Arquitectura Técnica - Sistema de Exportación y Anonimización de Datos

## 📋 Referencia

**Historia de Usuario**: HU-008 - Exportación de Datos y Reportes Personalizados

---

## 🏗️ Arquitectura General

```
┌──────────────────────────────────────────────────────────────────┐
│           INTERFAZ USUARIO (Exportación de Datos)                │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Selección   │  │ Configurar  │  │  Descargar  │            │
│  │ de Datos    │  │ Formato     │  │   Archivo   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└──────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                 MOTOR DE EXPORTACIÓN                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Export Service (Node.js + Python)                       │  │
│  │                                                          │  │
│  │  1. Validar permisos del usuario                        │  │
│  │  2. Extraer datos de PostgreSQL                         │  │
│  │  3. Aplicar anonimización (GDPR/FERPA)                  │  │
│  │  4. Generar archivo (CSV, Excel, JSON, PDF)             │  │
│  │  5. Registrar auditoría                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │     AWS S3   │  │   Logs de    │
│  (Datos de   │  │  (Archivos   │  │   Auditoría  │
│   Aplicación)│  │   Generados) │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🔐 Stack Tecnológico

### Backend

- **Node.js 18+** con TypeScript
- **Express.js 4.x**
- **Python 3.9+** (Anonimización avanzada)

### Generación de Archivos

- **ExcelJS** (archivos Excel .xlsx)
- **PDFKit** (archivos PDF)
- **csv-writer** (archivos CSV)

### Almacenamiento

- **AWS S3** (archivos generados temporalmente)
- **PostgreSQL** (audit logs)

### Seguridad

- **Crypto** (Node.js) para hashing
- **Faker.js** para generación de datos sintéticos

---

## 🗄️ Modelo de Datos

### Tabla: `export_jobs`

```sql
CREATE TABLE export_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_name VARCHAR(200),
    export_type VARCHAR(50) NOT NULL, -- 'student_progress', 'group_performance', 'roi_analysis', 'custom'
    data_scope VARCHAR(50), -- 'personal', 'group', 'organization'
    format VARCHAR(20) NOT NULL, -- 'csv', 'excel', 'json', 'pdf'

    -- Configuración
    filters JSONB, -- Filtros aplicados (fechas, grupos, materias)
    columns_selected TEXT[], -- Columnas seleccionadas
    anonymize BOOLEAN DEFAULT FALSE, -- ¿Aplicar anonimización?

    -- Estado
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    progress_pct INTEGER DEFAULT 0,
    rows_processed INTEGER,
    rows_total INTEGER,

    -- Resultado
    file_url TEXT, -- URL del archivo generado (S3)
    file_size_bytes BIGINT,
    expires_at TIMESTAMP, -- Los archivos se auto-eliminan después de X horas

    -- Auditoría
    created_at TIMESTAMP DEFAULT NOW(),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT
);

CREATE INDEX idx_export_jobs_user ON export_jobs(user_id);
CREATE INDEX idx_export_jobs_status ON export_jobs(status);
CREATE INDEX idx_export_jobs_created ON export_jobs(created_at);
```

### Tabla: `data_access_logs`

```sql
CREATE TABLE data_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL, -- 'export', 'view', 'download'
    resource_type VARCHAR(50), -- 'student_data', 'report', 'analytics'
    resource_id UUID,
    data_scope VARCHAR(50), -- 'personal', 'group', 'organization'
    anonymized BOOLEAN DEFAULT FALSE,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_access_logs_user ON data_access_logs(user_id);
CREATE INDEX idx_access_logs_resource ON data_access_logs(resource_type, resource_id);
CREATE INDEX idx_access_logs_date ON data_access_logs(created_at);

-- Ejemplo de log
INSERT INTO data_access_logs VALUES (
    gen_random_uuid(),
    'user-teacher-001',
    'export',
    'student_data',
    NULL,
    'group',
    TRUE, -- Datos anonimizados
    '192.168.1.100',
    'Mozilla/5.0 ...',
    NOW()
);
```

---

## 🔐 Proceso de Anonimización (GDPR/FERPA)

### Regulaciones Aplicables

**GDPR (Europa)**:

- Art. 17: Derecho al olvido
- Art. 20: Portabilidad de datos
- Art. 25: Protección de datos desde el diseño

**FERPA (EE.UU.)**:

- Protección de registros educativos
- Prohibición de divulgación sin consentimiento
- Derecho de los padres a revisar registros

**COPPA (Menores de 13 años)**:

- No divulgar información personal de niños
- Consentimiento parental verificable

### Técnicas de Anonimización

```typescript
// services/anonymization.service.ts

import crypto from "crypto";
import { faker } from "@faker-js/faker";

interface AnonymizationConfig {
  method: "hash" | "pseudonymize" | "generalize" | "suppress";
  fields: string[];
  preserveFormat?: boolean;
}

class DataAnonymizer {
  private salt: string;

  constructor() {
    this.salt = process.env.ANONYMIZATION_SALT || "default-salt";
  }

  /**
   * Anonimiza un dataset completo
   */
  anonymize(data: any[], config: AnonymizationConfig[]): any[] {
    return data.map((row) => this.anonymizeRow(row, config));
  }

  /**
   * Anonimiza una fila individual
   */
  anonymizeRow(row: any, config: AnonymizationConfig[]): any {
    const anonymized = { ...row };

    for (const rule of config) {
      for (const field of rule.fields) {
        if (anonymized[field] !== undefined) {
          anonymized[field] = this.applyAnonymization(
            anonymized[field],
            rule.method,
            field,
            rule.preserveFormat
          );
        }
      }
    }

    return anonymized;
  }

  /**
   * Aplica método específico de anonimización
   */
  private applyAnonymization(
    value: any,
    method: string,
    fieldName: string,
    preserveFormat: boolean = false
  ): any {
    switch (method) {
      case "hash":
        return this.hash(value);

      case "pseudonymize":
        return this.pseudonymize(value, fieldName, preserveFormat);

      case "generalize":
        return this.generalize(value, fieldName);

      case "suppress":
        return this.suppress();

      default:
        return value;
    }
  }

  /**
   * Hash irreversible (SHA-256)
   * Uso: IDs, referencias únicas
   */
  private hash(value: string): string {
    return crypto
      .createHash("sha256")
      .update(value + this.salt)
      .digest("hex")
      .substring(0, 16); // Primeros 16 caracteres
  }

  /**
   * Pseudonimización reversible (con clave)
   * Uso: Nombres, emails (para análisis cruzados)
   */
  private pseudonymize(
    value: string,
    fieldName: string,
    preserveFormat: boolean
  ): string {
    // Usar hash como seed para Faker (mismo valor → mismo pseudónimo)
    const seed = parseInt(this.hash(value), 16);
    faker.seed(seed);

    switch (fieldName) {
      case "first_name":
        return faker.person.firstName();

      case "last_name":
        return faker.person.lastName();

      case "email":
        if (preserveFormat) {
          const domain = value.split("@")[1];
          return `${faker.internet.userName()}@${domain}`;
        }
        return faker.internet.email();

      case "phone":
        return faker.phone.number();

      default:
        return faker.string.alphanumeric(value.length);
    }
  }

  /**
   * Generalización (reducir granularidad)
   * Uso: Fechas, edades, ubicaciones
   */
  private generalize(value: any, fieldName: string): any {
    switch (fieldName) {
      case "birth_date":
      case "date_of_birth":
        // Convertir a año solamente
        const date = new Date(value);
        return date.getFullYear();

      case "age":
        // Convertir a rangos
        const age = parseInt(value);
        if (age < 10) return "8-10";
        if (age < 13) return "10-12";
        return "12+";

      case "address":
      case "street":
        // Solo ciudad/estado
        return "[Ciudad Oculta]";

      case "score":
      case "grade":
        // Convertir a rangos
        const score = parseFloat(value);
        if (score < 60) return "Bajo (<60)";
        if (score < 80) return "Medio (60-80)";
        return "Alto (80+)";

      default:
        return value;
    }
  }

  /**
   * Supresión total (eliminar dato)
   * Uso: Datos muy sensibles
   */
  private suppress(): string {
    return "[REDACTADO]";
  }
}

// Configuración por tipo de exportación
export const ANONYMIZATION_CONFIGS: Record<string, AnonymizationConfig[]> = {
  // Exportación para análisis externo
  external_analysis: [
    {
      method: "hash",
      fields: ["id", "user_id", "student_id"],
    },
    {
      method: "pseudonymize",
      fields: ["first_name", "last_name", "email"],
      preserveFormat: false,
    },
    {
      method: "generalize",
      fields: ["birth_date", "age", "address", "score"],
    },
    {
      method: "suppress",
      fields: ["ssn", "parent_phone", "emergency_contact"],
    },
  ],

  // Exportación para profesor (mismo grupo)
  teacher_group: [
    {
      method: "hash",
      fields: ["id", "user_id"],
    },
    // Nombres reales (el profesor conoce a sus alumnos)
    {
      method: "generalize",
      fields: ["birth_date"], // Solo año
    },
  ],

  // Exportación para directivo (institucional)
  executive_report: [
    {
      method: "hash",
      fields: ["id", "user_id", "student_id", "teacher_id"],
    },
    {
      method: "pseudonymize",
      fields: ["first_name", "last_name"],
      preserveFormat: false,
    },
    {
      method: "generalize",
      fields: ["birth_date", "age", "score"],
    },
  ],
};
```

### Ejemplo de Datos Anonimizados

**Datos Originales:**

```json
{
  "id": "user-123",
  "first_name": "María",
  "last_name": "García",
  "email": "maria.garcia@escuela.edu",
  "birth_date": "2014-05-15",
  "age": 10,
  "address": "Calle Falsa 123, Madrid",
  "score": 85.5,
  "mastery_level": 0.78
}
```

**Datos Anonimizados (external_analysis):**

```json
{
  "id": "a3f5b9c2d1e4f6a7",
  "first_name": "Sofía",
  "last_name": "Martínez",
  "email": "usuario8472@example.com",
  "birth_date": "2014",
  "age": "10-12",
  "address": "[Ciudad Oculta]",
  "score": "Alto (80+)",
  "mastery_level": 0.78
}
```

---

## 📊 API de Exportación

### Endpoint: Crear Job de Exportación

```typescript
// controllers/export.controller.ts

export async function createExportJob(req: Request, res: Response) {
  const userId = req.user.id;
  const { export_type, format, filters, columns_selected, anonymize } =
    req.body;

  // Validar permisos
  const hasPermission = await checkExportPermission(
    userId,
    export_type,
    filters.scope
  );

  if (!hasPermission) {
    return res.status(403).json({
      error: "No tienes permisos para exportar estos datos",
    });
  }

  // Crear job
  const job = await db.query(
    `
        INSERT INTO export_jobs 
        (user_id, job_name, export_type, data_scope, format, filters, columns_selected, anonymize, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
        RETURNING *
    `,
    [
      userId,
      `Exportación ${export_type} - ${new Date().toISOString()}`,
      export_type,
      filters.scope,
      format,
      filters,
      columns_selected,
      anonymize,
    ]
  );

  const jobId = job.rows[0].id;

  // Procesar en background
  processExportJobAsync(jobId);

  // Log de auditoría
  await logDataAccess(userId, "export", export_type, filters.scope, anonymize);

  res.json({
    job_id: jobId,
    status: "pending",
    message:
      "La exportación se está procesando. Te notificaremos cuando esté lista.",
  });
}

async function processExportJobAsync(jobId: string) {
  try {
    // Actualizar estado
    await db.query(
      "UPDATE export_jobs SET status = $1, started_at = NOW() WHERE id = $2",
      ["processing", jobId]
    );

    // Obtener configuración del job
    const job = await getExportJob(jobId);

    // Extraer datos
    const data = await extractData(job);

    // Aplicar anonimización si es necesario
    let finalData = data;
    if (job.anonymize) {
      const config =
        ANONYMIZATION_CONFIGS[job.data_scope] ||
        ANONYMIZATION_CONFIGS.external_analysis;
      const anonymizer = new DataAnonymizer();
      finalData = anonymizer.anonymize(data, config);
    }

    // Generar archivo
    const fileBuffer = await generateFile(
      finalData,
      job.format,
      job.columns_selected
    );

    // Subir a S3
    const fileUrl = await uploadToS3(fileBuffer, jobId, job.format);

    // Actualizar job
    await db.query(
      `
            UPDATE export_jobs 
            SET status = 'completed',
                file_url = $1,
                file_size_bytes = $2,
                rows_processed = $3,
                completed_at = NOW(),
                expires_at = NOW() + INTERVAL '24 hours'
            WHERE id = $4
        `,
      [fileUrl, fileBuffer.length, finalData.length, jobId]
    );

    // Notificar al usuario
    await notifyUser(job.user_id, "Tu exportación está lista", fileUrl);
  } catch (error) {
    console.error(`Error processing export job ${jobId}:`, error);
    await db.query(
      "UPDATE export_jobs SET status = $1, error_message = $2 WHERE id = $3",
      ["failed", error.message, jobId]
    );
  }
}

async function extractData(job: any): Promise<any[]> {
  const { export_type, filters, columns_selected } = job;

  // Construir query dinámicamente
  let query = "";
  let params: any[] = [];

  switch (export_type) {
    case "student_progress":
      query = `
                SELECT ${columns_selected.join(", ")}
                FROM student_progress sp
                JOIN users u ON sp.user_id = u.id
                JOIN learning_activities la ON sp.activity_id = la.id
                WHERE 1=1
            `;

      if (filters.date_start) {
        params.push(filters.date_start);
        query += ` AND sp.last_attempt_at >= $${params.length}`;
      }
      if (filters.date_end) {
        params.push(filters.date_end);
        query += ` AND sp.last_attempt_at <= $${params.length}`;
      }
      if (filters.group_id) {
        params.push(filters.group_id);
        query += ` AND u.id IN (
                    SELECT student_id FROM group_students WHERE group_id = $${params.length}
                )`;
      }
      break;

    case "group_performance":
      query = `
                SELECT ${columns_selected.join(", ")}
                FROM student_performance_summary
                WHERE group_id = $1
            `;
      params = [filters.group_id];
      break;

    // Más tipos...
  }

  const result = await db.query(query, params);
  return result.rows;
}

async function generateFile(
  data: any[],
  format: string,
  columns: string[]
): Promise<Buffer> {
  switch (format) {
    case "csv":
      return generateCSV(data, columns);

    case "excel":
      return generateExcel(data, columns);

    case "json":
      return Buffer.from(JSON.stringify(data, null, 2));

    case "pdf":
      return generatePDF(data, columns);

    default:
      throw new Error(`Formato no soportado: ${format}`);
  }
}

async function generateExcel(data: any[], columns: string[]): Promise<Buffer> {
  const ExcelJS = require("exceljs");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Datos");

  // Encabezados
  worksheet.columns = columns.map((col) => ({
    header: col.replace(/_/g, " ").toUpperCase(),
    key: col,
    width: 15,
  }));

  // Estilo de encabezados
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4472C4" },
  };

  // Datos
  worksheet.addRows(data);

  // Generar buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
```

---

## 📋 Tipos de Exportación Disponibles

### 1. Progreso Individual (Alumno)

```typescript
const export_config = {
  export_type: "student_progress",
  scope: "personal",
  columns: [
    "activity_title",
    "subject",
    "score",
    "mastery_level",
    "time_spent",
    "completed_at",
  ],
  filters: {
    user_id: "student-123",
    date_start: "2025-01-01",
    date_end: "2025-01-31",
  },
  anonymize: false, // No anonimizar datos propios
};
```

### 2. Rendimiento de Grupo (Profesor)

```typescript
const export_config = {
  export_type: "group_performance",
  scope: "group",
  columns: [
    "student_name",
    "avg_score",
    "completion_rate",
    "mastery_level",
    "days_active",
  ],
  filters: {
    group_id: "group-456",
    date_start: "2025-01-01",
    date_end: "2025-01-31",
  },
  anonymize: false, // Profesor ve nombres reales
};
```

### 3. Análisis Institucional (Directivo)

```typescript
const export_config = {
  export_type: "institutional_analytics",
  scope: "organization",
  columns: [
    "group_name",
    "total_students",
    "avg_score",
    "adoption_rate",
    "hours_studied",
  ],
  filters: {
    organization_id: "org-789",
    date_start: "2024-09-01",
    date_end: "2025-01-31",
  },
  anonymize: true, // Anonimizar para cumplimiento
};
```

---

## 🧪 Testing

```typescript
describe("Data Export & Anonymization", () => {
  it("should anonymize PII fields correctly", () => {
    const anonymizer = new DataAnonymizer();
    const original = {
      first_name: "María",
      last_name: "García",
      email: "maria@test.com",
    };

    const config: AnonymizationConfig[] = [
      {
        method: "pseudonymize",
        fields: ["first_name", "last_name", "email"],
      },
    ];

    const anonymized = anonymizer.anonymizeRow(original, config);

    expect(anonymized.first_name).not.toBe("María");
    expect(anonymized.email).not.toBe("maria@test.com");
  });

  it("should create export job and process async", async () => {
    const response = await request(app)
      .post("/api/v1/export")
      .send({
        export_type: "student_progress",
        format: "csv",
        filters: { group_id: "test-group" },
      })
      .expect(200);

    expect(response.body).toHaveProperty("job_id");
    expect(response.body.status).toBe("pending");
  });
});
```

---

**Última actualización**: 09/11/2025
