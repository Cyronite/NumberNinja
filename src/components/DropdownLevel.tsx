import { useState } from "react";

function DropdownLevel(prop: { setOption: React.Dispatch<React.SetStateAction<string>>}){
    const options = ["Easy", "Medium", "Hard"];
    const [status, setStatus] = useState(false);
    const [buttonText, setButtonText] = useState("Select Level");
    
    function handleClick() {
        setStatus(!status);
    }

    function handleSelect(option:string) {
        setButtonText(option);
        setStatus(false);
        prop.setOption(option);
    }

    return (
        <div className="">
            <button onClick={handleClick} className="font-bree text-xl bg-[#2F72DC] w-[150px] py-2 px-4 rounded-sm shadow-xl">
                {buttonText}
            </button>
            <div className = "">
                {status && (
                    <ul className="mt-2 rounded-sm bg-white drop-shadow-2xl absolute w-[150px] z-10">
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleSelect(option)}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
        </div>
    );
}

export default DropdownLevel;
