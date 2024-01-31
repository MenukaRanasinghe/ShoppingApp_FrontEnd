// product.model.ts

export interface Product {
    id: number | null; // Allow null
    name: string;
    colour: string;
    description: string;
    price: number | null; // Allow null
    quantity: number | null; // Allow null
    category_id: number | null; // Allow null
    sizes: string;
    photo: File | null; // Assuming 'photo' is of type 'File' or 'null'
  }
  