const express = require('express');
const crimeRouter = require('./routes/crimeRoutes');

const app = express();
const PORT = 3000;
app.use("/api", crimeRouter);

app.listen(PORT, function() {

    console.log(`Server is running on port: ${PORT}`);
});