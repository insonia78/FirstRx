const { gql } = require('apollo-server-express');

module.exports = gql(`       
        
        type GetLocationFromZipQuery{
             code:Int
             message:String
             country: String
             state: String
             city: String
        }
        type Query{
            
            GetLocationFromZip(zip:String):GetLocationFromZipQuery

        } 
        type Mutation{
            hello:String
        } 
        schema{
            query:Query
            mutation:Mutation
        }

`);