import Axios from "./CallerAxios";

let createReservation = (data) => {
    return Axios.post('reservations',data)
}

let getAllReservation = () => {
    return Axios.get('reservations')
}

let diponibleChmabre = (data) => {
    return Axios.get('disponibiliteChambre',{ params: data })
}

let  confirmationReservation =  (id)=>{

    return Axios.post('reservations/confirmer/'+id)
}



export const Reservation = {createReservation,getAllReservation,diponibleChmabre,confirmationReservation}