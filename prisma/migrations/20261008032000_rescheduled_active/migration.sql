ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_no_active_overlap";
ALTER TABLE "Appointment"
  ADD CONSTRAINT "Appointment_no_active_overlap"
  EXCLUDE USING gist (tstzrange("startsAt", "endsAt", '[)') WITH &&)
  WHERE ("status" IN ('PENDING', 'CONFIRMED', 'RESCHEDULED'));
