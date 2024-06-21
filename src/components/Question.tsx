function Question(props:{points:number[][], ratio:number[], attemptsTaken:number, totalAttempts:number}){

    //only return the question no logic in this file
    return (
        <div className="flex justify-center items-center max-xl:py-24 px-8">
          { (props.attemptsTaken != props.totalAttempts) && <p className="text-white text-center font-bree text-4xl z-20">
            Given that point A =({props.points[0][0]}, {props.points[0][1]}) and point B = ({props.points[1][0]}, {props.points[1][1]}), find the
            coordinates of the division point C = ( x, y), that divides the length from A to B in the ratio R = {props.ratio[0]}:{props.ratio[1]}.
          </p>}

          { (props.attemptsTaken >= props.totalAttempts) && <p className="text-white text-center font-bree text-4xl z-20">
            Please select a mode and level then click start to begin!
          </p>}
        </div>
      );
    };
    
    export default Question;