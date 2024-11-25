import React, { useState, useEffect } from 'react';
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { PlusCircle } from 'lucide-react';
import AjoutProduit from '../../components/modal/produit/AjoutProduit';
import { useProduit } from '../../context/ProduitContext';
import TableProduit from '../../components/table/TableProduit';
import LoadingPage from '../../components/LoadingPage';
import DeleteProduct from '../../components/produit/DeleteProduct';

export default function Produit() {
    const { setOpen, resertForm, listProduit, setEdit } = useProduit();
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement

    // Gestion du spinner (2 secondes)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout); // Nettoyer le timeout
    }, []);

    const openModal = () => {
        resertForm();
        setOpen(true);
        setEdit(null);
    };

    return (
        <>
            <div className="poste flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-secondary text-gray-700 text-2xl">
                        Liste des produits
                    </span>
                    <div className="nombre ml-2 w-5 h-5 bg-gray-200 rounded-full flex justify-center items-center mt-2">
                        <span className="text-xs text-primary font-semibold">
                            {listProduit?.length || 0}
                        </span>
                    </div>
                </div>
                <div className="add_employe">
                    <button className="flex items-center btn-primary" onClick={openModal}>
                        <PlusCircle className="w-5 h-5 text-white" />
                        <span className="pl-1">Ajouter produit</span>
                    </button>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <div className="search flex items-center">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Rechercher"
                        className="pl-2 outline-none flex-grow text-secondary text-md placeholder:text-secondary placeholder:text-sm placeholder:font-semibold"
                    />
                </div>
            </div>
            <div className="table-produit mt-5">
                {isLoading ? (
                    <LoadingPage />
                ) : listProduit?.length > 0 ? (
                    <TableProduit />
                ) : (
                    <div className="text-center text-gray-500">
                        Aucun produit disponible.
                    </div>
                )}
            </div>
            <AjoutProduit />
            <DeleteProduct/>
        </>
    );
}
