import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from '../../../../../styles/Location.module.scss';
import { useAlert } from 'react-alert';

const GET_LOCATION = gql`
mutation   GetLocationFromZipOrCity($value:String){
      GetLocationFromZipOrCity(value:$value)
      {
           code
           message
           results{
             
             geometry{
                location{
                  lat
                  lng
                }
              }
           }
           predictions
           {
             description
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
  const [value,setValue] = useState("");
  const router = useRouter();
  let autocomplete;
  let myLocation;
  const alert = useAlert();
  let location_choosen = false;
  
  const getSizes = () => { 
    setWindowWidth(window.innerWidth); 
  }
  const gePlace = ()=>{
    setRestInputValue(autocomplete.getPlace().formatted_address);
    setLocation({...autocomplete.getPlace()});


  }
   useEffect(()=>{
       setWindowWidth(window.innerWidth);
       window.addEventListener(
        "resize", getSizes, false);  
    });
  const [getLocations] = useMutation(GET_LOCATION, {
    onError(err) {
      console.log(err);
      //alert.error(err);

    },
    update(proxy, result) {
      console.log('result', result.data.GetLocationFromZipOrCity);
      if(result.data.GetLocationFromZipOrCity.code !== 200)
      {
        console.log(result.data.GetLocationFromZipOrCity.message);
        return;
      }
      console.log('results', result.data.GetLocationFromZipOrCity.results);
      if ( result.data.GetLocationFromZipOrCity.results !== null) { 
        
       const location  = result.data.GetLocationFromZipOrCity.results[0].geometry.location;
          
       getAddressFromLatAndLng(location.lat,location.lng);         
        return;
      }
      // let options = [];

      // result.data.GetLocationFromZipOrCity.predictions.forEach((element,index) => {
      //   console.log('element',element.description);
      //   options.push(<option  onClick={_options} key={`location${index}`} value={element.description} />);

      // }) 

      setLocations(result.data.GetLocationFromZipOrCity.predictions);
    }
  });
  const _options = () =>{
    console.log('inside');
  }
  const searchLocation = (e) => { 
    
    setRestInputValue(e.target.value);
    getLocations({variables:{value:e.target.value},context:{clientName:'location'}});   
    
  }
  
  const clearInput = (e) => {
    setRestInputValue("");
    setReset(true);
    setLocation({});
    location_choosen =  false;
    
  }
const getAddressFromLatAndLng = async (lat,lng) =>{
  
      let latitude = `latitude=${lat}`;
      let longitude = `&longitude=${lng}`; 
      let query = latitude + longitude + "&localityLanguage=en";
      let bigdatacloud_api ="https://api.bigdatacloud.net/data/reverse-geocode-client";

      bigdatacloud_api += `?${query}`;
      let myObj = await fetch(bigdatacloud_api)
        .catch(handleError);

      if (myObj.ok) {
       let obj = await myObj.json();
       console.log(obj);
        myLocation = {
          latitude: lat,
          longitude:lng,
          postCode: obj.postcode,
          city: obj.locality,
          country: obj.countryName,
          state: obj.principalSubdivisionCode.split('-')[1],
        };
        setLocation(myLocation);
         let v = ` ${myLocation.postCode}, ${myLocation.city}, ${myLocation.state}`;  
         setRestInputValue(v); 
        }
      
        
    

}

  const getCurrentPosition = () => {

    
    navigator.geolocation.getCurrentPosition(async (position) => {
    
      let latitude = `${position.coords.latitude}`;
      let longitude = `${position.coords.longitude}`; 
      getAddressFromLatAndLng(latitude,longitude);
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
      <span className={styles.desktop_main_left_find_prescription_home_title}>
       {console.log('language',language)} 
      {(language === 'english' ||  language === undefined) && 'Step 2: Your Location'}
      {language === 'spanish' &&  '<Spanish>Step 2: Your Location'}        
      </span>
      <div className={styles.desktop_main_left_location_caption}>
      {(language === 'english' ||  language === undefined) && 'Choose a location where you would like to pick up your prescription.'}
      {language === 'spanish' &&  '<Spanish>Choose a location where you would like to pick up your prescription.'}
                      
      </div>
      { (windowWidth <= 520 && restInputValue ? 
          <div className={styles.desktop_location_clear}>
           {restInputValue} <u onClick={clearInput}>
           {(language === 'english' ||  language === undefined) && 'Clear'}
           {language === 'spanish' &&  '<Spanish>Clear'}              
            </u>
          </div>
               
      
          
          : <>
              <input value={restInputValue}  autoComplete="off" onFocus={(e)=>{
                              clearInput(e);
                              resetInput();                       
                              }
                            } 
                        placeholder="Type City or Zip Code" className={styles.desktop_main_left_find_prescription_home_input} type="text" list="Locations" onChange={searchLocation} id="location" />
              <datalist  onClick={_options} className="desktop-main-left-find-prescription-home-datalist" id="Locations">
                {console.log('locations', locations)}
                 {locations.map((element,index) =>
                  <option  onClick={_options} key={`location${index}`} value={element.description} />
                )}
              </datalist>
            </>)
        }
     {(windowWidth <= 520 && restInputValue) ? null: 
          <div onClick={getCurrentPosition} className={styles.desktop_main_location_detect_location}>
             {(language === 'english' ||  language === undefined) &&
           <>
          Or...<u>Detect Location</u>
          </>}
          {language === 'spanish' &&  <>{'<Spanish>'}
          Or...<u>Detect Location</u>
          </>}   
          </div>
      }
      {console.log('getLocation',getLocation)}
      {((Object.keys(getLocation).length !== 0 && getLocation.constructor === Object) || location) && <button className={`next-button ${styles.desktop_button_location}`} onClick={() => router.push
        (
          {
            pathname: '/src/components/Home',
            query: { component: 'choose-your-coupon', 
            prescriptions:dataFromRoute,
            location:restInputValue.trim(),
            language:language },
          })
      }>
        {(language === 'english' ||  language === undefined) && 'Next: Step3'}
        {language === 'spanish' &&  '<Spanish>Next: Step3'}       
        {'>>'}</button>}
      <div className={styles.desktop_location_back_button} onClick={() => router.push
        (
          {            
            pathname: '/src/components/Home',
            query: { component: 'prescription', 
            prescriptions:dataFromRoute,
            location:restInputValue.trim(),
            language:language
          
          }
          })
      }><u>{'<<'} 
      {(language === 'english' || language === 'undefined') &&  ` ${(windowWidth > 520 ? "Step 1: Your Prescription" :"Step 1")}`}
      {(language === 'spanish') &&  `${(windowWidth > 520 ? "<Spanish>Step 1: Your Prescription" :"<Spanish>Step 1")}`}
      </u>
      </div>

    </div>

  );

}

export default Location;