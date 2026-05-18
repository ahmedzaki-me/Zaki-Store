export interface Item {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  stock_quantity: number;
  category_id: string;
  description?: string;
}

export interface CartItem extends Item {
  count: number;
  notes: string;
}
