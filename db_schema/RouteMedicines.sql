USE inmers;
INSERT INTO route_medicines (name, is_active, createdAt, updatedAt)
VALUES
  ('Oral', TRUE, NOW(), NOW()),
  ('Injection into vein (Intravenous)', TRUE, NOW(), NOW()),
  ('Injection into muscle (Intramuscular)', TRUE, NOW(), NOW()),
  ('Others', TRUE, NOW(), NOW());