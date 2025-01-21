import React from "react";
import './SortingVisualizer.css';
import {getBubbleSortAnimations, getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms';

const ANIMATION_SPEED_MS = 0.5;
const NUMBER_OF_ARRAY_BARS = 300;
const PRIMARY_COLOR = 'cyan';
const SECONDARY_COLOR = 'blue';
const FINAL_COLOR = '#88D66C';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i=0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromIntervals(5, 1000));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight / 30}em`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    // quickSort() {}

    // heapSort() {}

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i][0] === 10){
                const bar = animations[i][1];
                setTimeout(() => {
                   arrayBars[bar].style.backgroundColor = FINAL_COLOR;
                }, i * ANIMATION_SPEED_MS);
                continue;
            }
            const isColorChange = animations[i][0] !== 2;
            if(isColorChange) {
                const [_, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = animations[i][0] === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [_, barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight / 30}em`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{backgroundColor: PRIMARY_COLOR, height: `${value / 30}em`, width: `${45/NUMBER_OF_ARRAY_BARS}vw`}}>
                        
                    </div>
                ))}
                <div className="buttonContainer">
                    <button className="button" id="generate" onClick={() => this.resetArray()}> New array </button>
                    <button className="button sortButton" onClick={() => this.mergeSort()}> Merge Sort </button>
                    {/* <button onClick={() => this.quickSort()}> Quick Sort </button>
                    <button onClick={() => this.heapSort()}> Heap Sort </button> */}
                    <button className="button sortButton" onClick={() => this.bubbleSort()}> Bubble Sort </button>
                </div>


            </div>
        );
    }
}


function randomIntFromIntervals(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}