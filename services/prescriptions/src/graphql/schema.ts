const { gql } = require('apollo-server-express');

module.exports = gql(`
        
        
        type GetPrescriptionDetails{
            code
            message
            prescriptions
        }
        type Query{            
            hello:String
        } 
        type Mutation{            
            prescription(prescription:String):GetPrescriptionDetails
        } 
        schema{
            query:Query
            mutation:Mutation
        }

`);
