import { useEffect } from 'react';
// @ts-ignore
import Plotly from 'plotly.js-dist';

function RenderGraph(props: { points: number[][] }) {
    
    useEffect(() => {
        
        const Graph = document.getElementById('graph');

        Plotly.newPlot(Graph, [{
            x: [props.points[0][0], props.points[1][0]],
            y: [props.points[0][1], props.points[1][1]],   
            text: ['Point A', 'Point B'],
            marker: { color: 'white' },
            line: { color: 'white' }
        }], {
            margin: {t:50,r:50  },
            dragmode: 'pan',
            paper_bgcolor: 'black',
            plot_bgcolor: 'black',
            xaxis: {
                gridcolor: '#808080',
                tickfont: { color: 'white', size: 18 },
                zerolinecolor: '#2F72DC',
                linecolor: 'white',  
                mirror:true        
            },
            yaxis: {
                gridcolor: '#808080',
                tickfont: { color: 'white', size: 18 },  
                zerolinecolor: '#2F72DC',
                linecolor: 'white',      
                mirror:true   
            },
        }, { scrollZoom: true, displayModeBar: false });

        return () => {
            Plotly.purge(Graph);
        };
    }, [props.points]);

    return (
        <div className=''>
            <div id="graph" className="w-[55vw] h-[100vh]  rounded-lg"></div>
        </div>
    );
}

export default RenderGraph;
