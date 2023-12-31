// Navigation menu related types
import { ReactElement } from 'react';
import { NAVIGATION_MENU_ITEMS_ACTION } from '../utility/constants';

// TYPES
// NavigationMenuProvider.tsx
export type ModalTypes = {
  MAIN_MENU: boolean,
  FILTER_MENU: boolean,
  SIDE_MENU: boolean
}

export type UseNavigationMenuContextType = {
  modal: ModalTypes,
  isClosing: boolean,
  toggleModal: (modalKey: keyof ModalTypes, switchOffAll?: boolean | undefined) => void
  toggleMenu: (modalKey: keyof ModalTypes) => void
}

// useGetNavigationItems.tsx
export type NavigationMenuActionType = keyof typeof NAVIGATION_MENU_ITEMS_ACTION;

export type NavigationMenuProductCategoriesDataType = {
  name: string,
  icon: string,
  category: string
}
export type NavigationMenuDataType = {
  name: string,
  icon: string,
  to: string
}

export type CategoryIconKeyTypes = "HomeIcon" | "CartIcon" | "ProductIcon" | "AllIcon" | "ProcessorsIcon" | "MobileIcon" | "VideoCardIcon" | "RAMIcon";
export type CategoryIconType = {
  [key in CategoryIconKeyTypes]: ReactElement;
};

// Render active navigation
export type ItemStylesType = {
  navLinkStyle: string,
  navLinkStyleActive: string,
  navLinkLabel: string
}