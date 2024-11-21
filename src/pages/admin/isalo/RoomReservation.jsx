import React, { useState } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "../../../components/modal/Modal";

const RoomReservation = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    roomNumber: "",
    startDate: "",
    endDate: "",
    paymentStatus: "none",
    advanceAmount: "",
  });

  const rooms = [101, 102, 103, 104, 105]; // Liste des chambres disponibles.

  // Vérifier si une chambre est occupée
  const isRoomOccupied = (roomNumber, start, end) => {
    return events.some(
      (event) =>
        event.roomNumber === roomNumber &&
        event.isPaid &&
        ((start >= event.start && start < event.end) || // Chevauchement début
          (end > event.start && end <= event.end) || // Chevauchement fin
          (start <= event.start && end >= event.end)) // Inclusion complète
    );
  };

  // Ajouter une réservation
  const handleAddReservation = () => {
    const { clientName, roomNumber, startDate, endDate, paymentStatus } =
      formData;

    if (!clientName || !roomNumber || !startDate || !endDate || !paymentStatus) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isRoomOccupied(roomNumber, start, end)) {
      alert("Cette chambre est déjà occupée pour cette période !");
      return;
    }

    const isPaid = paymentStatus === "paid";

    setEvents([
      ...events,
      {
        start,
        end,
        clientName,
        roomNumber,
        isPaid,
        paymentStatus,
        advanceAmount: paymentStatus === "advance" ? formData.advanceAmount : 0,
        totalAmount: 300, // Exemple d'un montant fixe
      },
    ]);

    setModalOpen(false); // Fermer le modal après l'ajout
    setFormData({
      clientName: "",
      roomNumber: "",
      startDate: "",
      endDate: "",
      paymentStatus: "none",
      advanceAmount: "",
    });
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePaymentStatusChange = (status) => {
    setFormData({
      ...formData,
      paymentStatus: status,
      advanceAmount: status === "advance" ? formData.advanceAmount : "", // Réinitialiser le montant de l'avance si ce n'est pas "Avance"
    });
  };

  return (
    <>
      <div className="reservation-container">
        <header className="header flex justify-between items-center">
          <h1>Réservations de Chambres</h1>
          <button
            className="add-reservation-button bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setModalOpen(true)}
          >
            Ajouter une réservation
          </button>
        </header>

        <div className="reservation-list">
          <h3>Liste des Réservations</h3>
          <table className="text-left w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border">Nom client</th>
                <th className="px-4 py-2 border">Numéro chambre</th>
                <th className="px-4 py-2 border">Date de début</th>
                <th className="px-4 py-2 border">Date de fin</th>
                <th className="px-4 py-2 border">Statut</th>
                <th className="px-4 py-2 border">Montant</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="text-gray-700 hover:bg-gray-200">
                  <td className="px-4 py-2 border">{event.clientName}</td>
                  <td className="px-4 py-2 border">{event.roomNumber}</td>
                  <td className="px-4 py-2 border">
                    {moment(event.start).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-4 py-2 border">
                    {moment(event.end).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-4 py-2 border">
  <span
    className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full
      ${event.isPaid
        ? "bg-green-100 text-green-800" // Payé: vert
        : event.paymentStatus === "advance"
        ? "bg-yellow-100 text-yellow-800" // Avance: jaune
        : "bg-red-100 text-red-800"}` // Non payé: rouge
    }
  >
    {event.isPaid
      ? "Payé"
      : event.paymentStatus === "advance"
      ? "Avance"
      : "Non payé"}
  </span>
</td>

                  <td className="px-4 py-2 border">
                    {event.paymentStatus === "advance"
                      ? `${event.advanceAmount} €`
                      : event.isPaid
                      ? "300 €"
                      : "Non payé"}
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
            <div>
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
                <label>Statut de Paiement</label>
                <div className="flex gap-4 mt-2">
                  <label>
                    <input
                      type="radio"
                      name="paymentStatus"
                      checked={formData.paymentStatus === "paid"}
                      onChange={() => handlePaymentStatusChange("paid")}
                    />{" "}
                    Payé
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentStatus"
                      checked={formData.paymentStatus === "advance"}
                      onChange={() => handlePaymentStatusChange("advance")}
                    />{" "}
                    Avance
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentStatus"
                      checked={formData.paymentStatus === "none"}
                      onChange={() => handlePaymentStatusChange("none")}
                    />{" "}
                    Non payé
                  </label>
                </div>
              </div>
            </div>
            <div>
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
          <div className="mt-4 text-right">
            <button
              type="button"
              className="btn-primary text-white px-6 py-2 rounded-md"
              onClick={handleAddReservation}
            >
              Ajouter la Réservation
            </button>
          </div>
        </form>
      </Modal>
      
    </>
  );
};

export default RoomReservation;
