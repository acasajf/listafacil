import { ShoppingList, Market, ProductPrice } from '../types'

export const initialLists: ShoppingList[] = [
  {
    id: '1',
    name: 'Compras da Semana',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBRiXSOoNMOMxMEYWnqJpSt5XNHuo0tNAcJ0bwtgOi2GxBSr-HsowWChsjdlFwA_icaOw3OCTyGZ0Qzr1X0IzAo9fXYucVd3I0uNsFTCGVKuJ2kssgtM0h6xPFP_-XkhSAFswOoykKxgZKpv7gQoKf1m571vi82gxVrH_sFbZeKdU988J3GK1eqW3OAnfKOetDgeALm5NKxezEuwxpaRCPk19Lj8bRvNcfzhV2Xy8WDT4U3ZR19UzuaRujIasAuSOsPo4Geu6H_sES',
    items: [
      {
        id: '1-1',
        name: '2kg de Arroz Branco',
        quantity: 2,
        unit: 'kg',
        category: 'Mercearia',
        completed: false,
      },
      {
        id: '1-2',
        name: '1kg de Feijão Carioca',
        quantity: 1,
        unit: 'kg',
        category: 'Mercearia',
        completed: true,
      },
      {
        id: '1-3',
        name: '500g de Macarrão Parafuso',
        quantity: 500,
        unit: 'g',
        category: 'Mercearia',
        completed: false,
      },
    ],
    createdAt: new Date('2024-07-16T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-18T11:30:00Z').toISOString(),
  },
  {
    id: '2',
    name: 'Churrasco de Domingo',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCj3Oor9K5PzZYPc2k9_SZ0oSdrhpKRWLdKRnXKw5uNuwPmuqiQ-rkgKZMLO23iJbuH3rWDQHsymVWK0FWDVBjikkqrQeaEQm0r8hqgswgFVWkPP4gvXnvyClNzjmbWjQQqFP2Ks8HfsFw0qEUyNK-AFt8BZoJugwr6diXfCrzH9OgS3O8iBEUg8AVU2rmTfHAJO6Xq9BbyqnZ32FrxLs_7R7KG62qRveTqybOLvm2sf4K9IXC3mn-r-2W-o4ZlrH4WWq8FFrY21vX',
    items: [],
    createdAt: new Date('2024-07-15T14:20:00Z').toISOString(),
    updatedAt: new Date('2024-07-15T14:20:00Z').toISOString(),
  },
  {
    id: '3',
    name: 'Bolo de Aniversário',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFSarI56F2-A6V6XczCL45KMXgRubSBcZbw0OrH1fKxiKbTsqS-k1yzbHZeTmyJu2E5xJSKyXoTbWpUN8gKmkKQNKFRBzagA0UF_BGYzBpjoBPPrXDJT10ey187srSvhRzEgoOG7zjwqfP0ZkI4FhPX_pRR9KrcLs7oaCbPQfZxXDOpTXV8o_CUuLwUYALTsQc5jDgNDIAesQdf1638zK0BRA-RcPQdG2W_LQEePJbr3M1_aqP75Z3LpZ7iZOcjdSr80pWbw1IpWuW',
    items: [
      {
        id: '3-1',
        name: 'Farinha de Trigo',
        quantity: 1,
        unit: 'kg',
        category: 'Mercearia',
        completed: false,
      },
      {
        id: '3-2',
        name: 'Ovos',
        quantity: 6,
        unit: 'un',
        category: 'Laticínios e Frios',
        completed: false,
      },
    ],
    createdAt: new Date('2024-07-14T09:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-14T09:00:00Z').toISOString(),
  },
]

export const mockMarkets: Market[] = [
  {
    id: 'm1',
    name: 'Supermercado Preço Bom',
    type: 'supermarket',
    logo: 'https://cdn-icons-png.flaticon.com/512/3081/3081840.png',
  },
  {
    id: 'm2',
    name: 'Hortifruti Frescor',
    type: 'hortifruti',
    logo: 'https://cdn-icons-png.flaticon.com/512/766/766023.png',
  },
  {
    id: 'm3',
    name: 'Hyper Market Extra',
    type: 'supermarket',
    logo: 'https://cdn-icons-png.flaticon.com/512/891/891462.png',
  },
]

export const mockPrices: ProductPrice[] = [
  // Preço Bom
  {
    id: 'p1',
    marketId: 'm1',
    productName: 'Arroz Branco',
    price: 24.9,
    updatedAt: '2024-07-18',
  },
  {
    id: 'p2',
    marketId: 'm1',
    productName: 'Feijão Carioca',
    price: 8.5,
    updatedAt: '2024-07-18',
  },
  {
    id: 'p3',
    marketId: 'm1',
    productName: 'Macarrão Parafuso',
    price: 4.2,
    updatedAt: '2024-07-18',
  },
  {
    id: 'p4',
    marketId: 'm1',
    productName: 'Farinha de Trigo',
    price: 5.9,
    updatedAt: '2024-07-18',
  },
  {
    id: 'p5',
    marketId: 'm1',
    productName: 'Ovos',
    price: 12.0,
    updatedAt: '2024-07-18',
  },

  // Hortifruti Frescor (Usually doesn't sell Rice/Beans, but let's assume they have some basics or just fruits)
  // Let's add some prices for them anyway or make them more expensive
  {
    id: 'p6',
    marketId: 'm2',
    productName: 'Ovos',
    price: 14.0,
    updatedAt: '2024-07-18',
  },

  // Hyper Market Extra
  {
    id: 'p7',
    marketId: 'm3',
    productName: 'Arroz Branco',
    price: 23.5,
    updatedAt: '2024-07-18',
  },
  {
    id: 'p8',
    marketId: 'm3',
    productName: 'Feijão Carioca',
    price: 9.0,
    updatedAt: '2024-07-18',
  },
  {
    id: 'p9',
    marketId: 'm3',
    productName: 'Macarrão Parafuso',
    price: 3.99,
    updatedAt: '2024-07-18',
  },
  {
    id: 'p10',
    marketId: 'm3',
    productName: 'Farinha de Trigo',
    price: 6.5,
    updatedAt: '2024-07-18',
  },
  {
    id: 'p11',
    marketId: 'm3',
    productName: 'Ovos',
    price: 11.5,
    updatedAt: '2024-07-18',
  },
]
