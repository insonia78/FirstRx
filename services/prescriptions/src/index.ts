import { app } from './app';
import { natsWrapper } from './nats-wrapper';


const start = async () => { 
    
    try {
        // await natsWrapper.connect(
        //   process.env.NATS_CLUSTER_ID,
        //   process.env.NATS_CLIENT_ID,
        //   process.env.NATS_URL
        // );
        // natsWrapper.client.on('close', () => {
        //   console.log('NATS connection closed!');
        //   process.exit();
        // });               
      } catch (err) {
        console.error(err);
      }

  app.listen(4000, () => {
    console.log('Listening on port 4000!!!!!!!!');
  });
};

start();