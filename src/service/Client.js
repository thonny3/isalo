import Axios from "./CallerAxios";

let getAllClient = () => {
    return Axios.get('clienttoiles')
}




export const Client = {getAllClient}