import React from "react";
import {Countdown} from "./Countdown";
import qrCode from "../files/qrcode.png"

export const Share = ({targetTime, startTime}: {targetTime: Date, startTime: Date}) => {
    return (
        <>
            <Countdown timeToTarget={targetTime} startTime={startTime}/>
            <img src={qrCode} alt={qrCode} style={{position: "absolute", width: '20%', height: '20%', top: '5%', right: '5%'}}/>
        </>
    )
}
