import Axios from "./CallerAxios";


// approvisionement toils d'isalo 
let getAllApprovisionement = () => {
    return Axios.get('stockstoiles')
}

let createApprovisionement = (data) => {
    return Axios.post('stockstoiles',data)
}

// approvisionement Ramirandava
let createApprovisionementRami = (data) => {
    return Axios.post('stockramiss',data)
}



export const Approvisionement = {createApprovisionement,getAllApprovisionement,createApprovisionementRami}