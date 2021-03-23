const { gql } = require('apollo-server-express');

module.exports = gql(`
        
        
        type GetPrescriptionDetails{
            code:Int
            message:String
            prescriptions:[String]
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
