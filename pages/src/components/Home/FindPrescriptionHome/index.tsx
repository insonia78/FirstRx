import React, { useEffect, useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import PrescriptionDetailedForm from '../../component/PrescriptionDetailedForm';
import { useRouter } from 'next/router'
import styles from './../../../../../styles/FindPrescriptionHome.module.scss';
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
export default function FindPrescriptionHome({ location = undefined, dataFromRoute, getPrescriptionDetails, setPrescriptionDetails }) {


  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionDetails, set_PrescriptionDetails] = useState([]);
  const [resetDatFromRoute, setresetDatFromRoute] = useState(false);
  const[restInputValue,setRestInputValue] = useState("");

  const router = useRouter();
  const [getPrescriptions, { loading: mutationLoading, error: mutationError },] = useMutation(GET_PRESCRIPTIONS, {
    onError(err) {
      console.log(err);

    },
    update(proxy, result) {
      if (result.data.prescription.length === 1) {

        console.log('result.data', result.data.prescription);
        set_PrescriptionDetails(result.data.prescription);
        let data = {
          search_name: result.data.prescription[0].search_name,
          name: result.data.prescription[0].name,
          generic_name: result.data.prescription[0].generic_name,
          manufacturer: result.data.prescription[0].manufacturer,
          form: result.data.prescription[0].form[0],
          quantity: result.data.prescription[0].quantity[0],
          dosage: result.data.prescription[0].dosage[0].dosage,

        }
        setPrescriptionDetails(data);
        return;
      }
      let options = [];

      result.data.prescription.forEach((element, index) => {
        options.push(<option key={`prescription${index}`} value={element.search_name} />);

      })
      console.log(options);
      setPrescriptions(options);
    }
  });

  const searchPrescription = (e) => {
    setRestInputValue(e.target.value);
    getPrescriptions({ variables: { prescription: e.target.value } });


  }

  const clearInput = (e) => {


    setRestInputValue("");
    
    document.getElementById("prescription").innerHTML = "";
    set_PrescriptionDetails([]);
    setresetDatFromRoute(true);

  }

  useEffect(() => {

    if (dataFromRoute !== undefined)
      setPrescriptionsDataFromRoute();
  }, []);


  const setPrescriptionsDataFromRoute = () => {
    dataFromRoute = JSON.parse(dataFromRoute);
    setPrescriptionDetails(dataFromRoute);

    setRestInputValue(dataFromRoute.search_name);
    getPrescriptions({ variables: { prescription: dataFromRoute.search_name } });
  }

  return (
    <div>
      {resetDatFromRoute && (dataFromRoute = undefined)}
      <span className={styles.desktop_main_left_find_prescription_home_title} >Step 1: Your Prescription</span>
      
        <input 
        autoComplete="off" 
        onFocus={clearInput} 
        placeholder="Type Drug Name" 
        className={styles.desktop_main_left_find_prescription_home_input}
        value={restInputValue} 
        type="text" 
        list="prescriptions" 
        onChange={searchPrescription} 
        id="prescription" />
        <datalist 
        className="desktop-main-left-find-prescription-home-datalist" 
        id="prescriptions">
          {prescriptions}
        </datalist>
      
      {prescriptionDetails.length === 1 &&
        <>
          <PrescriptionDetailedForm dataFromServer={prescriptionDetails} dataFromRoute={dataFromRoute} setPrescriptionDetails={setPrescriptionDetails} />
          <button className="next-button next-button-find-prescription" onClick={() => router.push
            (
              {
                pathname: '/src/components/Home',
                query: {
                  component: 'location',
                  prescriptions: JSON.stringify(getPrescriptionDetails),
                  location: location,
                }
              }
            )
          }>Next: Step2 {'>>'}</button>
          {mutationLoading && <p>Loading...</p>}
          {mutationError && <p>Error :( Please try again</p>}
        </>
      }

    </div>

  );

}



