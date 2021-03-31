const { gql } = require('apollo-server-express');

module.exports = gql(`
       type PharmacyText{
           _text:String
       }         
       
        type GetPharmacy{
            name:PharmacyText
            streetAddress:PharmacyText
            city:PharmacyText
            state:PharmacyText
            zipCode:PharmacyText
            latitude:PharmacyText
            longitude:PharmacyText
            hoursOfOperation:PharmacyText
            phone:PharmacyText
            npi:PharmacyText
            chainCode:PharmacyText
            distance:PharmacyText


        }
        type GetDrug{
             ndcCode:PharmacyText
             brandGenericIndicator:PharmacyText
             gsn:PharmacyText
             drugRanking:PharmacyText
             quantity:PharmacyText
             quantityRanking:PharmacyText
        }
        type GetPricing{
            price:PharmacyText
            priceBasis:PharmacyText
            usualAndCustomaryPrice:PharmacyText
            macPrice:PharmacyText
            awpPrice:PharmacyText
        }
        
        type GetCouponStructure{
            pharmacy:GetPharmacy
            drug:GetDrug
            pricing:GetPricing
        }
        type GetCouponDetails{
            code:Int
            message:String
            coupons:[GetCouponStructure]
            error:String
        }
        type Query{            
            hello:String
        } 
        type Mutation{            
            coupon(prescription:String,latitude:String,longitude:String):GetCouponDetails
        } 
        schema{
            query:Query
            mutation:Mutation
        }

`);
