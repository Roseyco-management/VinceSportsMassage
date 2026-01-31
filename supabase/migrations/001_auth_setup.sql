-- Create admin_users table for role-based access control
-- This table tracks which auth.users have admin access
-- Credentials are managed by Supabase Auth (auth.users table)

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own admin_users row
CREATE POLICY "Users can read own admin record"
  ON admin_users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Only authenticated users can access admin_users
CREATE POLICY "Authenticated users only"
  ON admin_users
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users(email);

-- Create trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment for documentation
COMMENT ON TABLE admin_users IS 'Tracks which authenticated users have admin access to the dashboard';
COMMENT ON COLUMN admin_users.id IS 'References auth.users.id - links to Supabase Auth user';
COMMENT ON COLUMN admin_users.email IS 'Admin user email (duplicated for convenience)';
COMMENT ON COLUMN admin_users.role IS 'Role type (default: admin, extensible for future roles)';
