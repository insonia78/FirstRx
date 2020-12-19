import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";


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
const FindPrescriptionHome = () =>{

    const [prescriptions, setPrescriptions] = useState([]);
    const [getPrescriptions] = useMutation(GET_PRESCRIPTIONS, {
         onError(err) {
              console.log(err);
        
            },
            update(proxy, result) {
              let options = [];
              result.data.prescription.forEach((element)=>{
                      options.push(<option value={element.search_name} />); 
        
              })
              console.log(options);
              setPrescriptions(options);
            }
          });
    const searchPrescription = (e) => {
    
        console.log(e.target.value);
        getPrescriptions({variables: {prescription: e.target.value }}); 
    
    
        }

    return(
        <div>
             <input type="text" list="prescriptions" className="form-control mt-3 mb-4" onChange={searchPrescription} id="usr" />
             <datalist id="prescriptions">
               {prescriptions}
              </datalist>



        </div>

    );

}

export default FindPrescriptionHome;

