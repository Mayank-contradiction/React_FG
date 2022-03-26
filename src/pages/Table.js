import React from 'react'
import Header from '../components/Header'
import { getData } from '../services/indexeddb'

const Table = () => {
    getData().then((data)=>{
        console.log(data);
    })
    return <>
        <Header/>
        <h1>This is table page.</h1>
        </>
}

export default Table