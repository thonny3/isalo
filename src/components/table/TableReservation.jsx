import React, { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useReservation } from "../../context/ReservationContext";
import Select from "react-select";

export default function TableReservation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const itemsPerPage = 5;

  const { setOpenModalDelete, setInfo, listEmploye } = useAdmin();
  const { listRes, rooms, setOpen } = useReservation();

  // Filtrage des réservations par chambre
  const [filteredReservations, setFilteredReservations] = useState(listRes);

  useEffect(() => {
    // Met à jour la liste filtrée lors d'un changement dans `listRes`
    setFilteredReservations(listRes);
  }, [listRes]);

  const handleFilterChange = (selectedOption) => {
    if (!selectedOption) {
      setFilteredReservations(listRes); // Si aucun filtre, afficher toutes les réservations
    } else {
      setFilteredReservations(
        listRes.filter((res) => res.Chambre_id === parseInt(selectedOption.value))
      );
    }
  };

  // Options pour react-select
  const roomOptions = rooms.map((room) => ({
    value: room.id,
    label: `Chambre ${room.numero_chambre}`,
  }));

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const pagesPerGroup = 3; // Nombre de pages affichées par groupe

  // Obtenir les données actuelles en fonction de la page
  const currentData = filteredReservations.slice(
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

  // Fonction pour rendre les numéros de page avec des ellipses
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
      <div className="flex justify-between items-center">
        {/* Sélecteur avec recherche */}
        <div className="filter">
          <label htmlFor="roomNumber">Filtrer par chambre</label>
          <Select
            id="roomNumber"
            options={roomOptions}
            onChange={handleFilterChange}
            placeholder="Choisir une chambre"
            isClearable
            className="mt-2 w-72"
          />
        </div>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          Chambre disponible
        </button>
      </div>
      <div className="mt-5">
        <table className="text-left w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 border">Nom client</th>
              <th className="px-4 py-2 border">Numéro chambre</th>
              <th className="px-4 py-2 border">Date de début</th>
              <th className="px-4 py-2 border">Date de fin</th>
              <th className="px-4 py-2 border">Statut</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="text-gray-700 py-3 hover:bg-gray-200">
                <td className="px-4 py-2 flex items-center">
                  <span className="ml-2 font-semibold">{row.Chambre_id}</span>
                </td>
                <td className="px-4 py-2">{row.Client_id}</td>
                <td className="px-4 py-2 text-gray-700">{row.date_arrive}</td>
                <td className="px-4 py-2 text-gray-700">{row.date_depart}</td>
                <td className="px-4 py-2 text-gray-700">
                  {row.is_avance_paid === 1 ? (
                    <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                      En attente
                    </span>
                  ) : (
                    <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                      Confirmé
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  {row.is_avance_paid === 1 ? (
                    <button className="text-xs font-medium me-2 px-3 py-1 rounded-md bg-green-500 text-white w-20 hover:bg-green-800">
                      Confirmer
                    </button>
                  ) : (
                    <button className="text-xs font-medium me-2 px-3 py-1 rounded-md bg-blue-500 text-white w-20 hover:bg-blue-800">
                      Payé
                    </button>
                  )}
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
  );
}
