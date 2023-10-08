import StreamrClient from 'streamr-client';
import { generateDataPoint } from './helper';
import { LOCATION_STREAM_ID } from './config';

export const startPublisherService = () => {
  const streamr: StreamrClient = new StreamrClient({
    auth: {
      privateKey: process.env.PRIVATE_KEY || '',
    },
  });

  setInterval(async () => {
    const dataPoint = generateDataPoint();
    await streamr.publish(LOCATION_STREAM_ID, dataPoint);
    console.log('published:', dataPoint);
  }, 5000);
};
