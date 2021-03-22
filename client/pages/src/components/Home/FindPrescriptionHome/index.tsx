import React, { useEffect, useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import PrescriptionDetailedForm from '../../component/PrescriptionDetailedForm';
import { useRouter } from 'next/router';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './../../../../../styles/FindPrescriptionHome.module.scss';

/**
 * @context prescription
 * 
 * uses 
 * 
 * @serviceApi prescription
 *  
 * 
 * */

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

/**
 * @Pages
 * 
 * It does a search of the prescirption wanted by entering key words
 * 
 * refrencing version of: 1/28/2021
 * source: https://github.com/emilynorton?tab=repositories
 * 
 * @param language // the languages selected English|Spanish
 * @param location //the location where to find the prescription
 * @param prescriptionFromRoute // the prescription passed in when using the route function
 * @useState getPrescriptionDetails // prescrition set from the setPrescriptionsDetails
 * @useState setPrescriptionDetails // sets the prescription chosen 
 */

export default function FindPrescriptionHome({ language, location = undefined, prescriptionFromRoute, getPrescriptionDetails, setPrescriptionDetails }) {

  /**@gets @sets the prescriptions array passed in from the mutation used for datalist */
  const [prescriptionsforDataList, setPrescriptionsForDataList] = useState([]);

  /**@gets @sets The prescriptionDetails to be passed in the Prescriptions Detail component */
  const [prescriptionDetailsForPrescriptionDetailComponent, setPrescriptionDetailsForPrescriptionDetailComponent] = useState([]);

  /** @gets @sets resets a flag to set prescritpionFromRoute to null */
  const [resetDataFromRoute, setResetDataFromRoute] = useState(false);

  /**@gets @sets the value from the input field */
  const [valueForInputValue, setValueForInputValue] = useState("");

  /**@gets @sets the value from the input field */
  const [ifPrescriptionDetailsExists, setIfPrescriptionDetailsExists] = useState((prescriptionFromRoute !== undefined ? true : false));



  const router = useRouter();


  /**
   * Call to the service Prescription to retreve the prescriptionsfordatalist available
   * @useState  setPrescriptionDetailsForPrescriptionDetailComponent
   * @param setPrescriptionDetails // passed in from the function
   * @useState
   *  
   */
  const [getPrescriptions, { loading: mutationLoading, error: mutationError },] = useMutation(GET_PRESCRIPTIONS, {
    onError(err) {
      console.log(err);
      alert(err);
    },
    update(proxy, result) {
      console.log(result);
      if (result.data.code === 200) {
        if (result.data.prescription.length === 1) {
          setIfPrescriptionDetailsExists(true);
          console.log('result.data', result.data.prescription);
          setPrescriptionDetailsForPrescriptionDetailComponent(result.data.prescription);
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
        console.log(result.data.prescription);
        result.data.prescription.forEach((element, index) => {
          options.push(<option key={`prescription${index}`} value={element} />);

        })
        console.log('options', options);
        setPrescriptionsForDataList(options);
      }
      else{
        alert(result.data.message);
      }
    }
  });

  /**
   * It searches for the prescription comming from the input 
   * @param e 
   * @useState setValueForInputValue // sets the value on the input field
   * @mutation getPrescriptions
   * @context prescription // used for apollo.link curently baseUri
   */
  const searchPrescription = (e) => {
    if(e.target.value.trim().length >= 3 )
    {       
       getPrescriptions({ variables: { prescription: e.target.value }, context: { clientName: 'prescriptions' } });
    }
    setValueForInputValue(e.target.value);

  }
  /**
   * Resets the component to initial state 
   * @param e
   * @useState setValueForInputValue
   * @useState set_prescriptionDetails
   * @useState setResetDataFromValue
   */
  const clearInput = (e) => {
    setValueForInputValue("");
    setPrescriptionDetailsForPrescriptionDetailComponent([]);
    setResetDataFromRoute(true);
    setIfPrescriptionDetailsExists(false);
  }

  /**
   * Use for when the prescription is passed in by the route
   * @funciton setPrescriptionsDataFromRoute
   */
  useEffect(() => {

    if (prescriptionFromRoute !== undefined) {
      setPrescriptionsDataFromRoute();
      setIfPrescriptionDetailsExists(true);
    }
  }, []);

  /**
   * Sets the Prescription been passed in by the route
   * @param setPrescriptionDetails // useState passed in from the function
   * @useState setValueForInputValue
   * @mutation getPrescriptions  
   */
  const setPrescriptionsDataFromRoute = () => {
    let value = JSON.parse(prescriptionFromRoute);

    setPrescriptionDetails(value);
    setValueForInputValue(value.search_name);
    //getPrescriptions({ variables: { prescription: prescriptionFromRoute.search_name } });
  }

  return (
    <div className={`${mutationLoading ? 'circular_progress_container' : ''}`}>
      {/**
       * refrencing version of: 1/28/2021
       * source: https://github.com/emilynorton?tab=repositories
       */}
      {mutationLoading && < div className='circular_progress'>
        <CircularProgress style={{ width: '6vmax', height: '6vmax' }} />
      </div>}

      {resetDataFromRoute && (prescriptionFromRoute = undefined)}
      {(language === 'english' || language === undefined) && <> <h3><span>Start Here: Step 1 of 3: </span>Your Prescription</h3></>}
      {language === 'spanish' && <><h3><span>{'<Spanish>'} Start Here: Step 1 of 3: </span>Your Prescription</h3></>}


      <form id="find_rx" className="find_rx">
        {(language === 'english' || language === undefined) && <label htmlFor="find_rx">Enter Drug Name</label>}
        {language === 'spanish' && <label htmlFor="find_rx">{'<Spanish>'}Enter Drug Name</label>}

        <input
          autoComplete="off"
          onFocus={clearInput}
          placeholder="Type Drug Name"
          id='first_rx'
          value={valueForInputValue}
          type="text"
          list="prescriptions"
          onChange={searchPrescription}
        />
        <datalist
          className="desktop-main-left-find-prescription-home-datalist"
          id="prescriptions">
          {prescriptionsforDataList}
        </datalist>


        {ifPrescriptionDetailsExists &&
          <>
            <PrescriptionDetailedForm language={language} dataFromServer={prescriptionDetailsForPrescriptionDetailComponent} prescriptionFromRoute={prescriptionFromRoute} setPrescriptionDetails={setPrescriptionDetails} />
            <div className="clickthrough">
              <a><div className="back cursor" onClick={clearInput}>Start Over</div></a>
              <div className='cursor' onClick={() => router.push
                (
                  {
                    pathname: '/src/components/Home',
                    query: {
                      component: 'location',
                      prescriptions: JSON.stringify(getPrescriptionDetails),
                      location: location,
                      language: language
                    }
                  }
                )
              }> {(language === 'english' || language === undefined) && 'Next: Step2 >>'} {language === 'spanish' && '<Spanish>Next: Step2 >>'}
              </div>
            </div>

          </>}

        {(!ifPrescriptionDetailsExists) && <section className="help">
          {(language === 'english' || language === undefined) &&
            <>
              <p>FirstRx is a free service. No login or account is needed.</p>

              <ol>
                <li>Enter Your Prescription information (Step 1)</li>
                <li>Indicate your location (Step 2)</li>
                <li>Pick a coupon from the pharmacy where you’d like to go. Pharmacies might have different prices but we’ll show show you the lowest priced pharmacies first. (Step 3)</li>
              </ol>

              <p>Then FirstRx will text you a coupon that you can show to the pharmacist.</p>
            </>}
          {(language === 'spanish') &&
            <>
              {'<Spanish>'}
              <p>FirstRx is a free service. No login or account is needed.</p>

              <ol>
                <li>Enter Your Prescription information (Step 1)</li>
                <li>Indicate your location (Step 2)</li>
                <li>Pick a coupon from the pharmacy where you’d like to go. Pharmacies might have different prices but we’ll show show you the lowest priced pharmacies first. (Step 3)</li>
              </ol>

              <p>Then FirstRx will text you a coupon that you can show to the pharmacist.</p>
            </>}

        </section>}

      </form>








      {/* 
        
        used in version 1 with wire frames
        // version 1 from wire frames
        // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=25%3A1&viewport=520%2C440%2C0.5&scaling=min-zoom
        // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=102%3A1390&viewport=212%2C389%2C0.5&scaling=min-zoom
        // https://www.figma.com/proto/f1Af0b6joE7OVyo4R4hb7i/FirstRx-Design?node-id=349%3A797&viewport=317%2C508%2C0.5&scaling=scale-down 


      {(language === 'english' || language === undefined) && <span className={styles.desktop_main_left_find_prescription_home_title} >Step 1: Your Prescription</span>}
      {language === 'spanish'  && <span className={styles.desktop_main_left_find_prescription_home_title} >{'<Spanish>'} Step 1: Your Prescription</span>}
       
        <input 
        autoComplete="off" 
        onFocus={clearInput} 
        placeholder="Type Drug Name" 
        className={styles.desktop_main_left_find_prescription_home_input}
        value={valueForInputValue} 
        type="text" 
        list="prescriptionsfordatalist" 
        onChange={searchPrescription} 
        id="prescription" />
        <datalist 
        className="desktop-main-left-find-prescription-home-datalist" 
        id="prescriptions">
          {prescriptionsfordatalist}
        </datalist>
      
      {prescriptionDetailsForPrescriptionDetailComponent.length === 1 &&
        <>
          <PrescriptionDetailedForm  language={language} dataFromServer={prescriptionDetailsForPrescriptionDetailComponent} prescriptionFromRoute={prescriptionFromRoute} setPrescriptionDetails={setPrescriptionDetails} />
          <button className={`next-button ${styles.next_button_find_prescription}`} onClick={() => router.push
            (
              {
                pathname: '/src/components/Home',
                query: {
                  component: 'location',
                  prescriptions: JSON.stringify(getPrescriptionDetails),
                  location: location,
                  language:language
                }
              }
            )
          }> {(language === 'english' || language === undefined) && 'Next: Step2 >>'} {language === 'spanish'  && '<Spanish>Next: Step2 >>'} </button>
          {mutationLoading && <p>Loading...</p>}
          {mutationError && <p>Error :( Please try again</p>}
        </>
      } */}

    </div>

  );

}



