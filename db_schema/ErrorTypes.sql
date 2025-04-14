USE inmers;
INSERT INTO error_types (name, is_active, createdAt, updatedAt)
VALUES
  ('Incorrect prescription (medication order)', TRUE, NOW(), NOW()),
  ('Incorrect transcription on patient chart / record', TRUE, NOW(), NOW()),
  ('Incorrect Dispensing', TRUE, NOW(), NOW()),
  ('Incorrect Preparation - Compounding errors', TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong patient', TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong medication', TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong dose/ dosage', TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong time', TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong route', TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong form of medication', TRUE, NOW(), NOW()),
  ('Incorrect Administration - Omission (medication is not given)', TRUE, NOW(), NOW()),
  ('Others', TRUE, NOW(), NOW());