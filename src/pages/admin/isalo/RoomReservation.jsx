import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CheckCircle, XCircle } from "lucide-react";
import Modal from "../../../components/modal/Modal";

const localizer = momentLocalizer(moment);

const RoomReservation = () => {
  
  const [events, setEvents] = useState([]);
  const [clientColors, setClientColors] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    roomNumber: "",
    startDate: "",
    endDate: "",
    paymentStatus: "",
    advanceAmount: "",
  });

  const rooms = [101, 102, 103, 104, 105]; // Liste des chambres disponibles.

  // Générer une couleur aléatoire pour chaque client
  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  // Vérifier si une chambre est occupée pour la période donnée
  const isRoomOccupied = (roomNumber, start, end) => {
    return events.some(
      (event) =>
        event.roomNumber === roomNumber &&
        event.isPaid && // Seul l'événement payé bloque la chambre
        ((start >= event.start && start < event.end) || // Chevauchement du début
          (end > event.start && end <= event.end) || // Chevauchement de la fin
          (start <= event.start && end >= event.end)) // Inclusion complète
    );
  };

  // Ajouter une réservation
  const handleAddReservation = () => {
    const { clientName, roomNumber, startDate, endDate, paymentStatus } = formData;

    if (!clientName || !roomNumber || !startDate || !endDate || !paymentStatus) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    if (!rooms.includes(parseInt(roomNumber))) {
      alert("Numéro de chambre invalide !");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isRoomOccupied(roomNumber, start, end)) {
      alert("Cette chambre est déjà occupée pour cette période !");
      return;
    }

    const isPaid = paymentStatus === "paid";

    if (!clientColors[clientName]) {
      setClientColors({
        ...clientColors,
        [clientName]: generateRandomColor(),
      });
    }

    setEvents([
      ...events,
      {
        start,
        end,
        clientName,
        roomNumber,
        isPaid,
      },
    ]);

    setModalOpen(false); // Fermer le modal après l'ajout
    setFormData({
      clientName: "",
      roomNumber: "",
      startDate: "",
      endDate: "",
      paymentStatus: "",
      advanceAmount: "",
    });
  };

  // Gérer les styles des événements
  const eventStyleGetter = (event) => {
    const color = event.isPaid
      ? "#4CAF50" // Vert pour payé
      : event.paymentStatus === "advance"
      ? "#FF9800" // Orange pour avance
      : "#F44336"; // Rouge pour non payé

    return {
      style: {
        backgroundColor: color,
        color: "white",
        borderBottom: `1px solid ${color}`,
      },
    };
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Filtrer les événements par chambre sélectionnée
  const filteredEvents = selectedRoom
    ? events.filter((event) => event.roomNumber === selectedRoom.toString())
    : events;

    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 5;
  
    // Calculer les indices de début et de fin des chambres à afficher sur la page actuelle
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  
    // Calculer le nombre total de pages
    const totalPages = Math.ceil(rooms.length / roomsPerPage);
  
    // Fonction pour changer de page
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
  return (
    <>
      <div className="reservation-container">
        <header className="header flex justify-between items-center">
          <h1>Réservations de Chambres</h1>
          <button
            className="add-reservation-button"
            onClick={() => setModalOpen(true)}
          >
            Ajouter une réservation
          </button>
        </header>

        {!modalOpen && (
  <>
    <div className="room-list">
      
      <div className="flex flex-wrap gap-4 mt-2">
        <button
          className={`px-6 py-2 rounded-lg ${
            selectedRoom === null
              ? "btn-primary text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition duration-300 ease-in-out`}
          onClick={() => setSelectedRoom(null)}
        >
          Toutes les chambres
        </button>
        {rooms.map((room) => (
          <button
            key={room}
            className={`px-6 py-2 rounded-lg border border-gray-300 ${
              selectedRoom === room
                ? "bg-primary text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition duration-300 ease-in-out`}
            onClick={() => setSelectedRoom(room)}
          >
            {room}
          </button>
        ))}
      </div>
    </div>

    <div className="calendar mt-5">
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={['month']}    // Active uniquement la vue "Month"
        toolbar={false} 
        selectable
        eventPropGetter={eventStyleGetter}
        style={{ height: "400px", opacity: 1 }}
      />
    </div>
  </>
)}



<div className="reservation-list">
  <h3>Liste des Réservations</h3>
  <table className="text-left w-full">
    <thead>
      <tr className="bg-gray-100 text-gray-700">
        <th className="px-4 py-2">Nom client</th>
        <th className="px-4 py-2">Numéro chambre</th>
        <th className="px-4 py-2">Date de début</th>
        <th className="px-4 py-2">Date de fin</th>
        <th className="px-4 py-2">Statut</th>
        <th className="px-4 py-2">Montant</th>
        <th className="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredEvents.map((event, index) => (
        <tr key={index} className="text-gray-700 py-3 hover:bg-gray-200">
          <td className="px-4 py-2">{event.clientName}</td>
          <td className="px-4 py-2">{event.roomNumber}</td>
          <td className="px-4 py-2">
            {moment(event.start).format("DD/MM/YYYY")}
          </td>
          <td className="px-4 py-2">
            {moment(event.end).format("DD/MM/YYYY")}
          </td>
          <td className="px-4 py-2">
            {event.isPaid
              ? "Payé"
              : event.paymentStatus === "advance"
              ? "Avance"
              : "Non payé"}
          </td>
          <td className="px-4 py-2">
            {event.paymentStatus === "advance"
              ? `${event.advanceAmount} €`
              : event.isPaid
              ? `${event.totalAmount} €`
              : "Non payé"}
          </td>
          <td className="px-4 py-2">
            {event.isPaid ? (
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                disabled
              >
                Payé
              </button>
            ) : event.paymentStatus === "advance" ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleAction(event, "Accepter")}
              >
                Accepter
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleAction(event, "Annuler")}
              >
                Annuler
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h1 className="text-2xl text-gray-700">Ajouter une Réservation</h1>
        <form className="mt-5">
          <div className="grid grid-cols-2 space-x-8">
            <div className="form1">
              <div className="form-group mt-2">
                <label htmlFor="clientName">Nom du Client</label>
                <input
                  type="text"
                  id="clientName"
                  className="form-control w-full"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Nom du client"
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="roomNumber">Numéro de Chambre</label>
                <select
                  id="roomNumber"
                  className="form-control w-full"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                >
                  <option value="">Choisir une chambre</option>
                  {rooms.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mt-2">
                <label htmlFor="paymentStatus">Statut de Paiement</label>
                <select
                  id="paymentStatus"
                  className="form-control w-full"
                  value={formData.paymentStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner le statut</option>
                  <option value="paid">Payé</option>
                  <option value="unpaid">Non Payé</option>
                  <option value="advance">Avance</option>
                </select>
              </div>
            </div>
            <div className="form2">
              <div className="form-group mt-2">
                <label htmlFor="startDate">Date de Début</label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control w-full"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="endDate">Date de Fin</label>
                <input
                  type="date"
                  id="endDate"
                  className="form-control w-full"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
              {formData.paymentStatus === "advance" && (
                <div className="form-group mt-2">
                  <label htmlFor="advanceAmount">Montant de l'Avance</label>
                  <input
                    type="number"
                    id="advanceAmount"
                    className="form-control w-full"
                    value={formData.advanceAmount}
                    onChange={handleInputChange}
                    placeholder="Montant de l'avance"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white px-6 py-2 rounded"
              onClick={() => setModalOpen(false)}
            >
              Annuler
            </button>
            <button
              type="button"
              className="bg-primary text-white px-6 py-2 rounded ml-3"
              onClick={handleAddReservation}
            >
              Accepter
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default RoomReservation;
