import React, {useState} from "react";
import {Countdown} from "./Countdown";
import {Button, TextField} from "@mui/material";

export const Admin = ({targetTime, startTime, updateTime}: {targetTime: Date, startTime: Date, updateTime: (time: number, startTime?: number) => void}) => {
    const [minutes, setMinutes] = useState<string>("");
    const [seconds, setSeconds] = useState<string>("");
    const [pauseTime, setPauseTime] = useState<number>();

    const handleNumberTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFunc: any) => {
        const str = e.target.value;

        setFunc(str)
    }

    return (
        <>
            <Countdown timeToTarget={targetTime} startTime={startTime}/>
            <div>
                <TextField label={"Add Minutes"} value={minutes} onChange={(e) => handleNumberTextFieldChange(e, setMinutes)} />
                <TextField label={"Add Seconds"} value={seconds} onChange={(e) => handleNumberTextFieldChange(e, setSeconds)} />

                <Button onClick={() => {
                    if (seconds && minutes) {
                        const currentTime = Date.now()

                        const parsedMins = parseInt(minutes)
                        const parseSecs = parseInt(seconds)
                        updateTime(parseSecs * 1000 + parsedMins * 60000 + currentTime);
                    }
                }}>
                    Set Time
                </Button>
                <Button onClick={() => {
                    if (seconds && minutes) {
                        const parsedMins = parseInt(minutes)
                        const parseSecs = parseInt(seconds)
                        updateTime(parseSecs * 1000 + parsedMins * 60000 + targetTime.getTime(), startTime.getTime());
                    }
                }}>
                    Add Time
                </Button>
                <Button onClick={() => {
                    if (seconds && minutes) {
                        const parsedMins = parseInt(minutes)
                        const parseSecs = parseInt(seconds)
                        updateTime(targetTime.getTime() - (parseSecs * 1000 + parsedMins * 60000), startTime.getTime());
                    }
                }}>
                    Remove Time
                </Button>
                <Button onClick={() => {
                    if (pauseTime) {

                    } else {
                        setPauseTime(Date.now())
                    }
                }}>
                    {pauseTime ? 'Unpause' : 'Pause'}
                </Button>
            </div>
        </>
    )
}
