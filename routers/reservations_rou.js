const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation_ctrl');


router.get('/:event/reservations', ReservationController.index);

router.post('/:event/reservations', ReservationController.store);

router.delete('/:event/reservations/:reservation', ReservationController.destroy);


module.exports = router;
