import DropdownMode from "./components/DropdownMode";
import DropdownLevel from "./components/DropdownLevel";
import RenderGraph from "./components/RenderGraph";
import GenerateAnswers from "./components/GenerateAnswers";
import ModeHandler from "./components/ModeHandler";
import { useState} from "react";

function App() {
  const [options, setOptions] = useState("Easy");
  const [points, setPoints] = useState<number[][]>([[1, 1], [1, 1]]);
  
  return (
    <><div className="flex justify-center">
      <div className="flex justify-between items-center h-[10vh] w-[80vw]">
        <div className="flex items-center h-[10vh]">
          <DropdownLevel setOption={setOptions} />
          <DropdownMode />
        </div>
        <ModeHandler />
      </div>
      </div>
      <RenderGraph data={options} points={points} />
      <GenerateAnswers data={options} setPoints={setPoints} />)

      
    </>
  );
}

export default App;
