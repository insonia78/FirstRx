import React, { useEffect, useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/router';
import styles from '../../../../../styles/Location.module.scss';


const GET_LOCATION = gql`
mutation  location($location:String){
      prescription(location:$location)
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
const Location = ({language,dataFromRoute,location}) => {

  
  const [locations, setLocations] = useState([]);
  const [locationsDetails, setLocationsDetails] = useState([]);
  const[getLocation,setLocation] = useState({});
  const[reset,setReset ] = useState(false);
  const[windowWidth, setWindowWidth] = useState(0);
  const[restInputValue,setRestInputValue] = useState("");
  const router = useRouter();
  let myLocation;
  
  const getSizes = () => { 
    setWindowWidth(window.innerWidth); 
  }

   useEffect(()=>{
       setWindowWidth(window.innerWidth);
       window.addEventListener(
        "resize", getSizes, false);
  
    });
  const [getLocations] = useMutation(GET_LOCATION, {
    onError(err) {
      console.log(err);

    },
    update(proxy, result) {
      if (result.data.prescription.length === 1) {        
        setLocationsDetails(result.data.prescription);        
        return;
      }
      let options = [];

      result.data.prescription.forEach((element) => {
        options.push(<option value={element.search_name} />);

      })
      console.log(options);
      setLocations(options);
    }
  });
  const searchPrescription = (e) => {

    setRestInputValue(e.target.value);
    getLocations({ variables: { prescription: e.target.value } });


  }
  
  const clearInput = (e) => {
    setRestInputValue("");
    setReset(true);
    setLocation({});
    
  }
  const getCurrentPosition = () => {

    navigator.geolocation.getCurrentPosition(async (position) => {
    
      let latitude = `latitude=${position.coords.latitude}`;
      let longitude = `&longitude=${position.coords.longitude}`;      
      let query = latitude + longitude + "&localityLanguage=en";
      let bigdatacloud_api ="https://api.bigdatacloud.net/data/reverse-geocode-client";

      bigdatacloud_api += `?${query}`;
      let myObj = await fetch(bigdatacloud_api)
        .catch(handleError);

      if (myObj.ok) {
       let obj = await myObj.json();
        myLocation = {
          postCode: obj.postcode,
          city: obj.locality,
          country: obj.countryName,
          state: obj.principalSubdivisionCode.split('-')[1],
        };
        setLocation(myLocation);
         let v = ` ${myLocation.postCode}, ${myLocation.city}, ${myLocation.state}`;  
         setRestInputValue(v); 
        }
      
    });
    

  }
  useEffect(() => {

    if (location !== undefined)
        setRestInputValue(location); 
           
  }, []);
  var handleError = function (err) {
    console.warn(err);
    return new Response(JSON.stringify({
      code: 400,
      message: 'Stupid network Error'
    }));
  };
  const resetInput = () =>{    
    setLocation({});  
  }
  return (
    <div>      
      {reset && (location = undefined)}            
      <span className={styles.desktop_main_left_find_prescription_home_title} >Step 2: Your Location</span>
      <div className={styles.desktop_main_left_location_caption}>Choose a location where you would like to pick up your prescription.</div>
      { (windowWidth <= 520 && restInputValue ? 
          <div className={styles.desktop_location_clear}>
           {restInputValue} <u onClick={clearInput}> Clear</u>
          </div>
               
      
          
          : <>
              <input value={restInputValue}  autoComplete="off" onFocus={(e)=>{
                              clearInput(e);
                              resetInput();                       
                              }
                            } 
                        placeholder="Type City or Zip Code" className={styles.desktop_main_left_find_prescription_home_input} type="text" list="Locations" onChange={searchPrescription} id="location" />
              <datalist className="desktop-main-left-find-prescription-home-datalist" id="Locations">
                {locations}
              </datalist>
            </>)
        }
     {(windowWidth <= 520 && restInputValue ? null: 
          <div onClick={getCurrentPosition} className={styles.desktop_main_location_detect_location}> Or...<u>Detect Location</u></div>
      )}
      {console.log('getLocation',getLocation)}
      {console.log('location',location)}
      {((Object.keys(getLocation).length !== 0 && getLocation.constructor === Object) || location) && <button className={`next-button ${styles.desktop_button_location}`} onClick={() => router.push
        (
          {
            pathname: '/src/components/Home',
            query: { component: 'choose-your-coupon', 
            prescriptions:dataFromRoute,
            location:restInputValue.trim() },
          })
      }>Next: Step3 {'>>'}</button>}
      <div className={styles.desktop_location_back_button} onClick={() => router.push
        (
          {            
            pathname: '/src/components/Home',
            query: { component: 'prescription', 
            prescriptions:dataFromRoute,
            location:restInputValue.trim(),
          
          }
          })
      }><u>{'<<'} {(windowWidth > 520 ? "Step 1: Your Prescription" :"Step 1")}</u></div>

    </div>

  );

}

export default Location;