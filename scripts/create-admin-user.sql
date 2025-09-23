-- Create admin user script
-- This will be executed to create the initial admin user

-- Note: This is a reference script. The actual admin user creation
-- is handled by the createAdminUser function in lib/auth.ts
-- which should be called during app initialization

-- Admin user will be created with:
-- Email: from ADMIN_EMAIL environment variable
-- Password: from ADMIN_PASSWORD environment variable (hashed)
-- Role: ADMIN
-- Name: "Admin User"
