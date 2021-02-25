import { app } from './app';
import { natsWrapper } from './nats-wrapper';
const json_p  = require('/coupon/package.json');

const start = async () => { 
  
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
    try {
      await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL
      );
      natsWrapper.client.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
      });
      process.on('SIGINT', () => natsWrapper.client.close());
      process.on('SIGTERM', () => natsWrapper.client.close());    
        
      } catch (err) {
        console.error(err);
      }

  app.listen(6000, () => {
    console.log(json_p.name,'Listening on port 6000!!!!!!!!');
  });
};

start();