import React, { useState } from 'react'
import Modal from '../Modal'
import { useAdmin } from '../../../context/AdminContext'
import { Poste } from '../../../service/Poste'
import { usePoste } from '../../../context/PosteContext'
export default function AjoutPoste() {
    const {setEdit,handleSubmit,getNom,getDescription,onclose,open,edit,data,errors} = usePoste()
 
  return (
    <>
    <Modal open={open} onClose={onclose} width={'450px'}>
        <h1 className='text-lg font-semibold  border-b-2 border-gray-200 w-fit mt-5'>{ edit? "Modifier" : "Création"} Poste  </h1>
        <form action="" method="post px-5" onSubmit={handleSubmit}>
            <div className="form-group mt-5">
                <label htmlFor="">Nom <span className="text-red-500 font-semibold">*</span></label>
                <input type="text" value={data.nom} className={`form-control w-full ${ errors.nom && "border-red-600"}`}  placeholder='Entrer le nom' onChange={getNom}/>
                 {/* Message d'erreur pour le nom */}
                 {errors.nom && (
                    <p className="text-red-600 mt-1 text-sm">{errors.nom}</p>
                  )}
            </div>
          
            <div className="form-group mt-5">
                <label htmlFor="">Déscription </label>
                <textarea name="" value={data.description} id="" cols="30" rows="10"  className="form-control w-full h-20 px-3"   onChange={getDescription}></textarea>
             
            </div>
            <div className="boutton mt-5 text-right">
                <button className='btn' type='button' onClick={()=>onclose()}>Annuler</button>
                <button className='btn-primary ml-3 px-5' type='submit'>{ edit? "Modifier" : "Ajouter"}</button>
            </div>
        </form>
    </Modal>

    </>
  )
}
