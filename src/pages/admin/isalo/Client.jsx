import { PlusCircle, Search } from 'lucide-react';
import React from 'react'
import TableClient from '../../../components/table/TableClient';

export default function Client() {
  return (
    <>
       <div className="poste flex items-center justify-between">
      <div className="flex items-center ">
          <span className="text-secondary text-gray-700 text-4xl ">
            Clients 
          </span>
          <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
            <span className="text-xs text-primary font-semibold">
              {5}
            </span>
          </div>
        </div>
        <div className="add_employe">
          <button
            className="flex items-center btn-primary"
            onClick={() => {
              setOpen(true);
              resertForm();
            }}
          >
            <PlusCircle className="w-5 h-5 text-white" />
            <span className=" pl-1">Ajouter client</span>
          </button>
        </div>
      </div>
     
      <div className="mt-10  flex justify-between items-center">
        <div className="search flex items-center">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher"
            className="pl-2 outline-none flex-grow text-secondary text-md placeholder:text-secondary placeholder:text-sm placeholder:font-semibold"
          />
        </div>
      </div>
      <div className="mt-3">
        <TableClient/>
      </div>
    </>
  )
}
