import Axios from "./CallerAxios";

let getAllCategory = () => {
    return Axios.get('categorie')
}

let getAllProduct = () => {
    return Axios.get('produits')
}

let createProduct =  (data)=>{
    return Axios.post('produits',data)
}

let deleteProduct  = (id)=>{
    return Axios.delete('produits/'+id)
}

let updateProduct =  (id,data)=>{
    return Axios.put('produits/' + id,data)
}
export const Produit = {getAllCategory,getAllProduct,createProduct,deleteProduct,updateProduct}