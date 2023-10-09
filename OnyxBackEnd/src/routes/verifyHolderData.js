const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const configPath = path.join(__dirname, './../verifiable_presentation/proofofbol.jwt');
const storedJWT = fs.readFileSync(configPath, 'utf8');

router.post('/', async (req, res) => {
    try {
        const { presentation } = req.body;

        console.log("Received Verifiable Presentation JWT:", presentation);
        console.log("Comparing with JWT:",storedJWT);

        if (storedJWT === presentation) {
            res.json({ success: true, message: 'JWT verified' });
        }
        else {
            res.json({ success: false, message: 'JWT not verified' });
        }


    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });

    }
});


module.exports = router;
