import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useStock } from "../../context/StockContext";

export default function TableStockToils() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;
  const {etatStock} =  useStock()

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(etatStock.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = etatStock.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextGroup = () => {
    setPageGroup(pageGroup + 1);
  };

  const goToPreviousGroup = () => {
    setPageGroup(pageGroup - 1);
  };

  // Fonction pour rendre les numéros de page avec ellipses
  const renderPageNumbers = () => {
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pages = [];

    if (pageGroup > 1) {
      pages.push(
        <span key="start-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-4 py-2 text-sm ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (pageGroup < Math.ceil(totalPages / pagesPerGroup)) {
      pages.push(
        <span key="end-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    return pages;
  };
  return (
    <>
    <div className="">
    <table className="text-left w-full">
<thead>
  <tr className="bg-gray-100 text-sm text-gray-500 font-normal">
    <th className="px-4 py-2">Nom</th>
    <th className="px-4 py-2">Catégorie</th>
    <th className="px-4 py-2">Quantite</th>
    <th className="px-4 py-2">Prix</th>
    <th className="px-4 py-2">Prix de vente</th>
    <th className="px-4 py-2">Action</th>
  </tr>
</thead>
<tbody>
  {currentData.map((row) => (
    <tr className="text-gray-600 mt-2">
      <td className="px-4 py-2 flex items-center">
       {row.produit.nom}
      </td>

      <td className="px-4 py-2 ">  {row.produit.categorie_id}</td>
      <td className="px-4 py-2">{row.quantite}</td>
      <td className="px-4 py-2">{row.produit.prix}</td>
      <td className="px-4 py-2">{row.produit.prix_vente}</td>
      <td className="px-4 py-2 flex space-x-2">
        <button className="text-gray-600 hover:text-blue-700 text-sm">
          <PencilSquareIcon className="w-5 h-5" />
        </button>
        <button className="text-gray-600 hover:text-red-700">
          <TrashIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={goToPreviousGroup}
          disabled={pageGroup === 1}
          className={`px-4 py-2 ${
            pageGroup === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <div className="flex space-x-2">{renderPageNumbers()}</div>
        <button
          onClick={goToNextGroup}
          disabled={pageGroup >= Math.ceil(totalPages / pagesPerGroup)}
          className={`px-4 py-2 ${
            pageGroup >= Math.ceil(totalPages / pagesPerGroup)
              ? "bg-gray-300"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
    </>
  )
}
