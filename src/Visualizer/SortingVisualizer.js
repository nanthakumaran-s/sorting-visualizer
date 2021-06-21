import { Slider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getBubbleSortAnimations } from "../algorithms/bubbleSort";
import { getMergeSortAnimations } from "../algorithms/mergeSort";
import { getQuickSortAnimations } from "../algorithms/quickSort";
import { getHeapSortAnimations } from "../algorithms/heapSort";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const [value, setValue] = useState(19);
  const [selectedAlgo, setAlgo] = useState("Merge Sort");
  const [array, setArray] = useState([]);
  const [disableSlider, setDisableSlider] = useState(false);

  useEffect(() => {
    const createArr = () => {
      const array = [];
      for (let i = 0; i < value; i++) {
        array.push(randomFromInterval(15, 600));
      }
      setArray(array);
    };

    createArr();
  }, [value]);

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "#4ebd9c";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (value < 20 ? 100 : 3));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (value < 20) {
            arrayBars[barOneIdx].innerHTML = newHeight;
          }
        }, i * (value < 20 ? 100 : 3));
      }
    }
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
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
        }, i * (value < 20 ? 100 : 1));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (value < 20) {
            arrayBars[barOneIdx].innerHTML = newHeight;
          }
        }, i * (value < 20 ? 100 : 1));
      }
    }
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(array, 0, array.length - 1);
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
        }, i * (value < 20 ? 100 : 10));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (value < 20) {
            arrayBars[barOneIdx].innerHTML = newHeight;
          }
        }, i * (value < 20 ? 100 : 10));
      }
    }
  };

  const heapSort = () => {
    const animations = getHeapSortAnimations(array);
    console.log(animations);
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
        }, i * (value < 20 ? 100 : 10));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (value < 20) {
            arrayBars[barOneIdx].innerHTML = newHeight;
          }
        }, i * (value < 20 ? 100 : 10));
      }
    }
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

      case "Heap Sort":
        heapSort();
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
        return (
          <div
            key={index}
            className="arrayBar"
            style={{ height: `${ele}px`, width: "2.5px" }}
          />
        );
      })}
      {selectedAlgo === "Heap Sort" ? (
        <p className="note">
          <span>NOTE:</span> The algorithm used for heap sort is not a stable
          one. So in some case you can't get the correct sorted order. Will make
          it stable in the future
        </p>
      ) : (
        ""
      )}
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
            className={selectedAlgo === "Heap Sort" ? "active" : ""}
            onClick={() => setAlgo("Heap Sort")}
          >
            Heap Sort
          </p>
        </div>
        <div className="divider" />
        <p
          className="generate"
          onClick={() =>
            setValue(Math.floor(Math.random() * (20 - 10 * 1) + 10))
          }
        >
          Generate New Array
        </p>
        <div className="divider" />
        <div className="range">
          <p className="text">Size and Speed 👉 </p>
          <Slider
            value={value}
            min={5}
            max={200}
            onChange={(_, newValue) => setValue(newValue)}
            style={{
              color: "#fff",
              width: "300px",
              margin: "0px 1rem",
            }}
            disabled={disableSlider}
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
