const { gql } = require('apollo-server-express');

module.exports = gql(`
        
        
        type GetCouponDetails{
            code:Int
            message:String
            prescriptions:[String]
            error:String
        }
        type Query{            
            hello:String
        } 
        type Mutation{            
            coupon(prescription:String,latitude:String,longitude:String):GetPrescriptionDetails
        } 
        schema{
            query:Query
            mutation:Mutation
        }

`);
