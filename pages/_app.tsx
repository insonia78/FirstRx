import { ApolloProvider } from "@apollo/client";
import { useApollo } from "pages/src/apolloClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client = {client}>
         <Component {...pageProps} />
    </ApolloProvider> 
  );
}

export default MyApp
