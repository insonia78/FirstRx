


const PrescriptionDetailedForm = (props) => {


    return (
        
            <div className="list-unstyled mt-3 mb-4 prescription-form">
                <div className="prescription-form-select-container ">
                    <h6 className="prescription-form-description">Does this match your prescription? Make adjustments below
                    so that we can accurately compare prices. Don't worry, you will be
                able to adjust this again.</h6>
                </div>
                <div className="prescription-form-select-container prescription-form-title">

                    <h4 className="prescription-form-title" >{props.data[0].search_name}</h4>

                </div>
                <div>
                    <label>Manufacturer</label>
                </div>
                <div>
                    <select className="browser-default custom-select">
                        {
                            props.data.map((element, index) =>
                                <option key={`manufactor${index}`} value={element.manufacturer}>{element.manufacturer}</option>

                            )
                        }
                    </select>
                </div>
                <div>
                    <label>Form</label>
                </div>
                <div>
                    <select className="browser-default custom-select">
                        {
                            props.data.map(element =>
                                element.form.map((e, index) =>
                                    <option key={`form${index}`} value={e}>{e}</option>

                                )


                            )
                        }
                    </select>
                </div>
                <div>
                    <label>Dosage</label>
                </div>
                <div>
                    <select className="browser-default custom-select">
                        {
                            props.data.map(element =>
                                element.dosage.map((e, index) =>
                                    <option key={`dosage${index}`} value={e.dosage}>{e.dosage}</option>

                                )

                            )
                        }
                    </select>
                </div>
                <div>
                    <label>Quantity</label>
                </div>
                <div>
                    <select className="browser-default custom-select">
                        {
                            props.data.map(element =>
                                element.dosage.map((e, index) =>
                                    <option key={`dosage${index}`} value={e.quantity}>{e.quantity}</option>

                                )

                            )
                        }
                    </select>
                </div>
            </div>
        

    );
}
export default PrescriptionDetailedForm;