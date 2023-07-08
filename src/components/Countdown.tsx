import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import React, {useCallback, useState} from "react";
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import 'react-circular-progressbar/dist/styles.css';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import clock from '../files/clock.png';
import demonHead from '../files/demon-head.png';
import minutes from '../files/minutes.png'

export const Countdown = ({timeToTarget, startTime}: {timeToTarget: Date, startTime: Date}) => {
    const [percentage, setPercentage] = useState(100);

    const callback = useCallback(({ completed }: {completed: boolean}) => {
        if (completed) {
            setPercentage(100);
        } else {
            const percentage = (Date.now() - startTime.getTime()) / (timeToTarget.getTime() - startTime.getTime())
            setPercentage(percentage * 100)
        }
    }, [startTime, timeToTarget])

    return (
        <div style={{position: 'relative', maxHeight: '80vh', maxWidth: '80vh', margin: 'auto', padding: '20px'}}>
            <CircularProgressbarWithChildren value={percentage} styles={
                buildStyles({
                        pathColor: percentage > 99 ? 'red' : 'rgb(136, 8, 8)',
                        strokeLinecap: 'butt',
                    })
                }>
                <img src={minutes} alt={'clock-hand'} style={{position: 'absolute', maxWidth: '100%', maxHeight: '100%', zIndex: 20, opacity: percentage > 99 ? '10%' : '70%', transformOrigin: 'bottom', transform: `rotate(${Math.min(Math.max(0, percentage) / 100 * 360, 360)}deg)`, transition: '.5s ease', top: '6%'}}/>
                <img src={clock} alt="clock-face" style={{position: 'absolute', maxWidth: '100%', maxHeight: '100%', zIndex: 25}} />
                <FlipClockCountdown to={timeToTarget} renderMap={[false, false, true, true]} onTick={callback} style={{zIndex: 30}}>
                    <img src={demonHead} alt="demon-head" style={{ maxHeight: '60%', zIndex: 30}}/>
                </FlipClockCountdown>
            </CircularProgressbarWithChildren>
        </div>
    )
}
