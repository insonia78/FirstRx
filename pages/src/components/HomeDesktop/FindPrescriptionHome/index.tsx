import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import PrescriptionDetailedForm  from '../../component/PrescriptionDetailedForm';
import { useRouter } from 'next/router'

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
    const [prescriptionDetails, setPrescriptionDetails] = useState([]);
    const router = useRouter();
    const [getPrescriptions] = useMutation(GET_PRESCRIPTIONS, {
         onError(err) {
              console.log(err);
        
            },
            update(proxy, result) {
            if (result.data.prescription.length === 1) {
                setPrescriptionDetails(result.data.prescription);
                console.log('result', result.data.prescription);
                return;
                }
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
        //src/components/HomeDesktop
    
        }

    return(
        <div>            
             <span className="desktop-main-left-find-prescription-home-title" >Step 1: Your Prescription</span>
             <input  placeholder="Type Drug Name" className="desktop-main-left-find-prescription-home-input" type="text" list="prescriptions" onChange={searchPrescription} id="usr" />
             <datalist className= "desktop-main-left-find-prescription-home-datalist" id="prescriptions">
               {prescriptions}
              </datalist>
              {prescriptionDetails.length === 1 &&
              <>
                <PrescriptionDetailedForm data ={prescriptionDetails} />
                <button className="next-button" onClick={() => router.push
                (
                  {
                    pathname:'/src/components/HomeDesktop',
                    query:{component:'location'},
                  })    
                 }>Next: Step2 {'>>'}</button>
              </>
                }
        </div>

    );

}

export default FindPrescriptionHome;

