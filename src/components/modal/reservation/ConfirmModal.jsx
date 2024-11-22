import React from "react";
import { useReservation } from "../../../context/ReservationContext";
import Modal from "../Modal";
import { CheckCircle, TrashIcon } from "lucide-react";

export default function ConfirmModal() {
  const { openD ,setOpenD} = useReservation();
  return (
    <>
      <Modal open={openD} onClose={()=>setOpenD(false)}>
        <div className="flex justify-center items-center h-full">
          <div className="contenu text-center w-80">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <span className="font-bold text-2xl text-gray-700 ">
              Êtes-vous sûr de vouloir confirmer cette réservation ?
            </span>
          </div>
        </div>
        <div className="float-end mt-2">
            <button className="btn hover:bg-red-500 hover:text-white">Annuler</button>
            <button className="btn bg-green-500 text-white ml-5">Confirmer</button>
        </div>
      </Modal>
    </>
  );
}
