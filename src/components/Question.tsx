function Question(props:{points:number[][], ratio:number[], attemptsTaken:number, totalAttempts:number}){

    
    return (
        <div className="flex justify-center items-center h-[5vh]">
          { (props.attemptsTaken != props.totalAttempts) && <p className="w-[70vw] text-center font-bree text-lg">
            Given two points A ({props.points[0][0]}, {props.points[0][1]}) and B ({props.points[1][0]}, {props.points[1][1]}), find the coordinates of the point that divides the line segment AB in the ratio {props.ratio[0]}:{props.ratio[1]}.
          </p>}
          { (props.attemptsTaken == props.totalAttempts) && <p className="w-[70vw] text-center font-bree text-lg">
            Please select a mode and level then click start to begin!
          </p>}
        </div>
      );
    };
    
    export default Question;