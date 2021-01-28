
import Head from 'next/head';
//initial-scale=1.0, shrink-to-fit=yes
export default function _Head() {

  return (
    <Head>
      <title>FirstRx</title>
      <meta httpEquiv='cache-control' content='no-cache' />
      <meta httpEquiv='expires' content='0' />
      <meta httpEquiv='pragma' content='no-cache' />
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"></meta>
      <link rel="icon" href="/favicon.ico" />
      <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'></link>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhJjZH6lxSraVwcjLBB9O2DfHF0PFJD5Q&libraries=places"></script>          
    </Head>

  );

}