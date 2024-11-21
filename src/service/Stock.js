import Axios from "./CallerAxios";

let getEtatStockEtoil = () => {
    return Axios.get('etat/stockstoiles')
}

let getStockMagasin = () => {
    return Axios.get('etat/stocksmagasin')
}
let getStockVitrine = () => {
    return Axios.get('etat/stocksvitrine')
}
let getStockTiko = () => {
    return Axios.get('etat/stockstiko')
}


export const Stock = {getEtatStockEtoil,getStockMagasin,getStockVitrine,getStockTiko}