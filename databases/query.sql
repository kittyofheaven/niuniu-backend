-- find admin account by username
SELECT * FROM AdminAccounts 
WHERE username = ? 
LIMIT 1;

-- Insert a new AmbulanceProvider
-- name: CreateAmbulanceProvider :exec
INSERT INTO AmbulanceProviders (email, phone_number, ambulance_provider_name, password, location, kota_id, created_at, updated_at) 
VALUES (?, ?, ?, ?, ST_GeomFromText(?), ?, NOW(), NOW());

-- Find an AmbulanceProvider by ID
-- name: FindAmbulanceProviderById :one
SELECT id, email, phone_number, ambulance_provider_name, ST_AsText(location) AS location, kota_id, created_at, updated_at 
FROM AmbulanceProviders 
WHERE id = ?;

-- Find an AmbulanceProvider by Email
-- name: FindAmbulanceProviderByEmail :one
SELECT id, email, phone_number, ambulance_provider_name, ST_AsText(location) AS location, kota_id, created_at, updated_at 
FROM AmbulanceProviders 
WHERE email = ?;

-- Find an AmbulanceProvider by Name
-- name: FindAmbulanceProviderByName :one
SELECT id, email, phone_number, ambulance_provider_name, ST_AsText(location) AS location, kota_id, created_at, updated_at 
FROM AmbulanceProviders 
WHERE ambulance_provider_name = ?;

-- Update the password for an AmbulanceProvider
-- name: ResetPasswordAmbulanceProvider :exec
UPDATE AmbulanceProviders
SET password = ?, updated_at = NOW()
WHERE email = ?;

-- Get all AmbulanceProviders with optional filters
-- name: GetAllAmbulanceProviders :many
SELECT a.id, a.email, a.phone_number, a.ambulance_provider_name, ST_AsText(a.location) AS location, a.kota_id, a.created_at, a.updated_at 
FROM AmbulanceProviders a
JOIN Kota k ON a.kota_id = k.id
LEFT JOIN Provinsis p ON k.provinsi_id = p.id
WHERE (? IS NULL OR a.kota_id = ?)
  AND (? IS NULL OR k.provinsi_id = ?)
ORDER BY a.created_at DESC;

-- Get all AmbulanceProviders by Kota ID
-- name: GetAllAmbulanceProvidersByKota :many
SELECT id, email, phone_number, ambulance_provider_name, ST_AsText(location) AS location, kota_id, created_at, updated_at 
FROM AmbulanceProviders 
WHERE kota_id = ?;
