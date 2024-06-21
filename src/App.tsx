
import Dropdown from "./components/Dropdown";
import Quiz from "./components/Quiz"
import RenderGraph from "./components/RenderGraph";
import { useState} from "react";
import background from "./assets/background.svg"
import Question from "./components/Question";
import ModeHandler from "./components/ModeHandler";
function App (){
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
    <div className="">
      <img src={background} className="h-[100vh] w-[100vw] bg-black absolute -z-1"/>
      <div className="flex justify-between">
        <div id="left Side" className="flex flex-col justify-between w-full py-[5vh] z-50">
          <div id="top" className="flex w-full items-top justify-between px-16 gap-8 h-min  z-50">
            <div className=" flex gap-8 z-50">
              <Dropdown playing={playing} options={["Easy", "Medium", "Hard"]} option={level} setOption={setLevel  }/> 
              <Dropdown playing={playing} options={["1 Question", "5 Questions", "10 Questions", "15 Questions"]}  option={mode} setOption={setMode}/>    
            </div>
            <div className="z-50">
              <ModeHandler level={level} setPoints={setPoints} started={started} setStarted={setStarted} totalAttempts={totalAttempts} setCorrect={setCorrect} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} clicked={clicked} setClicked={setClicked} setGenerate={setGenerate} setPlaying={setPlaying} mode={mode} correct={correct} setTotalAttempts={setTotalAttempts}/>
            </div>
          </div>
          <div id="middle" className=" z-50">
            <Question attemptsTaken={attemptsTaken} totalAttempts={totalAttempts} ratio={ratio} points={points} />
          </div>
          <div id="bottom" className=" z-50">
            <Quiz setRatio={setRatio} started={started} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} totalAttempts={totalAttempts}  setTotalAttempts={setTotalAttempts} correct={correct} setCorrect={setCorrect} playing={playing} setPlaying={setPlaying} clicked={clicked} setClicked={setClicked} mode={level} generate={generate} setGenerate={setGenerate} setPoints={setPoints}/> 
          </div>
        </div>
        <div id="right Side" className="">
          <RenderGraph points={points}/>
        </div>
      </div>
    </div>
    )
}
export default App
