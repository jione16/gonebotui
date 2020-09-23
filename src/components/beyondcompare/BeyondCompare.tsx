import React, { useState } from 'react'
import Select from 'react-select'
import { Session } from './utils/sessions'
import BCompare from './utils/service'
function BeyondCompare() {
    const bservice = new BCompare()
    const [leftFolder, setLeftFolder] = useState(Session[0] as ValueLabel)
    const [rightFolder, setRightFolder] = useState(Session[0] as ValueLabel)
    function compare(left: string, right: string) {
        bservice.folderCompare(left, right)
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="container">

            <h1 style={{ fontSize: 17 }}>
                <img src={require('./images/logo.png')} width="17px" className="mr-2" alt="beyondcompare" />
                Beyond Compare
                </h1>
            <div className="main- mt-5">
                <div className="row">
                    <div className="col-5">
                        <label htmlFor="" className="fs-13">Left Folder</label>
                        <Select options={Session} value={leftFolder} onChange={(t:any)=>{setLeftFolder(t)}} />
                    </div>
                    <div className="col-5">
                        <label htmlFor="" className="fs-13">Right Folder</label>
                        <Select options={Session} value={rightFolder} onChange={(t:any)=>{setRightFolder(t)}}/>
                    </div>
                    <div className="col">
                        <label htmlFor="" className="d-block">&nbsp;</label>
                        <button type="button" onClick={() => { compare(leftFolder.value, rightFolder.value) }} className="btn btn-outline-primary">Compare</button>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default BeyondCompare


interface ValueLabel {
    value: string
    label: string
}