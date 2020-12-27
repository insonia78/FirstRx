


const PrescriptionDetailedForm = ({dataFromServer,dataFromRoute,setPrescriptionDetails}) => {

    if(dataFromRoute !== undefined)
       dataFromRoute = JSON.parse(dataFromRoute);
    const onChange = (e) => {
        let val ={
            [e.target.name]: e.target.value
        }        
        setPrescriptionDetails(val);        
    }
    return (
        <>
            
            <div>
                <div className="main-desktop-left-prescription-form-description">Does this match your prescription? Make adjustments below
                so that we can accurately compare prices. Don't worry, you will be
                able to adjust this again.</div>
                <div className="main-desktop-left-prescription-form-title-container">
                    <div
                        className="main-desktop-left-prescription-form-title">
                        {( dataFromRoute !== undefined ? dataFromRoute.search_name : dataFromServer[0].search_name)}

                    </div>
                </div>

                <div className="main-desktop-left-prescription-form-description-container">
                    <div className="main-desktop-left-prescription-form-label main-desktop-left-prescription-form-manufacturer-label" >
                        Manufacture
                </div>
                    <div className="main-desktop-left-prescription-form-select-container">
                        <select
                            name ="manufactor"
                            onChange={onChange}
                            defaultValue={dataFromRoute !== undefined ?dataFromRoute.manufactor : ""}
                            className="main-desktop-left-prescription-form-select main-desktop-left-prescription-form-manufacturer-select">
                            {
                                dataFromServer.map((element, index) =>
                                    <option key={`manufactor${index}`} value={element.manufacturer}>{element.manufacturer}</option>

                                )
                            }
                        </select>
                    </div>
                    <div className="main-desktop-left-prescription-form-label main-desktop-left-prescription-form-format-label">
                        Format
                </div>
                    <div className="main-desktop-left-prescription-form-select-container">
                        <select
                            name ="form"
                            onChange={onChange}
                            defaultValue={ dataFromRoute !== undefined ?  dataFromRoute.form : ""}
                            className="main-desktop-left-prescription-form-select main-desktop-left-prescription-form-format-select">
                            {
                                dataFromServer.map(element =>
                                    element.form.map((e, index) =>
                                        <option key={`form${index}`} value={e}>{e}</option>

                                    )


                                )
                            }
                        </select>
                    </div>
                    <div className="main-desktop-left-prescription-form-label main-desktop-left-prescription-form-dosage-label" >
                        Dosage
                </div>
                    <div className="main-desktop-left-prescription-form-select-container">
                        <select
                            name ="dosage"
                            onChange={onChange}
                            defaultValue={ dataFromRoute !== undefined ?  dataFromRoute.dosage : ""} className="main-desktop-left-prescription-form-select main-desktop-left-prescription-form-dosage-select">
                            {
                                dataFromServer.map(element =>
                                    element.dosage.map((e, index) =>
                                        <option key={`dosage${index}`} value={e.dosage}>{e.dosage}</option>

                                    )

                                )
                            }
                        </select>
                    </div>
                    <div className="main-desktop-left-prescription-form-label main-desktop-left-prescription-form-quantity-label">
                        Quantity
                </div>
                    <div className="main-desktop-left-prescription-form-select-container">
                        <select
                            name ="quantity"
                            onChange={onChange}
                            defaultValue={dataFromRoute !== undefined ? dataFromRoute.quantity : ""}
                            className="main-desktop-left-prescription-form-select main-desktop-left-prescription-form-quantity-select">
                            {
                                dataFromServer.map(element =>
                                    element.dosage.map((e, index) =>
                                        <option key={`quantity${index}`} value={e.quantity}>{e.quantity}</option>

                                    )

                                )
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>

    );
}
export default PrescriptionDetailedForm;