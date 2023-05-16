import {Card} from "./Components/Card";
import './App.css';
import {useState, useEffect, useRef} from "react";
import axios from 'axios';

const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
            setHeight(event.target.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {width, height};
}

function App() {
    const {width, height} = useResize()
    const isFirstRun = useRef(true);
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(5);
    const [limit, setLimit] = useState(1);
    const [columnCount, setColumnCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);

    useEffect(() => {
        const contentHeight = height - 150;
        const contentWidth = width - 450;
        const curCol = Math.floor((contentHeight - 30) / 150);
        const curRow = Math.floor((contentWidth - 30) / 200)
        if(curCol !== rowCount || curRow !== columnCount) {
            setRowCount(Math.floor((contentHeight - 30) / 150));
            setColumnCount(Math.floor((contentWidth - 30) / 200));
        }
    }, [height, width])

    useEffect(() => {
        const curLimit = rowCount * columnCount;
        if(curLimit !== limit) {
            setLimit(curLimit);
        }
    }, [columnCount, rowCount])

    useEffect(() => {
        if(isFirstRun.current !== true) {
            let mounted = true;
            if (offset === 0 || (offset > 0 && limit > 0)) {
                    axios.get(`http://localhost:5098/api/post/?limit=${limit}&offset=${offset}`)
                    .then((resp) => {
                        if (mounted) {
                            setPosts(resp.data);
                        }
                    });
            }
            return () => mounted = false;
        }
        isFirstRun.current = false;
    }, [limit, offset])

    function renderGrid(){
        function getTitle(row, column){
            if(posts[row * columnCount + column] !== undefined) {
                return posts[row * columnCount + column].title;
            }
            else{
                return "Nothing";
            }
        }
        function renderRow(row){
            const cards = [];
                for (let column = 0; column < columnCount; column++) {
                    cards.push(
                        <Card
                            content={getTitle(row, column)}
                        />)
                }
            return (<div className="row">{cards}</div>)
        }
        function renderTable(){
            const rows = []
            for(let row = 0; row < rowCount; row++){
                rows.push(renderRow(row))
            }
            return(rows)
        }

        return(
            <div className="flex-box">
                {renderTable()}
            </div>
        )
    }

  return (
    <div className="App">
        <div className="header"></div>
        <div className="content">
            <div className="left-bar content-divs"></div>
            <div className="card-container content-divs">
                {renderGrid()}
            </div>
            <div className="right-bar content-divs"></div>
        </div>
        <div className="footer"></div>
    </div>
  );
}

export default App;
