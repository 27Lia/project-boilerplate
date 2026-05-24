export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profileImageUrl?: string;
  phone?: string;
}

export interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}
