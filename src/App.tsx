import React, {useMemo} from 'react';
import './App.css';
import { useCurrentTime } from "./hooks/useCurrentTime";
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {Countdown} from "./components/Countdown";
import {Admin} from "./components/Admin";

function App() {
  const { currentTime, updateTime, startTime} = useCurrentTime()

  const [targetTime, startTimeDate] = useMemo(() => {
      const date = new Date()
      const startDate = new Date()

      if (currentTime) {
          date.setTime(currentTime)
      }

      if (startTime) {
          startDate.setTime(startTime)
      }

      return [date, startDate]
  }, [currentTime, startTime])

  return (
    <div className="App">
        <div>
            Tada!
        </div>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Countdown timeToTarget={targetTime} startTime={startTimeDate}/>} />
                <Route path="/admin" element={<Admin targetTime={targetTime} updateTime={updateTime} startTime={startTimeDate} />} />
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
