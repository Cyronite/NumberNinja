
import Dropdown from "./components/Dropdown";
import Quiz from "./components/Quiz"
import RenderGraph from "./components/RenderGraph";
import { useState} from "react";
import background from "./assets/background.svg"
import Question from "./components/Question";
import ModeHandler from "./components/ModeHandler";
function App (){

  //global usestate variables used by multiple scripts
  const [ratio, setRatio] = useState<number[]>([]) // global variable that represents the current ratio 
  const [playing, setPlaying ] = useState(false); // global varible that is true if we are currently playing
  const [level, setLevel] = useState ("Set Level"); // global variable that represents the level of difficuly that the user is currently in
  const [mode, setMode] = useState("Set Mode"); // global variable that represents the amount of questions that the user chose
  const [points, setPoints] = useState<number[][]>([[], []]); //global variable that represents the current set of points
  const [generate, setGenerate] = useState(false); // global used to generate more points when set to true
  const [clicked , setClicked] = useState(false); // global variable that is set to true when a multiple choice is clicked on
  const [correct, setCorrect] = useState(0); //  global varible that represents the amount of questions the user got correct
  const [attemptsTaken, setAttemptsTaken] = useState(0); // global variable that represents the amount of attempts the user as taken
  const [totalAttempts, setTotalAttempts] = useState (0); // global varible that represents the total amount of attemts the use chose
  const [started, setStarted] = useState(false); // global varible that is set to true when the user starts a "quiz"
  
  //returns the components to be displayed to the screen with additional css to style it
  return (
    <div className="">
      <img src={background} className="h-[100vh] w-[100vw]  object-cover  overflow-hidden bg-black absolute -z-1"/>
      <div className="max-md:bg-black flex justify-center max-xl:items-center max-xl:flex-col w-full ">
        <div id="left Side" className="max-xl:w-[90vw] flex flex-col justify-between w-[45vw] py-[5vh] ">
          <div id="top" className=" flex w-full items-top justify-between px-16 gap-8 h-min  max-xl:flex-col-reverse">
            <div className="max-sm:w- flex gap-8 z-20 max-xl:justify-center">
              <Dropdown playing={playing} options={["Easy", "Medium", "Hard"]} option={level} setOption={setLevel }/> 
              <Dropdown playing={playing} options={["1 Question", "5 Questions", "10 Questions", "15 Questions"]} option={mode} setOption={setMode}/>    
            </div>
            <div className="z-20 flex max-xl:justify-center">
              <ModeHandler level={level} setPoints={setPoints} started={started} setStarted={setStarted} totalAttempts={totalAttempts} setCorrect={setCorrect} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} clicked={clicked} setClicked={setClicked} setGenerate={setGenerate} setPlaying={setPlaying} mode={mode} correct={correct} setTotalAttempts={setTotalAttempts}/>
            </div>
          </div>
          <div id="middle" className="z-0">
            <Question attemptsTaken={attemptsTaken} totalAttempts={totalAttempts} ratio={ratio} points={points} />
          </div>
          <div id="bottom" className=" z-20">
            <Quiz setRatio={setRatio} started={started} attemptsTaken={attemptsTaken} setAttemptsTaken={setAttemptsTaken} totalAttempts={totalAttempts}  setTotalAttempts={setTotalAttempts} correct={correct} setCorrect={setCorrect} playing={playing} setPlaying={setPlaying} clicked={clicked} setClicked={setClicked} mode={level} generate={generate} setGenerate={setGenerate} setPoints={setPoints}/> 
          </div>
        </div>
        <div id="right Side" className="max-xl:w-[100vw]">
          <RenderGraph points={points}/>
        </div>
      </div>
    </div>
    )
}
export default App
