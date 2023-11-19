const express = require('express');
const Reservation = require('../models/reservation_mod');


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function index(req, res) {

    const eventId = req.params.event;
    const reservations = Reservation.getReservationsByEventId(eventId);

    if (!eventId) {
        throw new Exception("ID is required", 400);
    }

    if (!reservations) {
        throw new Exception("Reservation not found", 404)
    }

    res.json({ reservations });
}


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function store(req, res) {

    const eventId = parseInt(req.params.event);
    const reservations = Reservation.getAllReservations();

    if (!eventId) {
        throw new Exception("ID is required", 400);
    }

    if (!reservations) {
        throw new Exception("Server can't retrive reservations", 500)
    }

    // get last id
    const idList = reservations.map((reservation) => reservation.id).sort((a, b) => b - a);
    const reservationId = idList[0] + 1;

    const reservation = new Reservation(
        reservationId,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        eventId
    );

    Reservation.saveReservation(reservation);

    res.json({ reservation });
}


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function destroy(req, res) {
    const reservationId = req.params.reservation;

    // Controlla se la prenotazione esiste
    const existingReservation = Reservation.getAllReservations().find(reservation => reservation.id == reservationId);
    if (!existingReservation) {
        return res.status(404).json({ error: 'Prenotazione non trovata' });
    }

    Reservation.deleteReservation(reservationId);

    res.json({ message: 'Prenotazione cancellata con successo' });

}

module.exports = {
    index,
    store,
    destroy
};
