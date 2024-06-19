
import Dropdown from "./components/Dropdown";
import Quiz from "./components/Quiz"
import RenderGraph from "./components/RenderGraph";
import HandleModes from "./components/HandleModes";
import { useState} from "react";

function App() {
  const [playing, setPlaying] = useState(false);
  const [level, setLevel] = useState ("Set Level");
  const [mode, setMode] = useState("Set Mode");
  const [points, setPoints] = useState<number[][]>([[], []]);
  const [generate, setGenerate] = useState(false);
  const [clicked , setClicked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [attemptsTaken, setAttemptsTaken] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState (0);
  
  return (
    <>
      <RenderGraph points={points}/>
      <div className = "flex justify-center items-center h-[5vh]">
        <div className =" flex w-[80vw] justify-between">
          <div className =" flex items-center gap-10"> 
            <Dropdown options={["Easy", "Medium", "Hard"]} option={level} setOption={setLevel  }/> 
            <Dropdown options={["1-Minute Timed", "2-Minute Timed", "10 Questions", "5 Questions"]}  option={mode} setOption={setMode}/>   
          </div>
          <div>
            <HandleModes correct={correct} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} totalAttempts={totalAttempts}  setTotalAttempts={setTotalAttempts} mode={mode} clicked={clicked} setClicked={setClicked} setGenerate={setGenerate}/>
          </div>
        </div>
      </div>
        
       
     
        <Quiz attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} totalAttempts={totalAttempts}  setTotalAttempts={setTotalAttempts} correct={correct} setCorrect={setCorrect} playing={playing} setPlaying={setPlaying} clicked={clicked} setClicked={setClicked} mode={level} generate={generate} setGenerate={setGenerate} setPoints={setPoints}/>
    </>
  );
}

export default App;
