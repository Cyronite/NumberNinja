import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { throwError } from "rxjs";

function Quiz (props: {attemptsTaken:number, setAttemptsTaken:Dispatch<SetStateAction<number>>, totalAttempts:number, setTotalAttempts:Dispatch<SetStateAction<number>>, correct:number, setCorrect:Dispatch<SetStateAction<number>>, playing:boolean, setPlaying: Dispatch<SetStateAction<boolean>>,clicked:boolean, setClicked:Dispatch<SetStateAction<boolean>>, mode:string, generate:boolean, setGenerate:Dispatch<SetStateAction<boolean>>, setPoints:Dispatch<SetStateAction<number[][]>>}){
    const [answerOptions, setAnswerOptions] = useState<number[][][]>([]);
    const [correctIndex, setCorrectIndex] = useState(0);

    // calculates the greatest common divisor
    function gcd(a:number, b:number): number{
        let remainder = a % b;
        if (b==0){return a }
        return gcd(b, remainder)
    }

    // simplifys a fraction
    function simplifyFraction(numerator:number, denominator:number): [number,number] {
        const commonDivisor = gcd(numerator, denominator);
        if(commonDivisor == 1){
            return [numerator, denominator];
        } else{
            return [(numerator/ commonDivisor), (denominator / commonDivisor)];
        }   
    }

    //generates a random point based on difficulty
    function generateRandomPoint(){
        if(props.mode == "Easy"){
            //Generates a random whole number from -10 to 10
            return [Math.floor(Math.random() * 21) - 10, Math.floor(Math.random() * 21) - 10];
        }
        else if (props.mode == "Medium"){
            //Generates a random number on a 0.5 from -10 to 10 
            return [(Math.floor(Math.random() * 21 - 10) * 2 + 1) / 2, (Math.floor(Math.random() * 21 - 10) * 2 + 1) / 2];
        }
        else if (props.mode == "Hard"){
            //Generates a random number on a 0.5 from -20 to 20 
            return [(Math.floor(Math.random() * 81) / 2) - 20,(Math.floor(Math.random() * 81) / 2) - 20];
        }
        else{
            throw new Error("Mode is not equal to Easy, Medium or Hard")
        }
    }

    //generates a random ratio based on difficulty
    function generateRatio(){
        if(props.mode == "Easy"){
            // Generates a numerator between 1 and 5
            const numeratorEasy = Math.floor(Math.random() * 5) + 1;
            // Generates a denominator between 2 and 9 
            const denominatorEasy = Math.floor(Math.random() * 8) + 2; 
            return simplifyFraction(numeratorEasy, denominatorEasy);
        }
        else if(props.mode == "Medium"){
            // Generates a numerator between 1 and 10
            const numeratorMedium = Math.floor(Math.random() * 10) + 1; 
            // Generates a denominator between 10 and 20
            const denominatorMedium = Math.floor(Math.random() * (20 - 10 + 1)) + 10; 
            return simplifyFraction(numeratorMedium, denominatorMedium);
        }
        else if(props.mode == "Hard"){
            // Generates a numerator between 1 and 20
            const numeratorHard = Math.floor(Math.random() * 10) + 1; 
            // Generates a denominator between 20 and 30
            const denominatorHard = Math.floor(Math.random() * (30 - 20 + 1)) + 20; 
            return simplifyFraction(numeratorHard, denominatorHard);
        }
        else{
            throw new Error("Mode is not equal to Easy, Medium or Hard")
            
        }
    }

    // Function to shuffle an array of numbers
    function shuffle(array: number[][][]) {
        // Iterate backwards through the array
        for (let i = array.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i (inclusive)
            const j = Math.floor(Math.random() * (i + 1));
            // Swap the current element with a randomly selected element
            [array[i], array[j]] = [array[j], array[i]];
            
        }
        return array;
    }

    // generate answers
    function generateAnswers (ratio:number[], pointOne:number[],pointTwo:number[]){
        //define variables
        let m = ratio[0];
        let n = ratio[1];
        let x1 = pointOne[0];
        let y1 = pointOne[1];
        let x2 = pointTwo[0];
        let y2 = pointTwo[1];

        //calculate correct answers
        let xNumerator = x1 * n + x2 * m;
        let xDenominator = m + n;
        let yNumerator = y1 * n + y2 * m;
        let yDenominator = m + n;
        
        //simplify correct answers
        let correctX = simplifyFraction(xNumerator, xDenominator);
        let correctY = simplifyFraction(yNumerator, yDenominator);

        //set sumplified answers original variables
        xNumerator = correctX[0];
        xDenominator = correctX[1];
        yNumerator = correctY[0];
        yDenominator = correctY[1];

        //come up with multiple choice answers
        let optionOne = [[xNumerator , xDenominator],[yNumerator , yDenominator]];
        let optionTwo = [[yDenominator , xNumerator,],[xDenominator , yNumerator]];
        let optionThree = [[yNumerator , yDenominator],[xNumerator , xDenominator]];
        let optionFour = [[xDenominator , yNumerator],[yDenominator , xNumerator]];
        // assighn options to an array 
        let ans = [optionOne, optionTwo, optionThree, optionFour];
        
        //shuffle answers
        ans = shuffle(ans);

        //save correct answer (option one is always the right answer)
        for(let i = 0; i < ans.length; i++){
            if(ans[i] == optionOne){
                    setCorrectIndex(i);
                    console.log(i);
            }
        }
        
        return ans;
    }

    // generates question and graphs it when ever generate is equl to true
    useEffect(()=>{
        if(props.generate == true){
            if (props.attemptsTaken  < props.totalAttempts){
                //generate the question
                let pointOne = generateRandomPoint();
                let pointTwo = generateRandomPoint();
                const ratio = generateRatio();

                //make it dosnt generate a perfect line
                while(pointOne[0] === pointTwo[0] || pointOne[1] === pointTwo[1]){
                    pointTwo = generateRandomPoint();
                }
                
                //generate points and save it
                setAnswerOptions(generateAnswers(ratio, pointOne, pointTwo));
                props.setPoints([pointOne, pointTwo])

                props.setGenerate(false)
            }else{
                props.setPoints([[ ],[ ]])
            }
        }
    }, [props.generate])

    function handleClick(index:number){  
        if (props.attemptsTaken  < props.totalAttempts){
            props.setClicked(true);
            
                if(index == correctIndex){
                props.setCorrect(props.correct + 1);
                }
            
            
        }
    }

    return(
        <div className="flex justify-center">
            <div className="w-[80vw] flex justify-evenly items-center h-[15vh]">
                <div>Select Choice :</div>
                {answerOptions.map((option: number[][], index: number) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className="cursor-pointer hover:underline hover:bg-[#2f71dcaf] px-4 py-2 w-44 text-center rounded-md bg-[#2F72DC] text-white font-bree text-lg"
                    >
                        {`(${option[0][0]}${option[0][1] !== 1 ? `/${option[0][1]}` : ''}, ${option[1][0]}${option[1][1] !== 1 ? `/${option[1][1]}` : ''})`}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default Quiz;