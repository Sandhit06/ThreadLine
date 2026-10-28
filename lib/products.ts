export type Category = "All" | "Tops" | "Dresses" | "Footwear" | "Accessories";

export type Product = {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  originalPrice?: number;
  color: string;
  badge?: string;
  image: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "p1", name: "Everyday Linen Shirt", category: "Tops", price: 899, originalPrice: 1299,
    color: "Cloud white", badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "p2", name: "Weekend Knit Polo", category: "Tops", price: 749, originalPrice: 999,
    color: "Butter yellow", badge: "NEW DROP",
    image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "p3", name: "The After Hours Dress", category: "Dresses", price: 1499,
    color: "Cherry red", badge: "TRENDING",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "p4", name: "City Runner Sneakers", category: "Footwear", price: 1899, originalPrice: 2499,
    color: "White / grey", badge: "-24%",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    sizes: ["6", "7", "8", "9", "10"]
  },
  {
    id: "p5", name: "Soft Structure Tote", category: "Accessories", price: 1099,
    color: "Toffee brown",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    sizes: ["One size"]
  },
  {
    id: "p6", name: "Off-Duty Denim", category: "Tops", price: 1299, originalPrice: 1699,
    color: "Washed blue",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: "p7", name: "Lightweight Layer Jacket", category: "Tops", price: 1799,
    color: "Olive green", badge: "JUST IN",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "p8", name: "Satin Evening Mini", category: "Dresses", price: 1599, originalPrice: 1999,
    color: "Midnight black",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    sizes: ["XS", "S", "M", "L"]
  },
];
