import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import React, {useCallback, useState} from "react";
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import 'react-circular-progressbar/dist/styles.css';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import clock from '../files/clock.png';
import demonHead from '../files/demon-head.png';

export const Countdown = ({timeToTarget, startTime}: {timeToTarget: Date, startTime: Date}) => {
    const [percentage, setPercentage] = useState(100);

    const callback = useCallback(() => {
        const percentage = (Date.now() - startTime.getTime()) / (timeToTarget.getTime() - startTime.getTime())
        setPercentage(percentage * 100)
    }, [startTime, timeToTarget])

    return (
        <div style={{position: 'relative', height: '100vh', width: '100vh', margin: 'auto'}}>
            <CircularProgressbarWithChildren value={percentage} styles={
                buildStyles({
                        pathColor: percentage > 99 ? 'red' : 'rgb(136, 8, 8)',
                        strokeLinecap: 'butt',
                    })
                }>
                <img src={clock} alt="clock-face" style={{position: 'absolute', maxWidth: '100%', maxHeight: '100%'}} />
                <FlipClockCountdown to={timeToTarget} renderMap={[false, false, true, true]} onTick={callback}>
                    <img src={demonHead} alt="demon-head" style={{ transition: '1s ease'}}/>
                </FlipClockCountdown>
            </CircularProgressbarWithChildren>
        </div>
    )
}
