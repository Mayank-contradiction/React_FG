import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { saveData } from '../services/indexeddb'

import 'react-phone-number-input/style.css';

const Form = () => {
    const [customerName, setCustomerName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [phone, setPhone] = useState();
    const [serviceRating, setServiceRating] = useState("");
    const [cleanRating, setCleanRating] = useState("");
    const [diningRating, setDiningRating] = useState("");
    const [beverageRating, setBeverageRating] = useState("");

    //Use to control re-render the components when isEmpty and isValid state changes.
    const [rendering, setRendering] = useState(1);

    //States for validation
    const [isEmpty, setIsEmpty] = useState({
        customerName: false,
        emailId: false ,
        phone: false ,
        serviceRating: false ,
        cleanRating: false ,
        diningRating: false ,
        beverageRating: false ,
    });
    const [isValid, setIsValid] = useState({
        customerName: "",
        emailId: "" ,
        phone: "" ,
    });

    //Used to add form-control class in npm dependency.
    const phoneRef = useRef(null);
    useEffect(() => {
        phoneRef.current.className = `form-control ${isEmpty.phone || isValid.phone ? 'invalid' : ''}`;
    }, [rendering]);

    //Used to toggle modal
    const modalButtonRef = useRef(null);

    //Used to reset modal
    const formRef = useRef(null);

    const validation = ()=>{
        let result = true;
        let isEmptytemp = isEmpty;
        let isValidTemp = isValid;

        //Validation for Customer Name
        if(!customerName){
            isEmptytemp.customerName = true;
            result = false;
        }else{
            isEmptytemp.customerName = false;
            if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/.test(customerName)){
                isValidTemp.customerName = "Customer name shouldn't contain special characters.";
                result = false;
            }
            else {
                isValidTemp.customerName = "";
            }
        }

        //Validation for Email Id
        if(!emailId){
            isEmptytemp.emailId = true;
            result = false;
        }else{
            isEmptytemp.emailId = false;
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)){
                isValidTemp.emailId = "Email should be valid.";
                result = false;
            }else{
                isValidTemp.emailId = "";
            }
        }

        //validation for phone
        if(!phone){
            isEmptytemp.phone = true;
            result = false;
        }else{
            isEmptytemp.phone = false;
            if(!isValidPhoneNumber(phone)){
                isValidTemp.phone = "Phone number should be valid.";
                result = false;
            }else{
                isValidTemp.phone = "";
            }
        }

        //validation for questions
        if(!serviceRating) {
            isEmptytemp.serviceRating = true;
            result = false
        }else{
            isEmptytemp.serviceRating = false;
        }
        if(!cleanRating) {
            isEmptytemp.cleanRating = true;
            result = false
        }else{
            isEmptytemp.cleanRating = false;
        }
        if(!diningRating) {
            isEmptytemp.diningRating = true;
            result = false
        }else{
            isEmptytemp.diningRating = false;
        }
        if(!beverageRating) {
            isEmptytemp.beverageRating = true;
            result = false
        }else{
            isEmptytemp.beverageRating = false;
        }
        setIsEmpty(isEmptytemp);
        setIsValid(isValidTemp);
        setRendering(rendering + 1);
        return result;
    }

    const handleFormData = (e) =>{
        e.preventDefault();
        if(validation()){
            saveData({
                customerName,
                emailId,
                phone,
                serviceRating,
                diningRating,
                beverageRating,
                cleanRating,
            }).then(()=>{
                modalButtonRef.current.click();
                formRef.current.reset();
                setCustomerName("");
                setPhone(undefined);
                setEmailId("");
            }).catch((e)=>{
                if(e.name === "ConstraintError"){
                    alert("Your feedback is already recieved.(Note: Please change your email id.)")
                }
            })
        }
    }
    return <>
        <Header/>
        <div className="container-fluid bg-light py-2">
            <h4>Aromatic Bar</h4>
            <p>We are committed to providing you with the best dining experience possible, so we welcome your comments. Please fill out this questionnaire. Thank you.</p>
            <div className="bootstrap-iso">
                <div className="container form-container p-3">
                <form ref={formRef}>
                    <div className="form-group ">
                        <label className="control-label " htmlFor="name">Name
                            <span className="asteriskField">*</span>
                        </label>
                        <input className={`form-control ${isEmpty.customerName || isValid.customerName ? 'invalid' : ''}`} placeholder="Enter your name" id="name" type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}/>
                        {isEmpty.customerName && <small className="error-text">Error: This field is mandatory.</small>}
                        {isValid.customerName && <small className="error-text">Error: {isValid.customerName}</small>}
                    </div>
                    <div className="form-group ">
                        <label className="control-label requiredField" htmlFor="email">Email 
                            <span className="asteriskField">*</span>
                        </label>
                        <input className={`form-control ${isEmpty.emailId || isValid.emailId ? 'invalid' : ''}`} placeholder="Enter email id" id="email" type="text" value={emailId} onChange={e => setEmailId(e.target.value)}/>
                        {isEmpty.emailId && <small className="error-text">Error: This field is mandatory.</small>}
                        {isValid.emailId && <small className="error-text">Error: {isValid.emailId}</small>}
                    </div>
                    <div className="form-group">
                        <label className="control-label requiredField" htmlFor="email">Phone 
                            <span className="asteriskField">*</span>
                        </label>
                        <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone}
                            ref={phoneRef}
                            defaultCountry="IN"
                        />
                        {isEmpty.phone && <small className="error-text">Error: This field is mandatory.</small>}
                        {isValid.phone && <small className="error-text">Error: {isValid.phone}</small>}
                    </div>
                    <div className="form-group">
                        <label>Please rate the quality of the service you received from your host. 
                            <span className="asteriskField">*</span>
                        </label>
                        <div className="d-flex" onChange={e => setServiceRating(e.target.value)}>
                            <div className="flex-item">
                                <input type="radio" id="excellent-1" name="radio-group-1" value="Excellent"/>
                                <label htmlFor="excellent-1">Excellent</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="good-1" name="radio-group-1" value="Good"/>
                                <label htmlFor="good-1">Good</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="fair-1" name="radio-group-1" value="Fair"/>
                                <label htmlFor="fair-1">Fair</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="bad-1" name="radio-group-1" value="Bad"/>
                                <label htmlFor="bad-1">Bad</label>
                            </div>
                        </div>
                        {isEmpty.serviceRating && <small className="error-text">Error: This field is mandatory.</small>}
                    </div>
                    <div className="form-group">
                        <label>Please rate the quality of your beverage. 
                            <span className="asteriskField">*</span>
                        </label>
                        <div className="d-flex" onChange={e => setBeverageRating(e.target.value)}>
                            <div className="flex-item">
                                <input type="radio" id="excellent-2" name="radio-group-2" value="Excellent"/>
                                <label htmlFor="excellent-2">Excellent</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="good-2" name="radio-group-2" value="Good"/>
                                <label htmlFor="good-2">Good</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="fair-2" name="radio-group-2" value="Fair"/>
                                <label htmlFor="fair-2">Fair</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="bad-2" name="radio-group-2" value="Bad"/>
                                <label htmlFor="bad-2">Bad</label>
                            </div>
                        </div>
                        {isEmpty.beverageRating && <small className="error-text">Error: This field is mandatory.</small>}
                    </div>
                    <div className="form-group">
                        <label>Was our restaurant clean?
                            <span className="asteriskField">*</span>
                        </label>
                        <div className="d-flex" onChange={e => setCleanRating(e.target.value)}>
                            <div className="flex-item">
                                <input type="radio" id="excellent-3" name="radio-group-3" value="Excellent"/>
                                <label htmlFor="excellent-3">Excellent</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="good-3" name="radio-group-3" value="Good"/>
                                <label htmlFor="good-3">Good</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="fair-3" name="radio-group-3" value="Fair"/>
                                <label htmlFor="fair-3">Fair</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="bad-3" name="radio-group-3" value="Bad"/>
                                <label htmlFor="bad-3">Bad</label>
                            </div>
                        </div>
                        {isEmpty.cleanRating && <small className="error-text">Error: This field is mandatory.</small>}
                    </div>
                    <div className="form-group">
                        <label>Please rate your overall dining experience.
                            <span className="asteriskField">*</span>
                        </label>
                        <div className="d-flex" onChange={e => setDiningRating(e.target.value)}>
                            <div className="flex-item">
                                <input type="radio" id="excellent-4" name="radio-group-4" value="Excellent"/>
                                <label htmlFor="excellent-4">Excellent</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="good-4" name="radio-group-4" value="Good"/>
                                <label htmlFor="good-4">Good</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="fair-4" name="radio-group-4" value="Fair"/>
                                <label htmlFor="fair-4">Fair</label>
                            </div>
                            <div className="flex-item">
                                <input type="radio" id="bad-4" name="radio-group-4" value="Bad"/>
                                <label htmlFor="bad-4">Bad</label>
                            </div>
                        </div>
                        {isEmpty.diningRating && <small className="error-text">Error: This field is mandatory.</small>}
                    </div>
                    <div className="text-center">
                        <button className="btn btn-custom text-light" type="submit" onClick={handleFormData}>Submit</button>
                    </div>
                    </form>
                </div>
            </div>
            <button className="d-none" data-toggle="modal" data-target="#myModal" ref={modalButtonRef}></button>
            <div className="modal fade" id="myModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            Thanks for your precious feedback!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Form