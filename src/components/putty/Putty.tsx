import React, { useState } from 'react'
import Select from 'react-select'
import {Session} from './utils/session'
import PuttyService from './utils/PuttyService'

export default function Putty() {
    const puttyService = new PuttyService()
    let [puttySession,setPuttySession] = useState(Session[0] as ValueLabel)

    function openSession(session:ValueLabel){
        puttyService.openSession(session)
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="container">
            <h1 style={{ fontSize: 17 }}>Putty</h1>
            <div className="main mt-5">
                <div className="row">
                    <div className="col-5">
                        <label htmlFor="" className="fs-13">Sessions</label>
                        <Select options={Session} value={puttySession} onChange={(t:any)=>{setPuttySession(t)}}/>
                    </div>
                    <div className="col">
                        <label htmlFor="" className="d-block">&nbsp;</label>
                        <button type="button" onClick={() => {openSession(puttySession)}} className="btn btn-outline-primary">Open</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ValueLabel {
    value: string
    label: string
}