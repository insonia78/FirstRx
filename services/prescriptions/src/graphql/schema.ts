const { gql } = require('apollo-server-express');

module.exports = gql(`
        
        type Dosage {
            dosage: String
            quantity: String
            type: String
        }
        type GetPrescriptionDetails{
            search_name:String
            name:String
            generic_name:String
            manufacturer:String
            form:[String]
            dosage:[Dosage]
            quantity:[String]
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
