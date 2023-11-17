const fs = require('fs');
const path = require('path');

class Event {
    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    // possibile refactionig!!!!!!!!
    
    static getAllEvents() {
        const filePath = path.join(__dirname, '../db/events.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const events = JSON.parse(rawData);
        return events;
    }

    static getEventById(id) {
        const filePath = path.join(__dirname, '../db/events.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const events = JSON.parse(rawData);
        const event = events.find((event) => event.id == id);
        return event;
    }

    static saveEvent(event) {
        const filePath = path.join(__dirname, '../db/events.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const events = JSON.parse(rawData);

        events.push(event);

        fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
    }
}

module.exports = Event;