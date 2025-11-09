# Arquitectura Técnica - Dashboard Ejecutivo y Análisis de ROI

## 📋 Referencia

**Historia de Usuario**: HU-007 - Dashboard Ejecutivo para Directivos

---

## 🏗️ Arquitectura General

```
┌──────────────────────────────────────────────────────────────────┐
│         INTERFAZ DIRECTIVO (React Dashboard Ejecutivo)           │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Indicadores │  │ Análisis    │  │  Reportes   │            │
│  │     KPI     │  │     ROI     │  │ Ejecutivos  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└──────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                CAPA DE ANALÍTICA AVANZADA                        │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Analytics Service (Node.js + Python)                    │  │
│  │                                                          │  │
│  │  GET  /api/v1/executive/dashboard                       │  │
│  │  GET  /api/v1/executive/roi                             │  │
│  │  GET  /api/v1/executive/trends                          │  │
│  │  POST /api/v1/executive/reports/generate               │  │
│  │  GET  /api/v1/executive/comparative                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │   BigQuery   │  │    Redis     │
│  (Datos de   │  │  (Data Lake  │  │  (Cache KPI) │
│   Negocio)   │  │   Histórico) │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🔐 Stack Tecnológico

### Backend

- **Node.js 18+** con TypeScript
- **Express.js 4.x**
- **Python 3.9+** (Análisis avanzado)
- **Pandas + NumPy** (Procesamiento de datos)

### Visualización

- **React 18+** con Material-UI
- **Recharts** + **D3.js** (Gráficas ejecutivas)
- **React-PDF** (Generación de reportes)

### Base de Datos

- **PostgreSQL 14+** (Datos transaccionales)
- **Google BigQuery** (Data Warehouse para análisis histórico)
- **Redis 7+** (Cache de dashboards)

---

## 🗄️ Modelo de Datos

### Tabla: `institutional_metrics`

```sql
CREATE TABLE institutional_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    metric_date DATE NOT NULL,
    metric_type VARCHAR(50) NOT NULL, -- 'usage', 'performance', 'financial'

    -- Métricas de Uso
    total_students INTEGER,
    active_students INTEGER, -- Activos en últimos 30 días
    total_teachers INTEGER,
    avg_hours_per_student FLOAT,

    -- Métricas de Rendimiento
    avg_completion_rate FLOAT,
    avg_mastery_level FLOAT,
    avg_score FLOAT,

    -- Métricas Financieras
    monthly_cost DECIMAL(10,2),
    cost_per_student DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_inst_metrics_org ON institutional_metrics(organization_id);
CREATE INDEX idx_inst_metrics_date ON institutional_metrics(metric_date);
```

### Tabla: `roi_calculations`

```sql
CREATE TABLE roi_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    calculation_date DATE NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,

    -- Costos
    platform_cost DECIMAL(10,2), -- Costo de la plataforma
    training_cost DECIMAL(10,2), -- Capacitación docente
    infrastructure_cost DECIMAL(10,2), -- Hardware/software adicional
    total_investment DECIMAL(10,2),

    -- Beneficios (monetizados)
    time_saved_teachers_hours FLOAT,
    time_saved_value DECIMAL(10,2), -- Valor monetario del tiempo
    performance_improvement_pct FLOAT,
    performance_value DECIMAL(10,2), -- Valor estimado de mejora académica
    retention_improvement_pct FLOAT,
    retention_value DECIMAL(10,2), -- Valor por reducción de deserción
    total_benefits DECIMAL(10,2),

    -- ROI Final
    net_benefit DECIMAL(10,2), -- Beneficios - Costos
    roi_percentage FLOAT, -- (Beneficios - Costos) / Costos * 100
    payback_period_months INTEGER, -- Meses para recuperar inversión

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_roi_org ON roi_calculations(organization_id);
CREATE INDEX idx_roi_date ON roi_calculations(calculation_date);
```

### Tabla: `executive_reports`

```sql
CREATE TABLE executive_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    generated_by UUID REFERENCES users(id), -- Directivo que lo generó
    report_type VARCHAR(50) NOT NULL, -- 'monthly', 'quarterly', 'annual', 'custom'
    title VARCHAR(200) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    report_data JSONB, -- Datos del reporte
    pdf_url TEXT, -- URL del PDF generado
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reports_org ON executive_reports(organization_id);
CREATE INDEX idx_reports_type ON executive_reports(report_type);
```

---

## 📊 Dashboard Ejecutivo - KPIs Principales

### API: Indicadores Clave

```typescript
// controllers/executive-dashboard.controller.ts

export async function getExecutiveDashboard(req: Request, res: Response) {
  const organizationId = req.user.organization_id;
  const { period = "30d" } = req.query; // 7d, 30d, 90d, 1y

  // Cache key
  const cacheKey = `exec_dashboard:${organizationId}:${period}`;
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  // Calcular KPIs
  const kpis = await calculateExecutiveKPIs(organizationId, period);

  // Cachear 1 hora
  await redisClient.setex(cacheKey, 3600, JSON.stringify(kpis));

  res.json(kpis);
}

async function calculateExecutiveKPIs(
  organizationId: string,
  period: string
): Promise<any> {
  const days = parsePeriodToDays(period);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // 1. Adopción y Uso
  const usage = await db.query(
    `
        SELECT 
            COUNT(DISTINCT u.id) FILTER (WHERE u.role = 'student') AS total_students,
            COUNT(DISTINCT u.id) FILTER (
                WHERE u.role = 'student' 
                AND u.last_login_at >= $1
            ) AS active_students,
            COUNT(DISTINCT u.id) FILTER (WHERE u.role = 'teacher') AS total_teachers,
            COUNT(DISTINCT u.id) FILTER (
                WHERE u.role = 'teacher' 
                AND u.last_login_at >= $1
            ) AS active_teachers,
            
            -- Tasa de adopción
            COUNT(DISTINCT u.id) FILTER (
                WHERE u.role = 'student' 
                AND u.last_login_at >= $1
            )::FLOAT / NULLIF(
                COUNT(DISTINCT u.id) FILTER (WHERE u.role = 'student'), 0
            ) AS adoption_rate,
            
            -- Horas totales
            COALESCE(SUM(sp.time_spent_seconds) / 3600.0, 0) AS total_hours
            
        FROM users u
        LEFT JOIN student_progress sp ON u.id = sp.user_id 
            AND sp.last_attempt_at >= $1
        WHERE u.organization_id = $2
    `,
    [startDate, organizationId]
  );

  // 2. Rendimiento Académico
  const performance = await db.query(
    `
        SELECT 
            AVG(sp.score) AS avg_score,
            AVG(sp.mastery_level) AS avg_mastery,
            AVG(
                CASE WHEN sp.status IN ('completed', 'mastered') THEN 1 ELSE 0 END
            ) AS completion_rate,
            
            -- Mejoría vs. período anterior
            AVG(sp.score) - (
                SELECT AVG(score)
                FROM student_progress
                WHERE user_id IN (
                    SELECT id FROM users 
                    WHERE organization_id = $2 AND role = 'student'
                )
                AND last_attempt_at BETWEEN $3 AND $1
            ) AS score_improvement
            
        FROM student_progress sp
        JOIN users u ON sp.user_id = u.id
        WHERE u.organization_id = $2
          AND sp.last_attempt_at >= $1
    `,
    [
      startDate,
      organizationId,
      new Date(startDate.getTime() - days * 24 * 60 * 60 * 1000),
    ]
  );

  // 3. Eficiencia Operativa
  const efficiency = await db.query(
    `
        SELECT 
            -- Tiempo promedio por actividad completada
            AVG(sp.time_spent_seconds / 60.0) AS avg_minutes_per_activity,
            
            -- Actividades completadas por hora de uso
            COUNT(sp.id) FILTER (WHERE sp.status = 'completed')::FLOAT / 
            NULLIF(SUM(sp.time_spent_seconds) / 3600.0, 0) AS activities_per_hour,
            
            -- Alertas generadas vs. resueltas
            COUNT(ta.id) AS total_alerts,
            COUNT(ta.id) FILTER (WHERE ta.is_resolved) AS resolved_alerts,
            AVG(
                EXTRACT(EPOCH FROM (ta.resolved_at - ta.created_at)) / 3600
            ) FILTER (WHERE ta.is_resolved) AS avg_resolution_time_hours
            
        FROM users u
        LEFT JOIN student_progress sp ON u.id = sp.user_id 
            AND sp.last_attempt_at >= $1
        LEFT JOIN teacher_alerts ta ON u.id = ta.student_id 
            AND ta.created_at >= $1
        WHERE u.organization_id = $2
    `,
    [startDate, organizationId]
  );

  // 4. Comparativas
  const benchmarks = await calculateBenchmarks(organizationId);

  return {
    period: period,
    generated_at: new Date().toISOString(),
    usage: {
      total_students: usage.rows[0].total_students,
      active_students: usage.rows[0].active_students,
      adoption_rate: (usage.rows[0].adoption_rate * 100).toFixed(1),
      total_teachers: usage.rows[0].total_teachers,
      active_teachers: usage.rows[0].active_teachers,
      total_hours: Math.round(usage.rows[0].total_hours),
      avg_hours_per_student: (
        usage.rows[0].total_hours / usage.rows[0].active_students
      ).toFixed(1),
    },
    performance: {
      avg_score: performance.rows[0].avg_score?.toFixed(1),
      avg_mastery: (performance.rows[0].avg_mastery * 100).toFixed(1),
      completion_rate: (performance.rows[0].completion_rate * 100).toFixed(1),
      improvement: performance.rows[0].score_improvement?.toFixed(1),
    },
    efficiency: {
      avg_minutes_per_activity:
        efficiency.rows[0].avg_minutes_per_activity?.toFixed(1),
      activities_per_hour: efficiency.rows[0].activities_per_hour?.toFixed(2),
      total_alerts: efficiency.rows[0].total_alerts,
      resolved_alerts: efficiency.rows[0].resolved_alerts,
      alert_resolution_rate: (
        (efficiency.rows[0].resolved_alerts / efficiency.rows[0].total_alerts) *
        100
      ).toFixed(1),
    },
    benchmarks: benchmarks,
  };
}
```

### Visualización del Dashboard Ejecutivo

```
┌────────────────────────────────────────────────────────────────────┐
│  🏢 Dashboard Ejecutivo - Instituto Educativo XYZ                  │
│  📅 Período: Últimos 30 días                  🔄 Actualizado: hoy  │
└────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📈 Indicadores Clave de Rendimiento (KPIs)                         │
│                                                                     │
│  👥 ADOPCIÓN                                                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │ Alumnos Activos │  │ Tasa de Adopción│  │ Horas Totales   │   │
│  │      850/1,000  │  │       85%       │  │     7,225h      │   │
│  │  [████████░░]   │  │  [████████░░]   │  │  [████████░░]   │   │
│  │   +5% vs. ant.  │  │   +3% vs. ant.  │  │  +12% vs. ant.  │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘   │
│                                                                     │
│  🎯 RENDIMIENTO ACADÉMICO                                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │ Calificación    │  │ Nivel Dominio   │  │ Tasa Finalización│  │
│  │ Promedio        │  │ Promedio        │  │                  │  │
│  │      82/100     │  │       76%       │  │       68%        │  │
│  │  [████████░░]   │  │  [████████░░]   │  │  [███████░░░]    │  │
│  │   +4 puntos     │  │   +6% vs. ant.  │  │   +5% vs. ant.   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  💰 RETORNO DE INVERSIÓN (ROI)                                      │
│                                                                     │
│  Inversión Total:   $50,000 USD                                    │
│  Beneficios:        $92,500 USD                                    │
│  Beneficio Neto:    $42,500 USD                                    │
│                                                                     │
│  📊 ROI: 85%           Período de Recuperación: 7 meses            │
│                                                                     │
│  Desglose de Beneficios:                                           │
│  • Tiempo ahorrado docentes:     $35,000  (38%)                    │
│  • Mejora rendimiento académico: $40,000  (43%)                    │
│  • Reducción deserción:          $17,500  (19%)                    │
│                                                                     │
│  [Ver Análisis Completo de ROI →]                                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📊 Comparativa con Instituciones Similares                         │
│                                                                     │
│  Indicador               Tu Institución   Promedio  Top 10%        │
│  ───────────────────────────────────────────────────────────────   │
│  Tasa de Adopción            85%            72%       92%   🟢     │
│  Nivel de Dominio            76%            68%       85%   🟡     │
│  Horas por Alumno            8.5h           7.2h     10.5h  🟡     │
│  Finalización                68%            62%       78%   🟡     │
│                                                                     │
│  🟢 Por encima del promedio  🟡 En el promedio  🔴 Por debajo      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📈 Tendencias (Últimos 6 Meses)                                    │
│                                                                     │
│  Alumnos Activos                                                   │
│  1000│                                                ╱─            │
│      │                                        ╱──────╱              │
│   800│                          ╱────────────╱                      │
│      │            ╱─────────────╱                                   │
│   600│    ───────╱                                                  │
│      └─────┬─────┬─────┬─────┬─────┬─────                         │
│           Ene   Feb   Mar   Abr   May   Jun                        │
│                                                                     │
│  Crecimiento sostenido: +42% en 6 meses                           │
└─────────────────────────────────────────────────────────────────────┘

                    [📥 Generar Reporte Ejecutivo PDF]
```

---

## 💰 Fórmula de Cálculo de ROI

### Algoritmo de Cálculo

```python
# ml_engine/roi_calculator.py

from dataclasses import dataclass
from typing import Dict
import pandas as pd

@dataclass
class ROIInputs:
    # Costos
    platform_cost: float  # Costo mensual/anual de la plataforma
    num_students: int
    num_teachers: int
    training_cost: float  # Costo de capacitación docente
    infrastructure_cost: float  # Hardware adicional

    # Métricas de rendimiento
    avg_teacher_hours_saved_per_week: float
    teacher_hourly_rate: float
    performance_improvement_pct: float  # Mejora en calificaciones
    retention_improvement_pct: float  # Reducción de deserción
    cost_per_student_lost: float  # Costo institucional de perder un alumno

class ROICalculator:
    def __init__(self, inputs: ROIInputs, period_months: int = 12):
        self.inputs = inputs
        self.period_months = period_months

    def calculate(self) -> Dict:
        # 1. COSTOS TOTALES
        total_costs = self._calculate_total_costs()

        # 2. BENEFICIOS TOTALES
        time_saved_benefit = self._calculate_time_saved_benefit()
        performance_benefit = self._calculate_performance_benefit()
        retention_benefit = self._calculate_retention_benefit()

        total_benefits = (
            time_saved_benefit +
            performance_benefit +
            retention_benefit
        )

        # 3. ROI
        net_benefit = total_benefits - total_costs
        roi_pct = (net_benefit / total_costs) * 100 if total_costs > 0 else 0

        # 4. Payback Period
        monthly_benefit = total_benefits / self.period_months
        monthly_cost = total_costs / self.period_months
        monthly_net = monthly_benefit - monthly_cost

        payback_months = (
            total_costs / monthly_benefit
            if monthly_benefit > 0
            else float('inf')
        )

        return {
            'costs': {
                'platform': self.inputs.platform_cost * self.period_months,
                'training': self.inputs.training_cost,
                'infrastructure': self.inputs.infrastructure_cost,
                'total': total_costs
            },
            'benefits': {
                'time_saved': time_saved_benefit,
                'performance_improvement': performance_benefit,
                'retention_improvement': retention_benefit,
                'total': total_benefits
            },
            'roi': {
                'net_benefit': net_benefit,
                'roi_percentage': round(roi_pct, 2),
                'payback_period_months': round(payback_months, 1)
            },
            'breakdown': self._generate_breakdown()
        }

    def _calculate_total_costs(self) -> float:
        platform = self.inputs.platform_cost * self.period_months
        training = self.inputs.training_cost
        infrastructure = self.inputs.infrastructure_cost

        return platform + training + infrastructure

    def _calculate_time_saved_benefit(self) -> float:
        """
        Beneficio por tiempo ahorrado a docentes

        La plataforma automatiza:
        - Corrección de ejercicios
        - Seguimiento individual de alumnos
        - Generación de reportes

        Estimación conservadora: 3-5 horas por semana por docente
        """
        hours_saved_per_teacher_per_year = (
            self.inputs.avg_teacher_hours_saved_per_week *
            52  # semanas al año
        )

        total_hours_saved = (
            hours_saved_per_teacher_per_year *
            self.inputs.num_teachers *
            (self.period_months / 12)
        )

        value = total_hours_saved * self.inputs.teacher_hourly_rate

        return value

    def _calculate_performance_benefit(self) -> float:
        """
        Beneficio por mejora en rendimiento académico

        Monetización:
        - Reputación institucional → mayor captación de alumnos
        - Mejor preparación → menos gastos en refuerzo
        - Prestigio → posibilidad de aumentar cuotas

        Método conservador:
        Valor estimado de mejora académica = $X por alumno por punto de mejora
        """
        # Estimación: $50 USD de valor por alumno por cada 1% de mejora
        value_per_student_per_pct = 50

        total_value = (
            self.inputs.num_students *
            self.inputs.performance_improvement_pct *
            value_per_student_per_pct *
            (self.period_months / 12)
        )

        return total_value

    def _calculate_retention_benefit(self) -> float:
        """
        Beneficio por reducción de deserción escolar

        La plataforma reduce deserción mediante:
        - Detección temprana de riesgo
        - Intervención oportuna
        - Aprendizaje personalizado

        Cálculo:
        Alumnos retenidos × Costo de perder un alumno
        """
        # Tasa de deserción típica: 5-10% anual
        baseline_churn_rate = 0.07  # 7%

        # Reducción estimada por la plataforma
        improved_churn_rate = baseline_churn_rate * (
            1 - self.inputs.retention_improvement_pct
        )

        students_retained = (
            self.inputs.num_students *
            (baseline_churn_rate - improved_churn_rate) *
            (self.period_months / 12)
        )

        value = students_retained * self.inputs.cost_per_student_lost

        return value

    def _generate_breakdown(self) -> Dict:
        """
        Genera un desglose detallado mes a mes
        """
        monthly_data = []

        for month in range(1, self.period_months + 1):
            # Costos acumulados
            cumulative_cost = (
                self.inputs.platform_cost * month +
                self.inputs.training_cost +  # Solo al inicio
                self.inputs.infrastructure_cost  # Solo al inicio
            )

            # Beneficios acumulados (crecen mes a mes)
            time_saved_monthly = self._calculate_time_saved_benefit() / self.period_months
            performance_monthly = self._calculate_performance_benefit() / self.period_months
            retention_monthly = self._calculate_retention_benefit() / self.period_months

            cumulative_benefit = (
                (time_saved_monthly + performance_monthly + retention_monthly) * month
            )

            monthly_data.append({
                'month': month,
                'cumulative_cost': round(cumulative_cost, 2),
                'cumulative_benefit': round(cumulative_benefit, 2),
                'cumulative_net': round(cumulative_benefit - cumulative_cost, 2)
            })

        return monthly_data

# Uso
if __name__ == '__main__':
    inputs = ROIInputs(
        platform_cost=4000,  # $4,000 USD/mes para 1,000 alumnos
        num_students=1000,
        num_teachers=40,
        training_cost=5000,  # Capacitación inicial
        infrastructure_cost=3000,  # Tablets, laptops adicionales
        avg_teacher_hours_saved_per_week=4,
        teacher_hourly_rate=25,  # $25 USD/hora
        performance_improvement_pct=0.08,  # 8% de mejora
        retention_improvement_pct=0.30,  # 30% menos deserción
        cost_per_student_lost=2500  # Costo de perder un alumno (colegiatura anual)
    )

    calculator = ROICalculator(inputs, period_months=12)
    result = calculator.calculate()

    print(f"ROI: {result['roi']['roi_percentage']}%")
    print(f"Payback: {result['roi']['payback_period_months']} meses")
    print(f"Beneficio Neto: ${result['roi']['net_benefit']:,.2f}")
```

---

## 📄 Generación de Reportes Ejecutivos

```typescript
// services/report-generator.service.ts

import PDFDocument from "pdfkit";
import Chart from "chart.js";

export async function generateExecutiveReport(
  organizationId: string,
  periodStart: Date,
  periodEnd: Date
): Promise<string> {
  // 1. Recopilar datos
  const data = await collectReportData(organizationId, periodStart, periodEnd);

  // 2. Generar PDF
  const pdfBuffer = await createPDF(data);

  // 3. Subir a S3
  const pdfUrl = await uploadToS3(pdfBuffer, organizationId);

  // 4. Guardar registro
  await db.query(
    `
        INSERT INTO executive_reports 
        (organization_id, generated_by, report_type, title, period_start, period_end, report_data, pdf_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [
      organizationId,
      req.user.id,
      "monthly",
      `Reporte Ejecutivo - ${periodStart.toLocaleDateString()}`,
      periodStart,
      periodEnd,
      data,
      pdfUrl,
    ]
  );

  return pdfUrl;
}

async function createPDF(data: any): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // Portada
  doc.fontSize(24).text("Reporte Ejecutivo", { align: "center" });
  doc.fontSize(14).text(data.organization_name, { align: "center" });
  doc
    .fontSize(12)
    .text(`Período: ${data.period_start} - ${data.period_end}`, {
      align: "center",
    });

  doc.addPage();

  // Resumen Ejecutivo
  doc.fontSize(18).text("Resumen Ejecutivo");
  doc.fontSize(12).text(`
        Durante el período analizado, la institución registró:
        • ${data.usage.active_students} alumnos activos (${data.usage.adoption_rate}% de adopción)
        • ${data.performance.avg_score} puntos de calificación promedio
        • ${data.performance.completion_rate}% de tasa de finalización
        • ROI de ${data.roi.roi_percentage}% sobre la inversión
    `);

  // Más secciones...

  return doc;
}
```

---

**Última actualización**: 09/11/2025
