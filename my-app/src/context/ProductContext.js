import React, { createContext, useState, useContext, useReducer } from "react"

const ProductContext = createContext()

// state = Previous value ({products:null}) , action = the object that we passed into the dispatch function
// dispatch({ type:"", payload:[{},{}]})
export const productsReducer = (state,action ) => {
  switch(action.type){
    case 'SET_PRODUCTS':
      return {
        products: action.payload
      }
    case 'CREATE_PRODUCT':
      return {
        products: [action.payload, ...state.products]
      }
    case 'UPDATE_PRODUCT':
      return {
        products: state.products.map((product) =>
          product.modelNumber === action.payload.modelNumber ? { ...product, ...action.payload } : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        products: state.products.filter((p) => p.modelNumber !== action.payload.modelNumber)
      }
    default:
      return state
  } 
}

export const ProductProvider = ({ children }) => {

  const [state, dispatch] = useReducer(productsReducer, {
    products: null
  });
  const [searchTerm, setSearchTerm] = useState("")


  const searchProducts = () => {
    return state.products.filter(
      (product) =>
        product.modelNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <ProductContext.Provider
      value={{
        ...state,
        dispatch,
        searchTerm,
        setSearchTerm,
        searchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

