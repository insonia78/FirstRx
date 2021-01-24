const { gql } = require('apollo-server-express');

module.exports = gql(`

        type AddressComponentsFromGeolocationForZip{
            long_name:String
            short_name:String
            types:[String]
        }
        type PredictionsFromPlaceApi{
             description:String 
        } 
        type GetLocationFromZipOrCityQuery{
             results:[AddressComponentsFromGeolocationForZip]
             predictions:[PredictionsFromPlaceApi] 
             code:Int
             message:String
             country: String
             state: String
             city: String
        }
        type Query{
            
            GetLocationFromZipOrCity(value:String):GetLocationFromZipOrCityQuery

        } 
        type Mutation{
            hello:String
        } 
        schema{
            query:Query
            mutation:Mutation
        }

`);