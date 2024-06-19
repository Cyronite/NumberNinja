import { useState, useEffect } from "react";

function HandleModes(props: {
  playing:boolean
  setPlaying: (value: React.SetStateAction<boolean>) => void;
  setPoints:(value: React.SetStateAction<number[][]>)=> void;
  setCorrect: (value: React.SetStateAction<number>) => void;
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

  function handleClick() {
    setStarted(true);
    props.setGenerate(true);
    props.setPlaying(true)
    if (props.mode === "10 Questions") {
      props.setTotalAttempts(10);
    } else if (props.mode === "5 Questions") {
      props.setTotalAttempts(5);}
    
  }

  useEffect(() => {
    if (props.clicked) {
      
      reset()
     
      setTimeout(() => {
        props.setAttemptsTaken((prevAttempts) => prevAttempts + 1); 
        props.setGenerate(true);
        props.setClicked(false);
      }, 1000);
     
    }
  }, [props.clicked]);
  
  function reset(){ 
      setTimeout(() => {
        
      if (props.attemptsTaken == props.totalAttempts) {
        console.warn("reset")
        setStarted(false);
        props.setPlaying(false)
        props.setCorrect(0)
        props.setAttemptsTaken(0)
        props.setTotalAttempts(0);
        props.setAttemptsTaken(0); 
      }
    }, 1000);
  }

  return (
    <div>
     
      <div></div>
      {!started && (
        <button className="font-bree text-lg py-2 px-4 rounded-md bg-green-500" onClick={handleClick}>
          
          Start
        </button>
      )}
      {started && (
        <div className="font-bree text-3xl">score : {props.correct}/{props.attemptsTaken}</div>
      )}

    </div>
  );

}
export default HandleModes;
