import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const TableClient = () => {
  const data = [
    { nom: 'Alice Dupont', contact: '0654321234', adresse: '12 Rue des Champs', cin: 'B123456', status: 'green' },
    { nom: 'Bob Martin', contact: '0654325678', adresse: '34 Avenue des Roses', cin: 'B234567', status: 'red' },
    { nom: 'Claire Moreau', contact: '0654329876', adresse: '56 Boulevard de la Lune', cin: 'B345678', status: 'green' },
    { nom: 'David Lefevre', contact: '0654321122', adresse: '78 Rue des Peupliers', cin: 'B456789', status: 'orange' },
    { nom: 'Emma Lefevre', contact: '0654323344', adresse: '90 Rue des Pins', cin: 'B567890', status: 'orange' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Récupérer les données actuelles en fonction de la page
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left rounded-md shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Adresse</th>
            <th className="px-4 py-2">CIN</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                  <span>{row.nom.split(" ")[0].charAt(0)}{row.nom.split(" ")[1].charAt(0)}</span>
                </div>
                <span className="ml-2 font-semibold text-gray-700">{row.nom}</span>
              </td>
              <td className="px-4 py-2 text-gray-700">{row.contact}</td>
              <td className="px-4 py-2 text-gray-700">{row.adresse}</td>
              <td className="px-4 py-2 text-gray-700">{row.cin}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  className="text-gray-600 hover:text-blue-700 text-sm"
                  // Logic for edit action here
                >
                  <PencilIcon className="w-6 h-6" />
                </button>
                <button
                  className="text-gray-600 hover:text-red-700"
                  // Logic for delete action here
                >
                  <TrashIcon className="w-6 h-6" />
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
          className={`px-4 py-2 ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableClient;
