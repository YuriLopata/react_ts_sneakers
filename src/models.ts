export type CardInfo = {
  id: number;
  parentId?: number;
  title: string;
  price: number;
  imageUrl: string;
};

export type CardProps = {
  id: number;
  parentId?: number;
  title: string;
  price: number;
  imageUrl: string;
  onPlus?: any;
  onFavorite?: any;
  favorited?: boolean;
  loading?: boolean;
};

export type DrawerProps = {
  items: CardInfo[];
  onClose: any;
  onRemoveItem: any;
  opened: boolean;
};

export type HomeProps = {
    items: CardInfo[];
    searchValue: any;
    onChangeSearchInput: any;
    clearSearchValue: any;
    onAddToCart: any;
    onAddToFavorites: any;
    isLoading: boolean;
  };
  
export type FavoritesProps = {
  onAddToCart: any;
  onAddToFavorites: any;
  isLoading: boolean;
};

export type OrdersProps = {
  onAddToCart: any;
  onAddToFavorites: any;
};

export type InfoProps = {
  inCart: boolean;
  img: string;
  title: string;
  desc: string;
};
