import React, { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAdmin } from "../../context/AdminContext";

export default function TableEmploye({
  ShowEdit,
  showModalDelete,
  setEdit,
  setOpen,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1); // Pour suivre le groupe de pages actuel
  const itemsPerPage = 5;
  const { setOpenModalDelete, setInfo, listEmploye } = useAdmin();

  const totalPages = Math.ceil(listEmploye.length / itemsPerPage);
  const pagesPerGroup = 3;

  const currentData = listEmploye.slice(
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
          className={`px-4 py-2 text-sm rounded-md transition-colors duration-300 ${
            currentPage === i
              ? "bg-blue-600 text-white"
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
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="bg-gray-100  text-gray-700 ">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Poste</th>
            <th className="px-4 py-2">Salaire</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-white">
                  <span>{row.nom.split(" ")[0].charAt(0)}</span>
                </div>
                <span className="ml-2 text-sm font-semibold">{row.nom}</span>
              </td>
              <td className="px-4 py-2 text-sm">{row.email}</td>
              <td className="px-4 py-2 text-sm">{row.contact}</td>
              <td className="px-4 py-2 text-sm">{row.postes.nom}</td>
              <td className="px-4 py-2 text-sm">
                <span className="bg-gray-100 px-4 py-1 rounded-full text-[#027A48] font-semibold">
                  {row.salaires_brut.toLocaleString("fr-FR")} Ar
                </span>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  className="text-gray-600 hover:text-primary text-sm"
                  onClick={() => {
                    setOpenModalDelete(true);
                    setInfo(row);
                  }}
                  aria-label="Voir les détails"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-600 hover:text-blue-700 text-sm"
                  onClick={() => {
                    ShowEdit(row);
                    setEdit(row.id);
                    setOpen(true)
                  }}
                  aria-label="Modifier"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-600 hover:text-red-700 text-sm"
                  onClick={() => {
                    showModalDelete(true);
                    setInfo(row);
                  }}
                  aria-label="Supprimer"
                >
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
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 ${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-primary mx-2 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2  mx-2 ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
