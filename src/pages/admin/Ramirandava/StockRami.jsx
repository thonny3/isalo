import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React from 'react'
import TvaleMagasin from '../../../components/table/TvaleMagasin'
import TableVitrine from '../../../components/table/TableVitrine'
import TableTiko from '../../../components/table/TableTiko'
import { useStock } from '../../../context/StockContext'

export default function StockRami() {
    const {setStockage,stockage} =  useStock()

  return (
    <>
        <h3 className='text-2xl'>Stock {stockage}</h3>
        <div className="boutton flex justify-center items-center space-x-8">
            <button className='text-gray-700 hover:border-b-2 duration-150  hover:text-primary hover:border-red-900' onClick={()=>setStockage("magasin")}> Stocks Magasin</button>
            <button className='text-gray-700 hover:border-b-2  hover:text-primary hover:border-red-900' onClick={()=>setStockage("vitrine")}> Stocks Vitrine</button>
            <button className='text-gray-700 hover:border-b-2  hover:text-primary hover:border-red-900' onClick={()=>setStockage("tiko")} >Stocks TIKO</button>
        </div>
        <div className="mt-6  flex justify-between items-center">
        <div className="search flex items-center">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher"
            className="pl-2 outline-none flex-grow text-secondary text-md placeholder:text-secondary placeholder:text-sm placeholder:font-semibold"
          />
        </div>
      </div>
      <div className="mt-5">
        {
            stockage=="magasin" ? <TvaleMagasin/>: null
        }
         {
            stockage=="vitrine" ? <TableVitrine/>: null
        }
         {
            stockage=="tiko" ? <TableTiko/>: null
        }
  
      </div>
    </>
  )
}
