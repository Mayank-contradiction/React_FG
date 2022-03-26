import React, {useState, useRef, useEffect} from 'react'
import Header from '../components/Header'
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

const Form = () => {
    const [phone, setPhone] = useState();
    const phoneRef = useRef(null);
    useEffect(() => {
        phoneRef.current.className = "form-control";
    }, []);
    return <>
        <Header/>
        <div className="container-fluid bg-light py-2">
            <h4>Aromatic Bar</h4>
            <p>We are committed to providing you with the best dining experience possible, so we welcome your comments. Please fill out this questionnaire. Thank you.</p>
            <div className="bootstrap-iso">
                <div className="container form-container p-3">
                    <div className="form-group ">
                        <label className="control-label " htmlFor="name1">Name
                            <span className="asteriskField">*</span>
                        </label>
                        <input className="form-control" id="name1" name="name1" type="text"/>
                    </div>
                    <div className="form-group ">
                        <label className="control-label requiredField" htmlFor="email">Email 
                            <span className="asteriskField">*</span>
                        </label>
                        <input className="form-control" id="email" name="email" type="text"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label requiredField" htmlFor="email">Phone 
                            <span className="asteriskField">*</span>
                        </label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone}
                            ref={phoneRef}
                            defaultCountry="IN"
                            initialValueFormat="national"
                        />
                    </div>
                    <div className="form-group">
                        <label>Please rate the quality of the service you received from your host. 
                            <span className="asteriskField">*</span>
                        </label>
                        <div className="d-flex">
                            <div className="flex-item">
                                <input type="radio" id="excellent-1" name="radio-group-1"/>
                                <label htmlFor="excellent-1">Excellent</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="good-1" name="radio-group-1"/>
                                <label htmlFor="good-1">Good</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="fair-1" name="radio-group-1"/>
                                <label htmlFor="fair-1">Fair</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="bad-1" name="radio-group-1"/>
                                <label htmlFor="bad-1">Bad</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Please rate the quality of your beverage. 
                            <span className="asteriskField">*</span>
                        </label>
                        <div className="d-flex">
                            <div className="flex-item">
                                <input type="radio" id="excellent-2" name="radio-group-2"/>
                                <label htmlFor="excellent-2">Excellent</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="good-2" name="radio-group-2"/>
                                <label htmlFor="good-2">Good</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="fair-2" name="radio-group-2"/>
                                <label htmlFor="fair-2">Fair</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="bad-2" name="radio-group-2"/>
                                <label htmlFor="bad-2">Bad</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Was our restaurant clean?
                            <span className="asteriskField">*</span>
                        </label>
                        <div className="d-flex">
                            <div className="flex-item">
                                <input type="radio" id="excellent-3" name="radio-group-3"/>
                                <label htmlFor="excellent-3">Excellent</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="good-3" name="radio-group-3"/>
                                <label htmlFor="good-3">Good</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="fair-3" name="radio-group-3"/>
                                <label htmlFor="fair-3">Fair</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="bad-3" name="radio-group-3"/>
                                <label htmlFor="bad-3">Bad</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Please rate your overall dining experience.
                            <span className="asteriskField">*</span>
                        </label>
                        <div className="d-flex">
                            <div className="flex-item">
                                <input type="radio" id="excellent-4" name="radio-group-4"/>
                                <label htmlFor="excellent-4">Excellent</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="good-4" name="radio-group-4"/>
                                <label htmlFor="good-4">Good</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="fair-4" name="radio-group-4"/>
                                <label htmlFor="fair-4">Fair</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="bad-4" name="radio-group-4"/>
                                <label htmlFor="bad-4">Bad</label>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-custom text-light" name="submit" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Form