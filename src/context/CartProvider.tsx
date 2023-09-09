import {useReducer, useMemo, createContext, ReactElement} from 'react'

// SET UP REDUCER 
// Cart item type
type CartItemType = {
  sku: string,
  name: string,
  price: number,
  qty: number
}

// Cart state type 
type CartStateType = {cart: CartItemType[]}; 

// Cart init state
const initCartState: CartStateType = {cart: []}

// reducer action strings
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "REMOVE",
  SUBMIT: "SUBMIT" 
}

// reducer action types type
export type ReducerActionType = typeof REDUCER_ACTION_TYPE

// reducer action type
export type ReducerAction = {
  type: string,
  payload?: CartItemType,
}

// reducer function
const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  // decide active action
  switch(action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if(!action.payload) {
        throw new Error('action.payload missing in ADD action')
      }
      const {sku, name, price} = action.payload // get payload data values
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku) // fitler & store arr of cart items not updated
      const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku); // check if action payload's sku val is to be found in current state
      const qty: number = itemExists ? itemExists.qty + 1 : 1 //  active item exists ? qty += 1 : qty = 1 

      return {...state, cart: [ ...filteredCart, {sku, name, price, qty}]}
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if(!action.payload) {
        throw new Error('action.payload missing in REMOVE action')
      }
      const {sku, qty} = action.payload
      const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku); // check if item is in cart  
      if(!itemExists) {
        throw new Error('Item must exist in order to update quantity')
      } 

      const updatedItem: CartItemType = {...itemExists, qty} // 

      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku) 

      return {...state, cart: [...filteredCart, updatedItem]}
    }
    // case REDUCER_ACTION_TYPE.QUANTITY: {
      // if(!action.payload) {
      //     throw new Error('action.payload missing in QUANTITY action')
      // }
    // }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return {...state, cart: []} // empty out cart on submit 
    }
    default: 
      throw new Error('Unindentified reducer action type')
  }
} 

// use context
const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState)

  // memoize reducer actions -> so they won't cause rerender
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
  }, [])

  // CALCULATE VALUES
  // total items
  const totalItems: number = state.cart.reduce((prevValue, item) => {
    return prevValue + item.qty
  }, 0);

  // total price with formatted price value
  const totalPrice: string = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(state.cart.reduce((prevValue, item) => {
    return prevValue + (item.price * item.qty) // calc item price: 2$ * 5 items -> 10$. add it to the accumulator 
  }, 0));

  // sort cart items
  const cart = state.cart.sort((a,b) => {
    const itemA = Number(a.sku.slice(-4)) // chop last 4 digits of sku -> convert it to number (e.g. "item0001" -> 0001)
    const itemB = Number(b.sku.slice(-4))
    return itemA - itemB
  })

  return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
}

// CREATE CONTEXT

export type UserCartContextType = ReturnType<typeof useCartContext>

// state initializer 
const initCartContextState: UserCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: []
}

export const CartContext = createContext<UserCartContextType>(initCartContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const CartProvider = ({children}: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider
      value={useCartContext(initCartState)}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext