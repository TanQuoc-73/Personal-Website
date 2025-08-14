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
    sort_order?: number; 
    created_at?: Date; 
}