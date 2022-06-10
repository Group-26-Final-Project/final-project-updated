const express = require('express')
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }))

const authRouter = require('./controllers/authController');
const blacklistRouter = require('./controllers/blacklistController');
const candidateRouter = require('./controllers/candidateController');
const electionRouter = require('./controllers/electionController');
const ideaRouter = require('./controllers/ideaController');
const pendingRouter = require('./controllers/pendingController');
const resultRouter = require('./controllers/resultController');
const userRouter = require('./controllers/userController');
const voterRouter = require('./controllers/voterController');
// const verifyRouter = require('./controllers/verificationController');

// app.use('/auth', authRouter)
app.use('/login', authRouter)
app.use('/blacklist', blacklistRouter)
app.use('/candidates', candidateRouter)
app.use('/elections', electionRouter)
app.use('/ideas', ideaRouter)
app.use('/pending', pendingRouter)
app.use('/results', resultRouter)
app.use('/user', userRouter)
app.use('/voters', voterRouter)
// app.use('/verify', verifyRouter)

module.exports = app;