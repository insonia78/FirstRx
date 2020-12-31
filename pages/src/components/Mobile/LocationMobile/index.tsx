
import React, { useState } from 'react';
import { useMutation, useQuery, gql } from "@apollo/client";
import styles from '../styles/Home.module.css';
import PrescriptionDetailedForm from './../../component/PrescriptionDetailedForm';

import { PrescriptionsInterface } from '../../../../../components/interfaces/prescritpion.interface';



const LocationMobile = (props) =>{
    let locationArray = [];
    const [locations, setLocations] = useState([]);
    const [prescriptionDetails, setPrescriptionDetails] = useState([]);
    // const [getPrescriptions] = useMutation<PrescriptionsInterface | any>(GET_PRESCRIPTIONS, {
    //   onError(err) {
    //     console.log(err);
  
    //   },
    //   update(proxy, result) {
    //     let options = [];
    //     if (result.data.prescription.length === 1) {
    //       setPrescriptionDetails(result.data.prescription);
    //       console.log('result', result.data.prescription);
    //       return;
    //     }
    //     result.data.prescription.forEach((element, index) => {
    //       options.push(<option key={index} value={element.search_name} />);
  
    //     })
    //     console.log(options);
    //     setPrescriptions(options);
    //   }
    // });
    const searchLocation = (e) => {
  
      //getPrescriptions({ variables: { prescription: e.target.value, } });
  
  
    }

    return(
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main role="main" className="container d-flex flex-column flex-md-row align-items-center" style={{ height: "90vh" }}>
          <div className="card-deck col-12 text-center my-auto">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 card-title font-weight-normal">Check here <b>First</b> for your <b>Rx</b> savings!</h4>
              </div>
              <div className="card-body">
                <h3 className="card-title pricing-card-title">Step 2: Your Location</h3>
                <input type="text" list="prescriptions" className="form-control mt-3 mb-4" onChange={searchLocation} id="usr" />
                <datalist id="prescriptions">
                  {locations}
                </datalist>
                <p>OR... <a>Detect my location</a></p>
                
              </div>
            </div>
          </div>
        </main>
      </div>

    );
};

export default LocationMobile;