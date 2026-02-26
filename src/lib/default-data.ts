import type { Category } from './types'

export const defaultCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Herramientas de Proyecciones',
    slug: 'herramientas-de-proyecciones',
    icon: 'calculator',
    color: '#c9a84c',
    sort_order: 1,
    created_at: new Date().toISOString(),
    links: [
      {
        id: 'link-1',
        category_id: 'cat-1',
        title: 'Calculadora de Proyecciones',
        url: 'https://calculadora.imperiansagency.com/',
        description: 'Herramienta para calcular proyecciones de crecimiento, ingresos y métricas clave de los proyectos de la agencia.',
        icon: 'calculator',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'cat-2',
    name: 'Sistemas Internos',
    slug: 'sistemas-internos',
    icon: 'zap',
    color: '#4a90d9',
    sort_order: 2,
    created_at: new Date().toISOString(),
    links: [
      {
        id: 'link-2',
        category_id: 'cat-2',
        title: 'Sistema Infinitus ADS',
        url: 'https://infinitusads.imperiansagency.com',
        description: 'Plataforma interna de gestión y optimización de campañas publicitarias para los clientes de la agencia.',
        icon: 'zap',
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
  },
]
