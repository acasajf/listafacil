
export interface ListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  notes?: string;
  completed: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  imageUrl: string;
  items: ListItem[];
  createdAt: string;
  updatedAt: string;
}

export enum Page {
  Login,
  ListsDashboard,
  ListDetail,
  ShoppingMode,
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
