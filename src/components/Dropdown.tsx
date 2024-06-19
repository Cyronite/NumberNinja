import { useState } from "react";

function Dropdown(props: {options:string[], option:string, setOption: React.Dispatch<React.SetStateAction<string>> }) {
    // State variables
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(props.option);
    
    // Toggles the visibility of the dropdown
    function handleClick() {
        setIsOpen(!isOpen);
    }

    // Handles selection
    function handleSelect(option:string) {
        props.setOption(option); // declares the current choice so it can be used in other components
        setSelectedLevel(option); // Updates the name of the button 
        setIsOpen(false);// Closes the dropdown after selection
    }

    return (
        <div>
            <button onClick={handleClick} className="text-white font-bree text-xl bg-[#2F72DC] w-[150px] py-2 px-4 rounded-md shadow-xl">
                {selectedLevel}
            </button>
            <div className = "">
                {isOpen && ( <ul className="mt-2 rounded-sm bg-white drop-shadow-2xl absolute w-[150px] z-10">
                    {props.options.map((option) => (

                        <li key={option}
                            onClick={() => handleSelect(option)}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        >
                        {option}
                        </li>))}
                </ul>)}
            </div>
        </div>
    );
}

export default Dropdown;
