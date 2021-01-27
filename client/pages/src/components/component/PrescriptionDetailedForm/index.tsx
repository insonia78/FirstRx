import styles from '../../../../../styles/PrescriptionDetailedForm.module.scss';


const PrescriptionDetailedForm = ({ language, disabled = false, dataFromServer = undefined, prescriptionFromRoute = undefined, setPrescriptionDetails = undefined }) => {
    let manufacturer = "";
    let form = "";
    let dosage = "";
    let quantity = "";
    if (prescriptionFromRoute !== undefined) {
        prescriptionFromRoute = JSON.parse(prescriptionFromRoute);
        manufacturer = prescriptionFromRoute.manufacturer;
        form = prescriptionFromRoute.form;
        dosage = prescriptionFromRoute.dosage;
        quantity = prescriptionFromRoute.quantity
    }
    const onChange = (e) => {
        let val = {
            [e.target.name]: e.target.value
        }
        setPrescriptionDetails(val);
    }
    return (
        <>
            <div className={styles.prescription_detailed_form_container}>
                <div className={styles.main_desktop_left_prescription_form_description}>

                    {language === 'english' || language === undefined && `Does this match your prescription? Make adjustments below
                so that we can accurately compare prices. Don't worry, you will be
                able to adjust this again.`}
                    {language === 'spanish' && `<Spanish> Does this match your prescription? Make adjustments below
                so that we can accurately compare prices. Don't worry, you will be
                able to adjust this again.`}

                </div>

                <div className={styles.main_desktop_left_prescription_form_title_container}>
                    <div
                        className={styles.main_desktop_left_prescription_form_title}>
                        {(prescriptionFromRoute !== undefined ? prescriptionFromRoute.search_name : (dataFromServer === undefined ? "" : dataFromServer[0].search_name))}

                    </div>
                </div>

                <div className={styles.main_desktop_left_prescription_form_description_container}>
                    <div className={styles.manufactor_container} >
                        <div className={`${styles.main_desktop_left_prescription_form_manufacturer_label} ${styles.main_desktop_left_prescription_form_label}`} >
                            {(language === 'english' || language === undefined) && 'Manufacture'}
                            {language === 'spanish' && '<Spanish>'}
                        </div>
                        
                            <select
                                disabled={disabled}
                                name="manufactor"
                                onChange={onChange}
                                defaultValue={prescriptionFromRoute && manufacturer}
                                className={(disabled ? styles.disabled_fonts_weight : "") + ` ${styles.main_desktop_left_prescription_form_manufacturer_select} ${styles.main_desktop_left_prescription_form_select}`}>
                                {
                                    dataFromServer && dataFromServer.map((element, index) =>
                                        <option key={`manufactor${index}`} value={element.manufacturer}>{element.manufacturer}</option>

                                    )
                                }
                                {dataFromServer === undefined && <option value={manufacturer}>{manufacturer}</option>}
                            </select>
                        
                    </div>
                    <div className={styles.form_container}>
                        <div className={`${styles.main_desktop_left_prescription_form_label} ${styles.main_desktop_left_prescription_form_format_label}`}>
                        {(language === 'english' || language === undefined) && 'Format'}
                            {language === 'spanish' && '<Spanish>'}
                            
                        </div>
                        
                        <select
                            disabled={disabled}
                            name="form"
                            onChange={onChange}
                            defaultValue={prescriptionFromRoute && form}
                            className={(disabled ? styles.disabled_fonts_weight : "") + ` ${styles.main_desktop_left_prescription_form_format_select} ${styles.main_desktop_left_prescription_form_select} `}>
                            {
                                dataFromServer && dataFromServer.map(element =>
                                    element.form.map((e, index) =>
                                        <option key={`form${index}`} value={e}>{e}</option>

                                    )


                                )
                            }
                            {dataFromServer === undefined && <option value={form} >{form} </option>}
                        </select>
                        
                    </div>
                    <div className={styles.dosage_container}>
                        <div className={` ${styles.main_desktop_left_prescription_form_label} ${styles.main_desktop_left_prescription_form_dosage_label}`} >
                        {(language === 'english' || language === undefined) && 'Dosage'}
                            {language === 'spanish' && '<Spanish>'}
                          
                            
                        </div>

                        <select
                            disabled={disabled}
                            name="dosage"
                            onChange={onChange}
                            defaultValue={prescriptionFromRoute && dosage}
                            className={(disabled ? styles.disabled_fonts_weight : "") + ` ${styles.main_desktop_left_prescription_form_select} ${styles.main_desktop_left_prescription_form_dosage_select}`}>
                            {
                                dataFromServer && dataFromServer.map(element =>
                                    element.dosage.map((e, index) =>
                                        <option key={`dosage${index}`} value={e.dosage}>{e.dosage}</option>

                                    )

                                )
                            }
                            {dataFromServer === undefined && <option value={dosage} > {dosage} </option>}
                        </select>
                    </div>
                    <div className={styles.quantity_container}>
                        <div className={`${styles.main_desktop_left_prescription_form_label} ${styles.main_desktop_left_prescription_form_quantity_label}`}>
                        {(language === 'english' || language === undefined) && 'Quantity'}
                            {language === 'spanish' && '<Spanish>'}
                          
                            
                        </div>
                        <select
                            disabled={disabled}
                            name="quantity"
                            onChange={onChange}
                            defaultValue={prescriptionFromRoute && quantity}
                            className={(disabled ? styles.disabled_fonts_weight : "") + ` ${styles.main_desktop_left_prescription_form_select} ${styles.main_desktop_left_prescription_form_quantity_select}`}>
                            {
                                dataFromServer && dataFromServer.map(element =>
                                    element.dosage.map((e, index) =>
                                        <option key={`quantity${index}`} value={e.quantity}>{e.quantity}</option>

                                    )

                                )
                            }
                            {dataFromServer === undefined && <option value={quantity}>{quantity}</option>}
                        </select>
                    </div>
                </div>
            </div>
        </>

    );
}
export default PrescriptionDetailedForm;