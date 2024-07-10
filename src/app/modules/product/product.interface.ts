export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  id: string;
  inStock: boolean;
  //   reviews: Array<{
  //     reviewer: string;
  //     rating: number;
  //     comment: string;
  //   }>;
  isFeatured: boolean;
  isBestseller: boolean;
  // isNew: boolean;
  isPopular: boolean;
  isSoldOut: boolean;
  isDiscounted: boolean;
  isBundled: boolean;
  isOutofstock: boolean;
  isComingSoon: boolean;
  isDiscountedBundle: boolean;
};
