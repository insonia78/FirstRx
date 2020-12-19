
import { gql } from "@apollo/client";


const GET_PRESCRIPTIONS = gql`
mutation  prescription($prescription:String){
      prescription(prescription:$prescription)
      {
            search_name
            name
            generic_name
            manufacturer
            form
            quantity
            dosage{
              dosage
              quantity
              type

            }
      }
}

`;
export default{
      GET_PRESCRIPTIONS,
};