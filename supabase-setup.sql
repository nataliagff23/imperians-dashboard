-- =============================================
-- Imperians Dashboard - Setup de Base de Datos
-- Ejecutar este SQL en: Supabase → SQL Editor
-- =============================================

-- Tabla de categorías
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT 'folder',
  color TEXT DEFAULT '#c9a84c',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de links
CREATE TABLE links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT 'external-link',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_links_category_id ON links(category_id);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);
CREATE INDEX idx_links_sort_order ON links(sort_order);

-- Políticas de seguridad (acceso abierto, sin autenticación)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on links" ON links FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- Datos de ejemplo (puedes modificar o eliminar)
-- =============================================

INSERT INTO categories (name, slug, icon, color, sort_order) VALUES
  ('Calculadoras', 'calculadoras', 'calculator', '#c9a84c', 1),
  ('Onboarding', 'onboarding', 'user-plus', '#4a90d9', 2),
  ('Sistemas Internos', 'sistemas-internos', 'server', '#e07c3e', 3),
  ('Herramientas', 'herramientas', 'wrench', '#6c5ce7', 4),
  ('Documentos', 'documentos', 'file-text', '#00b894', 5);

INSERT INTO links (category_id, title, url, description, icon, sort_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'calculadoras'), 'Calculadora de Proyectos', 'https://example.com/calc', 'Estimativa de horas y costos', 'calculator', 1),
  ((SELECT id FROM categories WHERE slug = 'calculadoras'), 'Calculadora de ROI', 'https://example.com/roi', 'Retorno de inversión para clientes', 'bar-chart', 2),
  ((SELECT id FROM categories WHERE slug = 'onboarding'), 'Guía del Nuevo Miembro', 'https://example.com/onboarding', 'Paso a paso para nuevos miembros', 'book-open', 1),
  ((SELECT id FROM categories WHERE slug = 'onboarding'), 'Formulario de Alta', 'https://example.com/alta', 'Registro de nuevos colaboradores', 'user-plus', 2),
  ((SELECT id FROM categories WHERE slug = 'sistemas-internos'), 'CRM', 'https://example.com/crm', 'Sistema de gestión de clientes', 'users', 1),
  ((SELECT id FROM categories WHERE slug = 'sistemas-internos'), 'Panel de Facturación', 'https://example.com/billing', 'Facturación y cobros', 'credit-card', 2),
  ((SELECT id FROM categories WHERE slug = 'herramientas'), 'Figma', 'https://figma.com', 'Diseño colaborativo', 'layout', 1),
  ((SELECT id FROM categories WHERE slug = 'herramientas'), 'Notion', 'https://notion.so', 'Documentación y wikis', 'file-text', 2),
  ((SELECT id FROM categories WHERE slug = 'documentos'), 'Plantillas de Contratos', 'https://example.com/contratos', 'Templates legales', 'file-text', 1),
  ((SELECT id FROM categories WHERE slug = 'documentos'), 'Manual de Marca', 'https://example.com/brand', 'Guía de identidad visual', 'book-open', 2);
