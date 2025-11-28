export interface ListItem {
  id: string
  name: string
  quantity: number
  unit: string
  category: string
  notes?: string
  image?: string
  completed: boolean
}

export interface ShoppingList {
  id: string
  name: string
  imageUrl: string
  items: ListItem[]
  createdAt: string
  updatedAt: string
}

export interface Market {
  id: string
  name: string
  type: 'supermarket' | 'hortifruti' | 'bakery'
  logo?: string
}

export interface ProductPrice {
  id: string
  marketId: string
  productName: string
  price: number
  updatedAt: string
}

export enum Page {
  Login,
  ListsDashboard,
  ListDetail,
  ShoppingMode,
  Comparison,
}

export enum SortOption {
  Name,
  CreationDate,
  LastModified,
}

export enum SortDirection {
  Asc,
  Desc,
}
