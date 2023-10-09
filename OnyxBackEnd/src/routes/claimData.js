const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { token, did, timestamp, signature } = req.body;
        const data = {
            token: token,
            did: did,
            timestamp: timestamp,
            signature: signature
        };
        fs.writeFileSync(path.join(__dirname,'./../data/claimdata.json'), JSON.stringify(data, null, 2));

        const tokenJWT = fs.readFileSync(path.join(__dirname, './../verifiable_credentials/proofOfBol.jwt'), 'utf8');

        const jwtData = {
            jwt: tokenJWT
        };

        fs.writeFileSync(path.join(__dirname,'./../data/jwtData.json'), JSON.stringify(jwtData, null, 2));

        const configPath = path.join(__dirname, './../scripts/Verify/present-config.json');
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        configData.vcs = [jwtData.jwt];
        fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
        
        res.json({ jwt: tokenJWT });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });

    }
});


module.exports = router;
