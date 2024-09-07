import React, { createContext, useState, useEffect } from 'react';
import { products } from '../data/products';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    
    setProductList(products); 
  }, []);

  return (
    <ProductContext.Provider value={{ productList }}>
      {children}
    </ProductContext.Provider>
  );
};
