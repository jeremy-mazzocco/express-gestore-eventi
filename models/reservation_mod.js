const fs = require('fs');
const path = require('path');
const Exception = require('../exceptions/Exception');
const file = '../db/reservations.json';


class Reservation {
    #id;
    #firstName;
    #lastName;
    #email;
    #eventId;

    constructor(id, firstName, lastName, email, eventId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = eventId;
    }

    static getAllReservations() {

        const reservations = Reservation.readFile(file);

        return reservations;
    }

    static getReservationsByEventId(eventId) {

        const reservations = Reservation.getAllReservations();
        const result = reservations.filter((reservation) => reservation.eventId == eventId);

        return result;
    }

    static saveReservation(objReservation) {

        const reservations = Reservation.getAllReservations();
        const filePath = path.join(__dirname, file);

        reservations.push(objReservation);

        fs.writeFileSync(filePath, JSON.stringify(reservations, null, 2));
    }

    static deleteReservation(reservationId) {

        const reservations = Reservation.getAllReservations();
        const filePath = path.join(__dirname, file);

        const doesReservationExist = Reservation.getAllReservations().find(reservation => reservation.id == reservationId);

        if (!doesReservationExist) {
            throw new Exception("Reservation not found", 404)
        }

        const updatedReservations = reservations.filter(reservation => reservation.id !== reservationId);
        
        fs.writeFileSync(filePath, JSON.stringify(updatedReservations, null, 2));
    }


    /**
     * function read db and return events in an object
     * @param {string} file
     * @returns {array} events
     */
    static readFile(file) {
        const fullPath = path.join(__dirname, file);
        const rawData = fs.readFileSync(fullPath, 'utf-8');
        const reservations = JSON.parse(rawData);

        return reservations;
    }
}

module.exports = Reservation;
