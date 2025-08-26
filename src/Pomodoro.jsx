import {useState, useEffect} from 'react';
import "./index.css";

function Pomodoro() {
    const buttonSound = new Audio(process.env.PUBLIC_URL + "/switch-button-106349.mp3");
    const doneSound = new Audio(process.env.PUBLIC_URL + "/din-ding-89718.mp3");
    doneSound.volume = 0.5; 

    // Play sound only if not muted
    function playButtonSound() {
        if (!muted) {
            buttonSound.currentTime = 0;
            buttonSound.play();
        }
    }
    function playDoneSound() {
        if (!muted) {
            doneSound.currentTime = 0;
            doneSound.play();
        }
    }
    //for testing
    const breakTime = 4 * 1000;
    const workTime = 6 * 1000;

    // const breakTime = 5 * 60 * 1000;
    // const workTime = 25 * 60 * 1000;

    const [inBreak, setInBreak] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(workTime);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [muted, setMuted] = useState(false);
    useEffect(() => {

        document.body.style.backgroundColor = inBreak ? '#b2f2bb' : '#ffb3b3';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [inBreak]);
    useEffect(() => {
        if (time > 0 && isRunning) {
            const interval = setInterval(() => {
                setTime(time - 1000);
            }, 1000);
            return () => clearInterval(interval);
        } else if (time <= 0 && isRunning) { //when timer reaches 0
            playDoneSound();
            if (!inBreak) {
                setPomodoroCount(pomodoroCount + 1);
            }
            setInBreak(!inBreak);
            setTime(inBreak ? workTime : breakTime);
            stopTimer(false);
        }
    }, [time, isRunning]);

    function formatTime(milliseconds){ //format into hh:mm:ss
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        let formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        return formatted;

    }
    function startTimer() {
        playButtonSound();
        setIsRunning(true);
    }
    function stopTimer(playSound = true) {
        if (playSound) {
            playButtonSound();
        }
        setIsRunning(false);
    }
    function resetTimer(playSound = true) {
        if (playSound) {
            playButtonSound();
        }
        setIsRunning(false);
        setTime(inBreak ? breakTime : workTime);
    }
    function tomatoes(){
        let output = [];
        for (let i = 0; i < pomodoroCount; i++) {
            output.push("🍅");
        }
        return output;
    }
    return(
        <div className="pomodoro-container">
            <h1>Pomodoro Timer</h1>
            <div className="timer-title">{formatTime(time)}</div>
            <div className="pomodoro-btns">
                <button className="start" onClick={startTimer}>Start</button>
                <button className="stop" onClick={stopTimer}>Stop</button>
                <button className="reset" onClick={resetTimer}>Reset</button>
            </div>
            <div className = "tomatoesAndMute">
                {/* <div className="pomodoro-count">Completed: {pomodoroCount}</div> */}
                <div className = "tomatoes">Completed: {tomatoes()}</div>
                <button className={`mute${muted ? ' muted' : ''}`} onClick={() => setMuted(!muted)}
                    title={muted ? 'Unmute' : 'Mute'}>
                    {muted ? "🔇" : "🔊"}
                </button>
            </div>
            
        </div>
    );
    

}

export default Pomodoro;