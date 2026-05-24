export interface ListItem {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface ListFilter {
  keyword?: string;
  page: number;
  size: number;
}
