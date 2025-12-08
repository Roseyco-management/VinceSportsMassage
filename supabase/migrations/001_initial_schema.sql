-- Vince Sports Massage Database Schema
-- Run this in Supabase SQL Editor

-- Blog Posts (n8n automated + manual)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  author TEXT DEFAULT 'Vince McDowell',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  canonical_url TEXT,
  og_image TEXT,
  n8n_execution_id TEXT,
  auto_generated BOOLEAN DEFAULT false
);

-- Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Post Categories (many-to-many)
CREATE TABLE IF NOT EXISTS post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Services (for services page)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  image TEXT,
  price_from DECIMAL(10,2),
  duration_minutes INTEGER,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false
);

-- n8n Automation Logs (for admin dashboard)
CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_name TEXT NOT NULL,
  execution_id TEXT,
  status TEXT CHECK (status IN ('success', 'error', 'pending')),
  payload JSONB,
  result JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (status = 'published' AND published_at <= NOW());

-- Public read access for categories
CREATE POLICY "Public can read categories" ON blog_categories
  FOR SELECT USING (true);

-- Public read access for post categories
CREATE POLICY "Public can read post categories" ON post_categories
  FOR SELECT USING (true);

-- Public read access for active services
CREATE POLICY "Public can read active services" ON services
  FOR SELECT USING (is_active = true);

-- Public read access for testimonials
CREATE POLICY "Public can read testimonials" ON testimonials
  FOR SELECT USING (true);

-- Service role can do everything (for n8n and admin)
CREATE POLICY "Service role full access blog_posts" ON blog_posts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access blog_categories" ON blog_categories
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access services" ON services
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access contact_submissions" ON contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access automation_logs" ON automation_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Allow anonymous insert for contact form
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Sports Massage', 'sports-massage', 'Articles about sports massage techniques and benefits'),
  ('Posture', 'posture', 'Tips and guides for better posture'),
  ('Recovery', 'recovery', 'Recovery techniques and strategies'),
  ('Wellness', 'wellness', 'General health and wellness content'),
  ('Mobility', 'mobility', 'Mobility exercises and stretching guides')
ON CONFLICT (slug) DO NOTHING;
