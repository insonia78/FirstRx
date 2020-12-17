import { ApolloProvider } from "@apollo/client";
import { useApollo } from "pages/src/apolloClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Header from './src/components/HeaderDesktop';
import Footer from './src/components/Footer';
import _Head from './src/components/_Head';
import '../styles/desktop.css';
import HeaderDesktop from "./src/components/HeaderDesktop";


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
