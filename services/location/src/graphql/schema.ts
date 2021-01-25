const { gql } = require('apollo-server-express');

module.exports = gql(`

       
        type PredictionsFromPlaceApi{
             description:String 
        } 
        type GetLocationFromZipOrCityMutation{
             
             predictions:[PredictionsFromPlaceApi] 
             code:Int
             message:String
             country: String
             state: String
             city: String
        }
        type Query{
            
            hello:String

        } 
        type Mutation{
            
            GetLocationFromZipOrCity(value:String):GetLocationFromZipOrCityMutation
        } 
        schema{
            query:Query
            mutation:Mutation
        }

`);