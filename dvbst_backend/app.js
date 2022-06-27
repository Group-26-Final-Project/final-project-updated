const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const authRouter = require("./controllers/authController");
const blacklistRouter = require("./controllers/blacklistController");
const candidateRouter = require("./controllers/candidateController");
const electionRouter = require("./controllers/electionController");
const eligibileRouter = require("./controllers/eligibileController");
const ideaRouter = require("./controllers/ideaController");
const pendingRouter = require("./controllers/pendingController");
const resetRouter = require("./controllers/resetController");
const resultRouter = require("./controllers/resultController");
const userRouter = require("./controllers/userController");
const voterRouter = require("./controllers/voterController");
const phaseRoute = require("./controllers/phaseController");
const verifyRouter = require("./controllers/verificationController");
const balanceRouter = require("./controllers/balanceController");
const requestRouter = require("./controllers/requestController");
const reportsRouter = require("./controllers/reportsController");
const electionPhaseRouter = require("./controllers/electionPhaseController");

// app.use('/auth', authRouter)
app.use("/login", authRouter);
app.use("/blacklist", blacklistRouter);
app.use("/candidates", candidateRouter);
app.use("/elections", electionRouter);
app.use("/eligible", eligibileRouter);
app.use("/ideas", ideaRouter);
app.use("/pending", pendingRouter);
app.use("/reset", resetRouter);
app.use("/results", resultRouter);
app.use("/user", userRouter);
app.use("/voters", voterRouter);
app.use("/phase", phaseRoute);
app.use("/verify", verifyRouter);
app.use("/balance", balanceRouter);
app.use("/requests", requestRouter);
app.use("/reports", reportsRouter);
app.use("/electionPhase", electionPhaseRouter)

module.exports = app;
