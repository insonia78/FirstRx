import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,

} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;
class HelperValue {
    value:string;
   constructor(){
      
   }
   public getValue(){
       return this.value;
   }
   public setValue(v){
       this.value = v;
   }

}

const baseUri = new HttpLink({
    uri: "/api/graphql"
})
const locationUri = new HttpLink({
    uri: "http://localhost:5000/graphql"
})
const prescriptionsUri = new HttpLink({
    uri: "http://locahost:4000/graphql"
})
const couponUri = new HttpLink({
    uri: "http://locahost:4000/graphql"
})

let helperValue= new HelperValue();;
function createIsomorphicLink() {
    if (typeof window === "undefined") {
        // server
        const { SchemaLink } = require("@apollo/client/link/schema");
        const { schema } = require("./schema");
        return new SchemaLink({ schema });
    } else {
        // client
        const { HttpLink } = require("@apollo/client/link/http");
    }
    //return new HttpLink({ uri: "/api/graphql" });
    return undefined;
}
function Check(operation){
    return operation.getContext().clientName === 'coupon'? couponUri:baseUri;
}

function createApolloClient() {

    return new ApolloClient({
        
        ssrMode: typeof window === undefined,
        link: (createIsomorphicLink() === undefined ?
        
        ApolloLink.split(
               
            operation => operation.getContext().clientName === 'prescriptions',            
              prescriptionsUri,
             ApolloLink.split(operation => operation.getContext().clientName === 'location',                        
                    locationUri,                    
                    ApolloLink.split(operation => operation.getContext().clientName === 'coupon',                        
                    couponUri,
                    baseUri
                    
                    )
            
                 )
            )
        
        :createIsomorphicLink()),
        cache: new InMemoryCache()
    })
    
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    if (typeof window === undefined) return _apolloClient;
    apolloClient = apolloClient ?? _apolloClient;

    return apolloClient;

}
export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);

    return store;

}