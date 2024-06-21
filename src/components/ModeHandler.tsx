import { useState, useEffect } from "react";
function ModeHandler(props:{ level: string, setPoints: (value: React.SetStateAction<number[][]>) => void, started:boolean, setStarted: (value: React.SetStateAction<boolean>) => void , totalAttempts: number, setCorrect: (value: React.SetStateAction<number>) => void, attemptsTaken: number, setAttemptsTaken: (value: React.SetStateAction<number>) => void, clicked: boolean,setClicked: (value: React.SetStateAction<boolean>) => void, setGenerate: (value: React.SetStateAction<boolean>) => void, setPlaying: (value: React.SetStateAction<boolean>) => void, mode: string, correct: number, setTotalAttempts: (value: React.SetStateAction<number>) => void}){
    
    const [showPopup, setShowPopup] = useState(false);

    function handleClick(){
        if(props.mode != "Set Mode" && props.level != "Set Level"){
            props.setPlaying(true)
            props.setStarted(true)
            props.setGenerate(true)
            if (props.mode === "1 Question") {
                props.setTotalAttempts(1);
            } else if (props.mode === "5 Questions") {
                props.setTotalAttempts(5);
            } else if (props.mode === "10 Questions") {
                props.setTotalAttempts(10);
            } else if (props.mode === "15 Questions") {
                props.setTotalAttempts(15);
            }
        }
    }
      function reset(){

        // Set state variables except attemptsTaken, totalAttempts, correct
        setTimeout(() => {
            props.setStarted(false);
            props.setPlaying(false);
            props.setPoints([[], []]);
        }, 1); // Reset after 1 second

        // Show popup for 1 second
        if(props.attemptsTaken != 0){
            setTimeout(() => {
                setShowPopup(true);
            }, 500);
            setTimeout(() => {
                setShowPopup(false);
                props.setCorrect(0);
                props.setAttemptsTaken(0);
                props.setTotalAttempts(0);
            }, 1500);
        }
    }
    useEffect(() => {
        if (props.clicked){ 
            props.setAttemptsTaken((prevAttempts) => prevAttempts + 1);   
            props.setClicked(false);
        }   
    },[props.clicked])

    useEffect(()=>{ 
        if (props.attemptsTaken >= props.totalAttempts) {
            
            reset()
         
        }
        else{
            setTimeout(()=>{props.setGenerate(true)},500)
            
        }
    },[ props.attemptsTaken])

    return(
        <div>
            <div>  
                {showPopup && (
                    <div className="w-full h-full fixed top-0 left-0 flex items-center bg-black bg-opacity-50 z-10">
                        <div className={` ml-[20vw] bg-white p-10 rounded shadow-lg text-2xl`} >
                            your score is: {props.correct}/{props.attemptsTaken}
                        </div>
                    </div>)}
            </div>
            { !props.started && <button onClick={handleClick} className="font-bree text-2xl py-2 px-4 rounded-md bg-green-500 w-[170px] text-white">Start</button>}
            { props.started && <div className="font-bree text-3xl text-white">score : {props.correct}/{props.attemptsTaken}</div>}
        </div>
    )
}
export default ModeHandler