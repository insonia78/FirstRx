const { gql } = require('apollo-server-express');

module.exports = gql(`
        
        type GetLocationPrescriptionsMutation{
             results:[ResultsFromGeoLocationApi]
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
            GetLocationPrescriptions(value:String):GetLocationPrescriptionsMutation
        } 
        schema{
            query:Query
            mutation:Mutation
        }

`);