import { ApolloProvider } from "@apollo/client";
import { useApollo } from "pages/src/apolloClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import Header from './src/components/HeaderDesktop';
import Footer from './src/components/Footer';
import _Head from './src/components/_Head';
import HeaderDesktop from "./src/components/HeaderDesktop";
import '../styles/desktop.scss';
import '../styles/main-desktop-left.scss';
import '../styles/main-desktop-left-prescription-detailed-form.scss';
import '../styles/main-desktop-location.scss';
import '../styles/main-choose-home-coupon.scss';
import '../styles/main-desktop-coupon-component.scss';
import '../styles/main-desktop-coupons-tiles.scss';

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return (
     
     <ApolloProvider client = {client}> 
         <_Head />     
         < HeaderDesktop/>     
         <Component {...pageProps} />
         {/* <Footer /> */}      
     </ApolloProvider> 
  );
}

export default MyApp
