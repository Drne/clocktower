import { io } from "socket.io-client"
import {useCallback, useEffect, useState} from "react";

export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState<number>();
    const [startTime, setCurrentStartTime] = useState<number>();
    const [socket, setSocket] = useState<any>();

    const wsUrl = 'https://bloodtimer.drewcolgin.repl.co'

    useEffect(() => {
        setSocket(() => {
            const sock = io(wsUrl)

            sock.on("currentTargetTime", ({targetTime, currentTime}: {targetTime: number, currentTime: number}) => {
                setCurrentTime(targetTime)
                setCurrentStartTime(currentTime)
            })

            setSocket(sock)
        })

    }, [])

    const updateTime = useCallback((time: number, startTime?: number) => {
        socket.emit("newTime", {targetTime: time, startTime})
    }, [socket])

    return { currentTime, updateTime, startTime };
}
