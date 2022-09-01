import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { MDBDataTable } from 'mdbreact';
import { getData } from '../services/indexeddb';

const Table = () => {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        getData().then((list)=>{
            console.log(list);
            setFeedbackList(list);
        });
    }, []);

    const setFeedbacks = ()=>{
        const data = {
            columns: [
                {
                    label: 'Customer Name',
                    field: 'customerName'
                },
                {
                    label: 'Email Id',
                    field: 'emailId'
                },
                {
                    label: 'Phone Number',
                    field: 'phone'
                },
                {
                    label: 'Service Experience',
                    field: 'serviceRating',
                },
                {
                    label: 'Beverage Experience',
                    field: 'beverageRating'
                },
                {
                    label: 'Cleanliness',
                    field: 'cleanRating'
                },
                {
                    label: 'Dining Experience',
                    field: 'diningRating'
                }
            ],
            rows: []
        }
        if(feedbackList){
            feedbackList.forEach(elem => {
                data.rows.push({
                    customerName: elem.customerName,
                    emailId: elem.emailId ,
                    phone: elem.phone ,
                    serviceRating: elem.serviceRating ,
                    beverageRating: elem.beverageRating ,
                    cleanRating: elem.cleanRating , 
                    diningRating: elem.diningRating
                })
            });
        }
        return data;
    }
    return <>
        <Header/>
        <div className="container-fluid">
            <h3>Hello Everyone, I am Mayank.</h3>
            <h3 className="my-3">Total number of Feedbacks: {feedbackList.length}</h3>
            <MDBDataTable 
                data={setFeedbacks()}
                bordered
                striped
                hover
                responsive
            ></MDBDataTable>
        </div>
    </>
}

export default Table
