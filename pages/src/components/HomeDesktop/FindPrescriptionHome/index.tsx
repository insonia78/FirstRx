import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import PrescriptionDetailedForm from '../../component/PrescriptionDetailedForm';
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
const FindPrescriptionHome = (props) => {


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
        let data = {
          search_name: result.data.prescription[0].search_name,
          name: result.data.prescription[0].name,
          generic_name: result.data.prescription[0].generic_name,
          manufacturer: result.data.prescription[0].manufacturer,
          form: result.data.prescription[0].form[0],
          quantity: result.data.prescription[0].quantity[0],
          dosage: result.data.prescription[0].dosage[0],
        }
        props.setPrescriptionDetails(data);        
        return;
      }
      let options = [];

      result.data.prescription.forEach((element) => {
        options.push(<option value={element.search_name} />);

      })
      console.log(options);
      setPrescriptions(options);
    }
  });
  const searchPrescription = (e) => {

    console.log(e.target.value);
    getPrescriptions({ variables: { prescription: e.target.value } });
    //src/components/HomeDesktop

  }
  const clearInput = (e) => {


    let listBox = document.getElementById("prescription").value = "";
    document.getElementById("prescription").lenght = 0;
    // listBox[0].value= "";
    // listBox[0].options.length = 0;
  }

  const setPrescriptionsData = () => {
    document.getElementById("prescription").value = props.getSetPrescriptionDetails.search_name;
    getPrescriptions({ variables: { prescription: props.getSetPrescriptionDetails.prescriptions.search_name } });
  }

  return (
    <div>

      <span className="desktop-main-left-find-prescription-home-title" >Step 1: Your Prescription</span>
      <input onFocus={clearInput} placeholder="Type Drug Name" className="desktop-main-left-find-prescription-home-input" type="text" list="prescriptions" onChange={searchPrescription} id="prescription" />
      <datalist className="desktop-main-left-find-prescription-home-datalist" id="prescriptions">
        {prescriptions}
      </datalist>
      {prescriptionDetails.length === 1 &&
        <>
          <PrescriptionDetailedForm data={prescriptionDetails} getPrescriptionDetails={props.getPrescriptionDetails} getSetPrescriptionDetails={props.getSetPrescriptionDetails} setPrescriptionDetails={props.setPrescriptionDetails} />
          <button className="next-button" onClick={() => router.push
            (
              {
                pathname: '/src/components/HomeDesktop',
                query: {
                  component: 'location', prescriptions: JSON.stringify(props.getPrescriptionDetails),
                }
              }
            )
          }>Next: Step2 {'>>'}</button>
        </>
      }
      {props.getSetPrescriptionDetails !== undefined && setPrescriptionsData()}
    </div>

  );

}

export default FindPrescriptionHome;

