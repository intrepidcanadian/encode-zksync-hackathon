import { WalletData } from './interfaces';
import path from 'path';
import * as fs from 'fs';
import crypto from 'crypto';

const jsonFilePath = path.join(__dirname, './data/data.json');

let previousHash: string | null = null;

function computeFileHash(content: string): string {
    const hasher = crypto.createHash('md5');
    hasher.update(content);
    return hasher.digest('hex');
}

function getLocationFromFile(filePath: string): WalletData | null {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const currentHash = computeFileHash(jsonData);

        if (previousHash !== currentHash) {
            previousHash = currentHash;
            const data: WalletData = JSON.parse(jsonData);
            return data;
        }

    } catch (error) {
        console.error('Error reading JSON file:', (error as Error).message);
        return null;
    }
    return null;
}

let locationData: WalletData | null = getLocationFromFile(jsonFilePath);

setInterval(() => {
    const newData = getLocationFromFile(jsonFilePath);
    if (newData) {
        locationData = newData;
        console.log('File has changed!');
    }
}, 5000);

export function generateDataPoint(): WalletData | null {
    return locationData;
}
