// -- 2. CATEGORIES TABLE (cho projects và blog posts)
// CREATE TABLE categories (
//     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     name VARCHAR(100) NOT NULL UNIQUE,
//     slug VARCHAR(100) NOT NULL UNIQUE,
//     description TEXT,
//     color VARCHAR(7) DEFAULT '#3B82F6', -- hex color code
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color: string;
    created_at: Date;
}