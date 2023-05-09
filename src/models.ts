import { MouseEventHandler } from "react";

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
  onPlus?: (obj: CardInfo) => CardInfo | Promise<void>;
  onFavorite?: (obj: CardInfo) => CardInfo | Promise<void>;
  favorited?: boolean;
  loading?: boolean;
};

export type DrawerProps = {
  items: CardInfo[];
  onClose: MouseEventHandler<HTMLElement>;
  onRemoveItem: (id: number) => void;
  opened: boolean;
};

export type HeaderProps = {
  onClickCart: MouseEventHandler<HTMLElement>;
};

export type HomeProps = {
  items: CardInfo[];
  searchValue: string;
  onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearchValue: () => void;
  onAddToCart: (obj: CardInfo) => CardInfo | Promise<void>;
  onAddToFavorites: (obj: CardInfo) => CardInfo | Promise<void>;
  isLoading: boolean;
};

export type FavoritesProps = {
  onAddToCart: (obj: CardInfo) => CardInfo | Promise<void>;
  onAddToFavorites: (obj: CardInfo) => CardInfo | Promise<void>;
  isLoading: boolean;
};

export type OrdersProps = {
  onAddToCart: (obj: CardInfo) => CardInfo | Promise<void>;
  onAddToFavorites: (obj: CardInfo) => CardInfo | Promise<void>;
};

export type InfoProps = {
  inCart: boolean;
  img: string;
  title: string;
  desc: string;
};

export type GetCardResponse = {
  data: CardInfo[];
};

export type CreateCardResponse = {
  id: number;
  parentId?: number;
  title: string;
  price: number;
  imageUrl: string;
};

export type DeleteCardResponse = '';
