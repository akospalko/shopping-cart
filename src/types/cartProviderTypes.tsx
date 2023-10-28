import { ReactElement } from 'react'
import { useCartContext } from '../context/CartProvider'
import { REDUCER_ACTION_TYPE_CART } from '../data/reducerActionTypeConstant'

// ----------SET UP REDUCER----------
// Cart item type
export type CartItemType = {
  sku: string,
  name: string,
  price: number,
  qty: number,
  stock: number,
  category: string
}

// Cart state type
export type CartStateType = {cart: CartItemType[]};

// reducer action types type
export type ReducerActionType = typeof REDUCER_ACTION_TYPE_CART

// reducer action type
export type ReducerAction = {
  type: string,
  payload?: CartItemType,
}

// ----------CREATE CONTEXT----------
// define type for use context return value & state init type  
export type UserCartContextType = ReturnType<typeof useCartContext>

// ----------CREATE PROVIDER----------
export type ChildrenType = {children?: ReactElement | ReactElement[]}