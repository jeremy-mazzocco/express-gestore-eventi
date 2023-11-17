const Event = require('../models/events_mod');


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function index(req, res) {
    const events = Event.getAllEvents();

    const filters = req.query.title;

    const filteredEvents = filterEvents(events, filters);

    const finalResult = filters ? filteredEvents : result;

    res.format({
        json: () => {
            res.type("json").send({
                finalResult,
            });
        }
    });

}


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function show(req, res) {
    const id = req.params.id;
    const event = Event.getEventById(id);

    // lancia un errore se l'evento non esiste !

    res.format({
        json: () => {
            res.type("json").send({
                event,
            });
        }
    });
}


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function store(req, res) {
    const events = Event.getAllEvents();

    const idList = events.map((event) => event.id);
    idList.sort((a, b) => b - a);
    const newId = idList[0] + 1;

    const newEvent = new Event(
        newId,
        req.body.title,
        req.body.description,
        req.body.date,
        req.body.maxSeats
    );

    Event.saveEvent(newEvent);

    res.format({
        json: () => {
            res.type("json").send({
                newEvent,
            });
        }
    });


}


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function update(req, res) {

}


// other functions
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