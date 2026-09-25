from app.db.session import SessionLocal
from app.models.domain import KPI, KPIObservation

db = SessionLocal()

k1 = KPI(
    challenge_id=4,
    name="Diagnostic Accuracy",
    category="Technical",
    unit="Percentage",
    baseline="60%",
    target="92%",
    direction="HIGHER_IS_BETTER",
    measurement_method="Comparison with ground truth",
    measurement_frequency="Weekly",
    data_source="SYSTEM_METRIC",
    source_type="GOVERNMENT_DEFINED",
    status="APPROVED"
)
db.add(k1)
db.commit()

obs1 = KPIObservation(
    kpi_id=k1.id,
    pilot_id=1,
    raw_value=72.0,
    submitted_by=1
)
obs2 = KPIObservation(
    kpi_id=k1.id,
    pilot_id=1,
    raw_value=85.0,
    submitted_by=1
)
db.add_all([obs1, obs2])
db.commit()
print("Seeded KPI and observations for Pilot 1")
