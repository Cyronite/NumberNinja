import { useEffect } from 'react';
// @ts-ignore
import Plotly from 'plotly.js-dist';

function RenderGraph(props: { data:string, points:number[][]}) {
    
    useEffect(() => {
        const Graph = document.getElementById('graph');

        Plotly.newPlot(Graph, [{
            x: [props.points[0][0], props.points[1][0]],
            y: [props.points[0][1], props.points[1][1]],   
            text: ['Point A', 'Point B'],
        }], {
            text: ['Point A', 'Point B'],
            textposition: 'bottom center',
            margin: { t: 0 },
            dragmode: 'pan',
        },{scrollZoom: true, displayModeBar: false});
        return () => {
            Plotly.purge(Graph);
        };
    }, [props.points]);

    return (
        <>
        <div className='flex justify-center items-center'>
            <div id="graph" className="w-[80vw] h-[80vh] overflow-hidden border-[#2F72DC] border-2 z-z"></div>
        </div>
           
        </>
        
    );
}

export default RenderGraph;

