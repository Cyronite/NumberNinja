
import Dropdown from "./components/Dropdown";
import Quiz from "./components/Quiz"
import RenderGraph from "./components/RenderGraph";
import { useState} from "react";
import Question from "./components/Question";
import ModeHandler from "./components/ModeHandler";
function App() {
  const [ratio, setRatio] = useState<number[]>([])
  const [playing, setPlaying ] = useState(false);
  const [level, setLevel] = useState ("Set Level");
  const [mode, setMode] = useState("Set Mode");
  const [points, setPoints] = useState<number[][]>([[], []]);
  const [generate, setGenerate] = useState(false);
  const [clicked , setClicked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [attemptsTaken, setAttemptsTaken] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState (0);
  const [started, setStarted] = useState(false);
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex items-start justify-between h-[10vh] w-[70vw]">
          <div className="flex justify-center items-center h-full gap-12">
            <Dropdown playing={playing} options={["Easy", "Medium", "Hard"]} option={level} setOption={setLevel  }/> 
            <Dropdown playing={playing} options={["1 Question", "5 Questions", "10 Questions", "15 Questions"]}  option={mode} setOption={setMode}/>  
          </div>
          <div className="flex justify-center items-center h-full">
            <ModeHandler level={level} setPoints={setPoints} started={started} setStarted={setStarted} totalAttempts={totalAttempts} setCorrect={setCorrect} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} clicked={clicked} setClicked={setClicked} setGenerate={setGenerate} setPlaying={setPlaying} mode={mode} correct={correct} setTotalAttempts={setTotalAttempts}/>
          </div>
        </div> 
      </div> 
      <div>
        <Question attemptsTaken={attemptsTaken} totalAttempts={totalAttempts} ratio={ratio} points={points} />
      </div>
      <div>
        <RenderGraph points={points}/>
      </div>
      <div>
        <Quiz setRatio={setRatio} started={started} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} totalAttempts={totalAttempts}  setTotalAttempts={setTotalAttempts} correct={correct} setCorrect={setCorrect} playing={playing} setPlaying={setPlaying} clicked={clicked} setClicked={setClicked} mode={level} generate={generate} setGenerate={setGenerate} setPoints={setPoints}/> 
      </div>
       
          {/* 
      
      
   
        
         */}
     
    </div>
   

  );
}

export default App
