// express
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


const eventsRouter = require("./routers/events_rou");

// const dashboardController = require("./controllers/dashboard");
// const postsRouter = require("./routers/posts");
// const authRouter = require("./routers/auth");
// const NotFoundMiddleware = require("./middlewares/NotFound");


// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.use("/events", eventsRouter);
// app.set("view engine", "ejs");
// app.get("/", dashboardController.index);
// app.use("/", authRouter)
// app.use("/posts", postsRouter);
// app.use(NotFoundMiddleware)






app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });

  // `${req.protocol}://${req.hostname}:${process.env.PORT}/`