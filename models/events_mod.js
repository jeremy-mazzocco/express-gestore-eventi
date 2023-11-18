const fs = require('fs');
const path = require('path');
const Exception = require("../exceptions/Exception");
const file = '../db/events.json';


class Event {

    #id;
    #title;
    #description;
    #date;
    #maxSeats;
    
    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }


    static getAllEvents() {

        const events = Event.readfile(file);

        return events;
    }


    static getEventById(id) {

        const events = Event.readfile(file);

        const event = events.find((event) => event.id == id);

        return event;
    }


    static saveEvent(event) {

        const events = Event.readfile(file);

        const filePath = path.join(__dirname, file);

        events.push(event);

        fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
    }


    static updateEvent(body, id) {
        
        const events = Event.readfile(file);

        const filePath = path.join(__dirname, file);

        const eventIndex = events.findIndex((event) => event.id == id);

        events[eventIndex] = {
            ...events[eventIndex],
            ...body,
        };

        const updatedEvents = events[eventIndex];

        fs.writeFileSync(filePath, JSON.stringify(events, null, 2));

        return updatedEvents;
    }




    // other methods
    static readfile(file) {
        const filePath = path.join(__dirname, file);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const events = JSON.parse(rawData);

        return events;
    }
}

module.exports = Event;
