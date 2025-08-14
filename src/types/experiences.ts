// -- 9. EXPERIENCES TABLE (work experience)
// CREATE TABLE experiences (
//     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     company_name VARCHAR(255) NOT NULL,
//     position VARCHAR(255) NOT NULL,
//     description TEXT,
//     company_url VARCHAR(255),
//     company_logo_url TEXT,
//     location VARCHAR(255),
//     employment_type VARCHAR(50), -- 'full-time', 'part-time', 'contract', 'internship'
//     is_current BOOLEAN DEFAULT FALSE,
//     start_date DATE NOT NULL,
//     end_date DATE,
//     sort_order INTEGER DEFAULT 0,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );

export interface Experience {
    id: string;
    company_name: string;
    position: string;
    description?: string;
    company_url?: string;
    company_logo_url?: string;
    location?: string;
    employment_type?: 'full-time' | 'part-time' | 'contract' | 'internship';
    is_current?: boolean;
    start_date: Date;
    end_date?: Date;
    sort_order?: number; // Used for ordering experiences
    created_at?: Date; // Timestamp of when the experience was created
}