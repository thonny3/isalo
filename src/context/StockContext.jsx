import React, { createContext, useContext, useEffect, useState } from "react";
import { Stock } from "../service/Stock";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  //stock  toils d'isalo
  const [etatStock, setEtatStock] = useState([]);
  const [magasin, setMagsin] = useState([]);
  const [vitrine, setVitrine] = useState([]);
  const [tiko, setTiko] = useState([]);
  const [stockage, setStockage] = useState("magasin");

  const getEtatStock = () => {
    Stock.getEtatStockEtoil()
      .then((res) => {
        setEtatStock(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getStockMagasin = () => {
    Stock.getStockMagasin()
      .then((res) => {
        setMagsin(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getStockVitrine = () => {
    Stock.getStockVitrine()
      .then((res) => {
        setVitrine(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getStockTiko = () => {
    Stock.getStockTiko()
      .then((res) => {
        setTiko(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEtatStock();
    getStockMagasin();
    getStockVitrine();
    getStockTiko();
  }, []);

  return (
    <StockContext.Provider value={{ etatStock, stockage, setStockage,  magasin , vitrine ,  tiko }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  return useContext(StockContext);
};
