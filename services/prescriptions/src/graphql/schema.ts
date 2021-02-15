const { gql } = require('apollo-server-express');

module.exports = gql(`
        
        type GetPrescriptionDetails{
            search_name
            name
            generic_name
            manufacturer
            form
            quantity
        }
        type Query{            
            hello:String
        } 
        type Mutation{            
            prescription(value:String):GetPrescriptionDetails
        } 
        schema{
            query:Query
            mutation:Mutation
        }

`);