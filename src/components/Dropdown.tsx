import { useState } from "react";

function Dropdown(props:{playing:boolean, options:string[], option:string, setOption: React.Dispatch<React.SetStateAction<string>> }) {
    // State variables
    const [isOpen, setIsOpen] = useState(false); // Status of weather the options are open or not
    const [selectedLevel, setSelectedLevel] = useState(props.option); // used to set the name to the dropdown once selected
    
    // Toggles the visibility of the dropdown
    function handleClick() {
        setIsOpen(!isOpen);
    }

    // handles when the dropdown is clicked
    function handleSelect(option:string) {
        props.setOption(option); // declares the current choice so it can be used in other components
        setSelectedLevel(option); // Updates the name of the button 
        setIsOpen(false);// Closes the dropdown after selection
    }

    //returns the button and the dropdown menu 
    return (
        <div className="z-50">
            {!props.playing && <button onClick={handleClick} className="text-white font-bree text-2xl bg-[#2F72DC] w-[170px] py-2 px-4 rounded-md shadow-xl z-0">
                {selectedLevel}
            </button>}
            <div className = "">
                {!props.playing && isOpen && ( <ul className="mt-2 rounded-sm bg-white drop-shadow-2xl absolute w-[150px] z-10 ">
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
