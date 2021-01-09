import { useRouter } from "next/router";
import styles from '../../../../../styles/Coupon.module.scss';
const Coupon = ({ windowWidth, prescription, coupon = undefined }) => {
    let search_name = "";
    let dosage = "";
    let form = "";
    if (prescription !== undefined) {
        prescription = JSON.parse(prescription);
        search_name = prescription.search_name;
        dosage = prescription.dosage;
        form = prescription.form;

    }

    return (
        <>{
            windowWidth > 520 ?
            <div className={styles.desktop_coupon_component_container}>

                <div className={styles.desktop_coupon_component_store_info}><b>Show this coupon at</b> {'Store'}, {'Store Address'}</div>

                <div className={styles.desktop_coupon_component_phone_number} >Questions? Give us a call at <b>800.555.1212</b></div>

                <div className={styles.desktop_coupon_component_prescription}> {search_name} {dosage} , {form} </div>
                <div className={styles.desktop_coupon_component_details_container}>
                    <ul className={styles.desktop_coupon_component_deatils_identification}>
                        <li>ID: {'XXXXXXXXXX'}</li>
                        <li>BIN: {'XXXXXXXXXXX'}</li>
                        <li>PCN: {'XXXXXXXXXXX'}</li>
                        <li>GRP: {'XXXXXXXXXXX'}</li>
                    </ul>
                    <div className={styles.desktop_coupon_component_deatils_price}>${'0.00'}</div>
                </div>
                <div className={styles.desktop_coupon_component_fine_print} > All the fine print goes here</div>
                <div className={styles.desktop_coupon_component_fine_declairment}>DISCOUNT ONLY - <br />NOT INSURANCE</div>
            </div>
            :
            <div className={styles.desktop_coupon_component_container}>
                <div className={styles.desktop_coupon_prescrition_detailes_container}>
                    <div className={styles.desktop_coupon_component_prescription}> {search_name} {dosage} , {form} </div>
                    <div className={styles.desktop_coupon_component_deatils_price}>${'0.00'}</div>
                </div>
                <div className={styles.desktop_coupon_component_store_info_component}>{'Store'}, {'Store Address'}</div>

                <div className={styles.desktop_coupon_component_details_container}>
                    <ul className={styles.desktop_coupon_component_deatils_identification}>
                        <li>ID: {'XXXXXXXXXX'}</li>
                        <li>BIN: {'XXXXXXXXXXX'}</li>
                        <li>PCN: {'XXXXXXXXXXX'}</li>
                        <li>GRP: {'XXXXXXXXXXX'}</li>
                    </ul>                    
                </div>
                <div className={styles.desktop_coupon_component_fine_declairment}>DISCOUNT ONLY - NOT INSURANCE</div>
                <div className={styles.desktop_coupon_component_fine_print} > All the fine print goes here</div>
                
            </div>
          }
        </>
    );
}

export default Coupon