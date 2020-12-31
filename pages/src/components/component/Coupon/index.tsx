import { useRouter } from "next/router";

const Coupon = ({  prescription, coupon = undefined}) => {
    let search_name = "";
    let dosage = "";
    let form = "";
    if(prescription !== undefined)
    {
       prescription = JSON.parse(prescription);
       search_name = prescription.search_name;
       dosage = prescription.dosage;
       form = prescription.form;

    }

    return (
        <div className='desktop-coupon-component-container'>
            
            <div className='desktop-coupon-component-store-info'><b>Show this coupon at</b> {'Store'}, {'Store Address'}</div>
            
            <div className='desktop-coupon-component-phone-number' >Questions? Give us a call at <b>800.555.1212</b></div>
            
            <div className='desktop-coupon-component-prescription'> {search_name} { dosage} , {form} </div>
            <div className='desktop-coupon-component-details-container'>
                <ul className='desktop-coupon-component-deatils-identification'>
                    <li>ID: {'XXXXXXXXXX'}</li>
                    <li>BIN: {'XXXXXXXXXXX'}</li>
                    <li>PCN: {'XXXXXXXXXXX'}</li>
                    <li>GRP: {'XXXXXXXXXXX'}</li>
                </ul>
                <div className='desktop-coupon-component-deatils-price'>${'0.00'}</div>
            </div>
            <div className='desktop-coupon-component-fine-print' > All the fine print goes here</div>
            <div className='desktop-coupon-component-fine-declairment'>DISCOUNT ONLY - <br />NOT INSURANCE</div>
        </div>
    );
}

export default Coupon