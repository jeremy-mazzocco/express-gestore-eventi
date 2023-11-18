// express
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const eventsRouter = require("./routers/events_rou");
const errorsHandlerMiddleware = require("./middlewares/errorsHandler");
const NotFoundMiddleware = require("./middlewares/NotFound");


app.use(express.urlencoded({ extended: true }));

app.use("/events", eventsRouter);

app.use(errorsHandlerMiddleware)

app.use(NotFoundMiddleware)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });

  // `${req.protocol}://${req.hostname}:${process.env.PORT}/`