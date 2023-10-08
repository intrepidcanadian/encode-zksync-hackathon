import express from 'express';
import dotenv from 'dotenv';
import { startPublisherService } from './publisher-service';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import {WalletData, WalletDataPoint} from './interfaces';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3002;
const dataFilePath = './src/data/data.json'

function saveLocationToFile(walletAddress: string, lat: number, lng: number, timestamp: number, filePath: string): void {
  let data: WalletData = {};
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', (error as Error).message);
  }

  data[walletAddress] = { lat, lng, timestamp };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/data-endpoint', (req, res) => {
  const jsonFilePath = path.join(__dirname, './data/data.json');

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).json({ error: 'Failed to read the file' });
    }

    res.json(JSON.parse(data));
  });
});


app.post('/save-data-endpoint', (req, res) => {
  const { walletAddress, lat, lng, timestamp } = req.body;
  if (!walletAddress || !lat || !lng || !timestamp) {
      return res.status(400).json({ message: 'Missing required fields' });
  }
  saveLocationToFile(walletAddress, lat, lng, timestamp, dataFilePath);
  res.json({ message: 'Location data saved successfully' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

startPublisherService();
