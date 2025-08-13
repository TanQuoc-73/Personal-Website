-- =======================
-- PORTFOLIO DATABASE SCHEMA
-- =======================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (optional nếu bạn muốn có authentication)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    location VARCHAR(255),
    website VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CATEGORIES TABLE (cho projects và blog posts)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6', -- hex color code
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SKILLS TABLE
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'frontend', 'backend', 'database', 'tools', etc.
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    icon_url TEXT,
    description TEXT,
    years_experience INTEGER,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PROJECTS TABLE
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    content TEXT, -- detailed project description (markdown)
    featured_image_url TEXT,
    demo_url TEXT,
    github_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'completed', -- 'in-progress', 'completed', 'archived'
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    client VARCHAR(255),
    budget_range VARCHAR(50),
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PROJECT TECHNOLOGIES (many-to-many relationship)
CREATE TABLE project_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    technology_name VARCHAR(100) NOT NULL,
    category VARCHAR(50), -- 'frontend', 'backend', 'database', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, technology_name)
);

-- 6. PROJECT IMAGES
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    caption TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. BLOG POSTS TABLE
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt VARCHAR(500),
    content TEXT NOT NULL, -- markdown content
    featured_image_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
    is_featured BOOLEAN DEFAULT FALSE,
    reading_time INTEGER, -- estimated reading time in minutes
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. BLOG POST TAGS (many-to-many)
CREATE TABLE blog_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#6B7280',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blog_post_tags (
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_post_id, tag_id)
);

-- 9. EXPERIENCES TABLE (work experience)
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT,
    company_url VARCHAR(255),
    company_logo_url TEXT,
    location VARCHAR(255),
    employment_type VARCHAR(50), -- 'full-time', 'part-time', 'contract', 'internship'
    is_current BOOLEAN DEFAULT FALSE,
    start_date DATE NOT NULL,
    end_date DATE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. EDUCATION TABLE
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    description TEXT,
    institution_logo_url TEXT,
    location VARCHAR(255),
    gpa VARCHAR(10),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. CERTIFICATES TABLE
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    description TEXT,
    certificate_url TEXT,
    image_url TEXT,
    issue_date DATE,
    expiry_date DATE,
    credential_id VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. TESTIMONIALS TABLE
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    client_position VARCHAR(255),
    client_company VARCHAR(255),
    client_avatar_url TEXT,
    testimonial TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. SITE SETTINGS TABLE (cho các cài đặt chung)
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    description TEXT,
    data_type VARCHAR(20) DEFAULT 'text', -- 'text', 'number', 'boolean', 'json'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =======================
-- INDEXES FOR PERFORMANCE
-- =======================

-- Projects indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Blog posts indexes
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);

-- Skills indexes
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_featured ON skills(is_featured);

-- Contact messages indexes
CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- =======================
-- ROW LEVEL SECURITY (RLS)
-- =======================

-- Enable RLS on sensitive tables
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies for contact messages (chỉ admin mới đọc được)
CREATE POLICY "Contact messages are viewable by admin only" ON contact_messages
    FOR SELECT USING (auth.role() = 'admin');

-- =======================
-- SAMPLE DATA INSERT
-- =======================

-- Insert sample categories
INSERT INTO categories (name, slug, description, color) VALUES
('Web Development', 'web-development', 'Frontend and Backend web applications', '#3B82F6'),
('Mobile App', 'mobile-app', 'iOS and Android applications', '#10B981'),
('UI/UX Design', 'ui-ux-design', 'User interface and experience design', '#F59E0B'),
('Data Science', 'data-science', 'Data analysis and machine learning', '#8B5CF6');

-- Insert sample skills
INSERT INTO skills (name, category, proficiency_level, is_featured) VALUES
('JavaScript', 'frontend', 5, true),
('React', 'frontend', 5, true),
('Next.js', 'frontend', 4, true),
('Node.js', 'backend', 4, true),
('PostgreSQL', 'database', 4, false),
('Python', 'backend', 3, false),
('TypeScript', 'frontend', 4, true),
('Tailwind CSS', 'frontend', 5, true);

-- Insert sample site settings
INSERT INTO site_settings (key, value, description, data_type) VALUES
('site_title', 'My Portfolio', 'Website title', 'text'),
('site_description', 'Full-stack Developer Portfolio', 'Website description', 'text'),
('contact_email', 'hello@example.com', 'Contact email address', 'text'),
('github_url', 'https://github.com/username', 'GitHub profile URL', 'text'),
('linkedin_url', 'https://linkedin.com/in/username', 'LinkedIn profile URL', 'text'),
('show_blog', 'true', 'Enable/disable blog section', 'boolean'),
('max_projects_per_page', '6', 'Number of projects per page', 'number');

-- =======================
-- FUNCTIONS AND TRIGGERS
-- =======================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();