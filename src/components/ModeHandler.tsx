import { useState, useEffect } from "react";
function ModeHandler(props:{ setPoints: (value: React.SetStateAction<number[][]>) => void, started:boolean, setStarted: (value: React.SetStateAction<boolean>) => void , totalAttempts: number, setCorrect: (value: React.SetStateAction<number>) => void, attemptsTaken: number, setAttemptsTaken: (value: React.SetStateAction<number>) => void, clicked: boolean,setClicked: (value: React.SetStateAction<boolean>) => void, setGenerate: (value: React.SetStateAction<boolean>) => void, setPlaying: (value: React.SetStateAction<boolean>) => void, mode: string, correct: number, setTotalAttempts: (value: React.SetStateAction<number>) => void}){
    
  

    function handleClick(){
        props.setPlaying(true)
        props.setGenerate(true)
        props.setStarted(true)
        if (props.mode === "10 Questions") {
            props.setTotalAttempts(10);
          } else if (props.mode === "5 Questions") {
            props.setTotalAttempts(1);}
    }
      function reset(){ 
        console.warn("reset")
        props.setStarted(false);
        props.setPlaying(false)
        props.setCorrect(0)
        props.setAttemptsTaken(0)
        props.setTotalAttempts(0);
        props.setAttemptsTaken(0); 
        props.setPoints([[],[]])  
    }
    useEffect(() => {
        if (props.clicked){ 
            setTimeout(()=>{
                props.setAttemptsTaken((prevAttempts) => prevAttempts + 1);   
                props.setClicked(false);
            },1000)
        }   
            
            
        
    },[props.clicked,])



    useEffect(()=>{
        setTimeout(()=>{
            
           
            if (props.attemptsTaken == props.totalAttempts) {reset()}else{
                props.setGenerate(true);
                
            }
        },1000)
    },[ props.attemptsTaken])
    return(
        <div>
            { !props.started && <button onClick={handleClick} className="font-bree text-lg py-2 px-4 rounded-md bg-green-500">Start</button>}
            { props.started && <div className="font-bree text-3xl">score : {props.correct}/{props.attemptsTaken}</div>}
        </div>
    )
}
export default ModeHandler