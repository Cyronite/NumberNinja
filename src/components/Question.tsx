function Question(props:{points:number[][], ratio:number[], attemptsTaken:number, totalAttempts:number}){

    //only used to display the question no logic in this file
    return (
        <div className="flex justify-center items-center max-xl:py-24 px-8">
          { (props.attemptsTaken != props.totalAttempts) && <p className="text-white text-center font-bree text-4xl z-20">
            Given two points A at ({props.points[0][0]}, {props.points[0][1]}) and B at ({props.points[1][0]}, {props.points[1][1]}), find the coordinates of the point on the line segment from A to B that divides it in the ratio {props.ratio[0]}:{props.ratio[1]}.
          </p>}
          { (props.attemptsTaken >= props.totalAttempts) && <p className="text-white text-center font-bree text-4xl z-20">
            Please select a mode and level then click start to begin!
          </p>}
        </div>
      );
    };
    
    export default Question;