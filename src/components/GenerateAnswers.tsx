import { useState, useEffect } from "react";

function GenerateAnswers(props: { data:string, setPoints: React.Dispatch<React.SetStateAction<number[][]>>}){
    
    const [answerOptions, setAnswerOptions] = useState<number[][][]>([]);
    const [correctIndex, setCorrectIndex] = useState<number | null>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [generate, setGenerate] = useState(false);

    function gcd(a:number, b:number): number{
        return b === 0 ? a : gcd(b, a % b);
    }
    
    function simplifyFraction(numerator:number, denominator:number): [number,number] {
        const commonDivisor = gcd(numerator, denominator);
        if(commonDivisor == 1){
            return [numerator, denominator]
        } else{
            return [numerator/ commonDivisor, denominator / commonDivisor];
        }   
    }
    
    function generateRandomPoint() {
        switch (props.data) {
            case "Easy":
            case "Medium":
                return [Math.floor(Math.random() * 21) - 10, Math.floor(Math.random() * 21) - 10];
            case "Hard":
                return [(Math.floor(Math.random() * 21 - 10) * 2 + 1) / 2,(Math.floor(Math.random() * 21 - 10) * 2 + 1) / 2];
            default:
                return [0,0]
        }  
    }

    function GenerateRatio(){
        switch(props.data){
            case "Easy":
                const numeratorEasy = Math.floor(Math.random() * 5) + 1; 
                const denominatorEasy = Math.floor(Math.random() * 8) + 2; 
                return simplifyFraction(numeratorEasy, denominatorEasy);
            
            case "Hard":
            case "Medium":
                const numeratorMedium = Math.floor(Math.random() * 10) + 1; 
                const denominatorMedium = Math.floor(Math.random() * (20 - 10 + 1)) + 10; 
                return simplifyFraction(numeratorMedium, denominatorMedium);
            
            default:
                return [0,0]; 
        }
    }
    
    function shuffle(array:number[][][]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            
        }
        return array;
    }
    
    function answers (ratio:number[], pointOne:number[],pointTwo:number[]){
        let m = ratio[0];
        let n = ratio[1];
        let x1 = pointOne[0];
        let y1 = pointOne[1];
        let x2 = pointTwo[0];
        let y2 = pointTwo[1];

        let xNumerator = x1 * n + x2 * m;
        let xDenominator = m + n;
        let yNumerator = y1 * n + y2 * m;
        let yDenominator = m + n;
        
        let correctX = simplifyFraction(xNumerator, xDenominator);
        let correctY = simplifyFraction(yNumerator, yDenominator);

        xNumerator = correctX[0]
        xDenominator = correctX[1]
        yNumerator = correctY[0]
        yDenominator = correctY[1]

        let optionOne = [[xNumerator , xDenominator],[yNumerator , yDenominator]]
        let optionTwo = [[yDenominator , xNumerator,],[xDenominator , yNumerator]]
        let optionThree = [[yNumerator , yDenominator],[xNumerator , xDenominator]]
        let optionFour = [[xDenominator , yNumerator],[yDenominator , xNumerator]]
        
        let ans = [optionOne, optionTwo, optionThree, optionFour]
        ans = shuffle(ans)

        for(let i = 0; i < 4; i++){
            if(ans[i] == optionOne){
                setCorrectIndex(i)
                console.log(i)
            }
        }
        
        return ans
    }
    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }
    async function handleSelect( index:number) {
        setIsClicked(true)
        await timeout(1000);
        setGenerate(true)

        if(index == correctIndex){
            console.log("correct")
        }
        else{
            console.log("incorrect")
        }
        
    }

    useEffect(() => {
        console.log(isClicked)
        console.log(generate)
        let pointone = generateRandomPoint();
        let pointtwo = generateRandomPoint();
        const ratio = GenerateRatio();

        while (pointone[0] === pointtwo[0] || pointone[1] === pointtwo[1]) {
          pointtwo = generateRandomPoint();
        }
        
        props.setPoints([pointone, pointtwo]);
        let ans = answers(ratio, pointone, pointtwo);
        setAnswerOptions(ans);
       
        setIsClicked(false)
        setGenerate(false)
    }, [props.data,generate]);
      
    return(
        <div className="h-[10vh] flex justify-center items-center">
            <div className="flex justify-center items-center">
                <div  className="w-[80vw] flex  justify-center gap-10">

                    {answerOptions.map((option: number[][], index: number) => (
                    <div
                        key={index}
                        onClick={() => (handleSelect( index))}
                        className={`${isClicked === false 
                            ? "cursor-pointer hover:underline hover:bg-slate-100" 
                            : (index === correctIndex 
                            ? "bg-green-600" 
                            : "bg-red-600")} 
                            px-4 py-2 w-44 text-center rounded-md`}
                    >   
                        {`(${option[0][0]}${option[0][1] != 1 ? `/${option[0][1]}`: ''}, ${option[1][0]}${option[1][1] != 1 ? `/${option[1][1]}`: ''})`}
                    </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default GenerateAnswers