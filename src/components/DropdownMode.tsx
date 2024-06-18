import { useState } from "react";


function DropdownMode(){
    const options = ["1-Minute Timed", "2-Minute Timed", "10 Questions", "5 Questions"];
    const [status, setStatus] = useState(false);
    const [buttonText, setButtonText] = useState("Select Mode");

    function handleClick() {
        setStatus(!status);
    }

    function handleSelect(option:string) {
        setButtonText(option);
        setStatus(false);
    }

    return (
        <div className="ml-[30px]">
            <button onClick={handleClick} className="font-bree text-xl bg-[#2F72DC] py-2 px-4 w-[175px] rounded-sm shadow-xl">
                {buttonText}
            </button>
            <div>
                {status && (
                    <ul className="mt-2 rounded-sm bg-white drop-shadow-2xl absolute w-[175px]  z-10">
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

export default DropdownMode;
