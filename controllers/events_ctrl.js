const Event = require('../models/events_mod');
const Exception = require("../exceptions/Exception");

/**
 * fuction return all events
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function index(req, res) {

    const events = Event.getAllEvents();

    if (events.finalResult) {
        throw new Exception("Server can't retrive data", 500)
    }

    // filter events by title
    const filters = req.query.title;
    const filteredEvents = filterEvents(events, filters);
    const finalResult = filters ? filteredEvents : events;

    res.json({ finalResult });

}

/**
 * function return event by id
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function show(req, res) {

    const id = req.params.id;
    const event = Event.getEventById(id);

    if (!id) {
        throw new Exception("ID is required", 400);
    }

    if (!event) {
        throw new Exception("Event not found", 404)
    }

    res.json({ event });
}

/**
 * function store new event
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function store(req, res) {

    const events = Event.getAllEvents()

    if (events.finalResult) {
        throw new Exception("Server can't retrive data", 500)
    };

    // get last id
    const idList = events.map((event) => event.id).sort((a, b) => b - a);
    const newId = idList[0] + 1;

    const newEvent = new Event(
        newId,
        req.body.title,
        req.body.description,
        req.body.date,
        req.body.maxSeats
    );

    if (!Event.saveEvent(newEvent)) {
        throw new Exception("Server can't save data", 500)
    }

    res.json({ newEvent });

}

/**
 * function update event by id
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function update(req, res) {

    const id = req.params.id;
    const event = Event.getEventById(id);

    if (!id) {
        throw new Exception("ID is required", 400);
    }

    if (!event) {
        throw new Exception("Event not found", 404)
    }

    const result = Event.updateEvent(req.body, id);

    if (!result) {
        throw new Exception("Server can't save data", 500)
    }

    res.json({ result });
}



// other functions
/**
 * function filter events by title
 * @param {Array} events
 * @param {String} filters
 * @returns {Array} filteredEvents
 */
function filterEvents(events, filters) {
    return events.filter(event => {
        return (
            event.title.toLowerCase().includes(filters.toLowerCase())
        );
    });
}


module.exports = {
    index,
    show,
    store,
    update
}