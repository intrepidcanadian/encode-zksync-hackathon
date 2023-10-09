const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const PORT = 3001;
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());

const postvcDataRoute = require('./src/routes/postvcData');
const getvcDataRoute = require('./src/routes/getvcData');
const signvcDataRoute = require('./src/routes/signvcData');

const createVPDataRoute = require('./src/routes/createVPData');
const signVPDataRoute = require('./src/routes/signVPData');
const claimRoute = require('./src/routes/claimData');
const verifyHolderRoute = require('./src/routes/verifyHolderData');

app.use('/post-data', postvcDataRoute);
app.use('/get-data', getvcDataRoute);
app.use('/sign-vcdata', signvcDataRoute);
app.use('/create-vpdata', createVPDataRoute);
app.use('/sign-vpdata', signVPDataRoute);
app.use('/public/issue', claimRoute);
app.use('/verify', verifyHolderRoute);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});