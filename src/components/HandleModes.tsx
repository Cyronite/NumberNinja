import { useState, useEffect } from "react";

function HandleModes(props: {
  correct: number;
  attemptsTaken: number;
  setAttemptsTaken: (value: React.SetStateAction<number>) => void;
  totalAttempts: number;
  setTotalAttempts: (value: React.SetStateAction<number>) => void;
  mode: string;
  clicked: boolean;
  setClicked: (value: React.SetStateAction<boolean>) => void;
  setGenerate: (value: React.SetStateAction<boolean>) => void;
}) {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // State to hold interval ID
const [finished, setFinished] = useState(false);
  // Function to update the timer
  function updateTimer() {
    if(finished != true){
        setSeconds((prevSeconds) => {
        let newSeconds = prevSeconds + 1;
        if (newSeconds >= 60) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            newSeconds = 0;
        }
        return newSeconds;
        });
    }
  }

  // Function to start the timer
  function startTimer(maxMilliseconds: number) {
    if (intervalId) {
      clearInterval(intervalId); // Clear any existing interval
    }
    setSeconds(0);
    setMinutes(0);
    const id = setInterval(updateTimer, 1000); // Start a new interval
    setIntervalId(id);
    setTimeout(() => {
    clearInterval(id); // Stop the timer after maxMilliseconds
    console.log("timer")
      
     
    }, maxMilliseconds);
  }

  // Function to handle click event
  function handleClick() {
    setStarted(true);
    props.setGenerate(true);
    if (props.mode === "10 Questions") {
      props.setTotalAttempts(10);
    } else if (props.mode === "5 Questions") {
      props.setTotalAttempts(5);
    } else if (props.mode === "1-Minute Timed") {
      props.setTotalAttempts(1);
      startTimer(60000); // Start timer for 1 minute (60000 milliseconds)
    } else if (props.mode === "2-Minutes Timed") {
      props.setTotalAttempts(1);
      startTimer(120000); // Start timer for 2 minutes (120000 milliseconds)
    }
  }

  // useEffect to handle attempts
  useEffect(() => {
    if (props.clicked) {
    setFinished(true)
      props.setAttemptsTaken((prevAttempts) => prevAttempts + 1);
      setTimeout(() => {
        props.setGenerate(true);
        props.setClicked(false);
      }, 1000);
    }
  }, [props.clicked]);

  return (
    <div>
      {!started && (
        <button onClick={handleClick}>
          Start
        </button>
      )}
      {started && !props.mode.includes("Timed") && (
        <div>{props.correct}/{props.attemptsTaken}</div>
      )}
      {started && !finished && props.mode.includes("Timed") && <div>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>}
    </div>
  );
}

export default HandleModes;
