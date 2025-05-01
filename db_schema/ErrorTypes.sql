USE inmers;
INSERT INTO error_types (name, is_medicine_needed, is_active, createdAt, updatedAt)
VALUES
  ('Incorrect prescription (medication order)', TRUE, TRUE, NOW(), NOW()),
  ('Incorrect transcription on patient chart / record', FALSE, TRUE, NOW(), NOW()),
  ('Incorrect Dispensing', TRUE, TRUE, NOW(), NOW()),
  ('Incorrect Preparation - Compounding errors', TRUE, TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong patient', FALSE, TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong medication', TRUE, TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong dose/ dosage', TRUE, TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong time', FALSE, TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong route', TRUE, TRUE, NOW(), NOW()),
  ('Incorrect Administration - Wrong form of medication', TRUE, TRUE, NOW(), NOW()),
  ('Incorrect Administration - Omission (medication is not given)', TRUE, TRUE, NOW(), NOW()),
  ('Near-miss', FALSE, TRUE, NOW(), NOW()),
  ('Others', FALSE, TRUE, NOW(), NOW());