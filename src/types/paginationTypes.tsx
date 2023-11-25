import { ReactElement } from "react";


export type pageURLParamsType = {
  category: string,
  page: number
} 


export type PaginationPropsType = {
  totalPages: number,
  pageURLParams: pageURLParamsType 
};

export type NavigationButtonPropsType = {
  key?: string | number;
  style?: string;
  clicked: () => void;
  disabled?: boolean;
  label?: string | number | ReactElement | ReactElement[];
};

export type GoToPageButtonParameterType = number;
export type GoToPageButtonType = (page: GoToPageButtonParameterType ) => ReactElement