import { Slider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getBubbleSortAnimations } from "../algorithms/bubbleSort";
import { getMergeSortAnimations } from "../algorithms/mergeSort";
import { getQuickSortAnimations } from "../algorithms/quickSort";
import { getSelectionSortAnimations } from "../algorithms/selectionSort";
import { getInsertionSortAnimations } from "../algorithms/insertionSort";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const [value, setValue] = useState(19);
  const [generate, setGenerate] = useState(false);
  const [selectedAlgo, setAlgo] = useState("Merge Sort");
  const [array, setArray] = useState([]);

  useEffect(() => {
    const createArr = () => {
      const array = [];
      for (let i = 0; i < value; i++) {
        array.push(randomFromInterval(15, 600));
      }
      setArray(array);
    };

    createArr();
  }, [value, generate]);

  const animate = (animations, duration) => {
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isColor, isLast] = animations[i];
      if (isColor) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = !isLast ? "red" : "#4ebd9c";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (value < 20 ? 100 : duration));
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoIdx}px`;
          if (value < 20) {
            arrayBars[barOneIdx].innerHTML = barTwoIdx;
          }
        }, i * (value < 20 ? 100 : duration));
      }
    }
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    animate(animations, 3);
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    animate(animations, 1);
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(array, 0, array.length - 1);
    animate(animations, 10);
  };

  const selectionSort = () => {
    const animations = getSelectionSortAnimations(array);
    animate(animations, 10);
  };

  const insertionSort = () => {
    const animations = getInsertionSortAnimations(array);
    animate(animations, 10);
  };

  const sort = () => {
    switch (selectedAlgo) {
      case "Merge Sort":
        mergeSort();
        break;

      case "Bubble Sort":
        bubbleSort();
        break;

      case "Quick Sort":
        quickSort();
        break;

      case "Selection Sort":
        selectionSort();
        break;

      case "Insertion Sort":
        insertionSort();
        break;

      default:
        break;
    }
  };

  return (
    <div className="visualizer">
      {array.map((ele, index) => {
        if (value < 20) {
          return (
            <div
              key={index}
              className="arrayBar"
              style={{ height: `${ele}px`, width: "40px" }}
            >
              {ele}
            </div>
          );
        }
        if (value < 50) {
          return (
            <div
              key={index}
              className="arrayBar"
              style={{ height: `${ele}px`, width: "20px" }}
            />
          );
        }
        return (
          <div
            key={index}
            className="arrayBar"
            style={{ height: `${ele}px`, width: "5px" }}
          />
        );
      })}
      <div className="bottomContainer">
        <h1 className="title">Sorting Visualizer</h1>
        <div className="divider" />
        <div className="algorithms">
          <p
            className={selectedAlgo === "Merge Sort" ? "active" : ""}
            onClick={() => {
              setAlgo("Merge Sort");
            }}
          >
            Merge Sort
          </p>
          <p
            className={selectedAlgo === "Bubble Sort" ? "active" : ""}
            onClick={() => setAlgo("Bubble Sort")}
          >
            Bubble Sort
          </p>
          <p
            className={selectedAlgo === "Quick Sort" ? "active" : ""}
            onClick={() => setAlgo("Quick Sort")}
          >
            Quick Sort
          </p>
          <p
            className={selectedAlgo === "Selection Sort" ? "active" : ""}
            onClick={() => setAlgo("Selection Sort")}
          >
            Selection Sort
          </p>
          <p
            className={selectedAlgo === "Insertion Sort" ? "active" : ""}
            onClick={() => setAlgo("Insertion Sort")}
          >
            Insertion Sort
          </p>
        </div>
        <div className="divider" />
        <p className="generate" onClick={() => setGenerate(!generate)}>
          Generate New Array
        </p>
        <div className="divider" />
        <div className="range">
          <p className="text">Size and Speed 👉 </p>
          <Slider
            value={value}
            min={5}
            max={150}
            onChange={(_, newValue) => setValue(newValue)}
            style={{
              color: "#fff",
              width: "300px",
              margin: "0px 1rem",
            }}
          />
        </div>
        <img
          src="https://www.summitcl.com/wp-content/uploads/2018/11/play-button-overlay-png-1.png"
          alt="Sort!"
          style={{
            width: "60px",
            height: "60px",
            margin: "0px 1rem",
            cursor: "pointer",
          }}
          onClick={() => sort()}
        />
      </div>
    </div>
  );
};

export default SortingVisualizer;

const randomFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min * 1) + min);
};
