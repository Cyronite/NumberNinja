
import Dropdown from "./components/Dropdown";
import Quiz from "./components/Quiz"
import RenderGraph from "./components/RenderGraph";
import { useState} from "react";
import Logo from "./assets/Logo.svg"
import ModeHandler from "./components/ModeHandler";
function App() {
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
    
    <div className="flex max-lg:flex-col-reverse">
      <div className="flex flex-col">
        <div className="w-[40vw] py-[10vh] flex justify-evenly">
          <Dropdown playing={playing} options={["Easy", "Medium", "Hard"]} option={level} setOption={setLevel  }/> 
          <Dropdown playing={playing} options={["1-Minute Timed", "2-Minute Timed", "10 Questions", "5 Questions"]}  option={mode} setOption={setMode}/>   
          <ModeHandler setPoints={setPoints} started={started} setStarted={setStarted} totalAttempts={totalAttempts} setCorrect={setCorrect} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} clicked={clicked} setClicked={setClicked} setGenerate={setGenerate} setPlaying={setPlaying} mode={mode} correct={correct} setTotalAttempts={setTotalAttempts}/>
        </div>
        <div className="w-[40vw] h-[60vh]">
          <Quiz started={started} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} totalAttempts={totalAttempts}  setTotalAttempts={setTotalAttempts} correct={correct} setCorrect={setCorrect} playing={playing} setPlaying={setPlaying} clicked={clicked} setClicked={setClicked} mode={level} generate={generate} setGenerate={setGenerate} setPoints={setPoints}/> 
        </div>
      </div>
      
      <div className="flex flex-col w-[55vw] justify-start h-[100vh] gap-[5vh] items-center">
        <img src={Logo} className="h-[10vh]"/>
        <RenderGraph points={points}/>
      </div>
    </div>

  );
}

export default App
