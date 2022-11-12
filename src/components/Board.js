import { useState, useEffect } from "react";
import Card from "./Card";
import { shuffle } from "../utilities/Shuffle";

export default function Board(props) {
  const [flippedCards, setFlippedCards] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [dogsDoubled, setDogsDoubled] = useState([]);

  useEffect(() => {
    setFlippedCards([]);
    setFoundCards([]);
    fetch("https://dog.ceo/api/breeds/image/random/" + props.count)
      .then((res) => res.json())
      .then((json) => {
        console.log("DATA JSOU ZDE", json);
        const dogs = json.message;
        const dogsDoubled = [...dogs, ...dogs];
        const dogsDoubledAndShuffled = shuffle(dogsDoubled);
        setDogsDoubled(dogsDoubled);
        //setDogsDoubled(shuffle([...json.message, ...json.message]));
      });
  }, [props.count]);

  //argument = prazdne zavorky - obrazky se nactou jen jednou, bez nich by se stahovaly porad dokola

  useEffect(() => {
    if (flippedCards.length === 2) {
      const flippedImages = flippedCards.map((idx) => {
        return dogsDoubled[idx];
      });
      const doTheyMatch = flippedImages[0] === flippedImages[1];
      if (doTheyMatch) {
        setFoundCards([...foundCards, ...flippedCards]);
        setFlippedCards([]);
      } else {
        const timeout = setTimeout(() => {
          setFlippedCards([]);
        }, 3000);
      }
    }
  });

  // useEffect(() => {
  //   if (foundCards.length === dogsDoubled.length) {
  //     setTimeout(() => {
  //       props.onGameFinished(props.difficulty);
  //     }, 3000);
  //   }
  // });

  function flipCard(index) {
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }
  }

  const noOfColumns = Math.floor(Math.sqrt(props.count * 2));
  if (foundCards.length === props.count * 2) {
    return (
      <div className="flex justify-center items-center h-screen">
        Vyhrál jsi!
        <button className="bg-pink-500 text-white p-2 px-4 round">
          <h1>Nová hra</h1>
        </button>
      </div>
    );
  }

  return (
    <div
      className="grid gap-4 p-4"
      style={{
        gridTemplateColumns: "repeat(" + noOfColumns + ", minmax(0, 1fr))",
      }}
    >
      {dogsDoubled.map((src, idx) => (
        <Card
          key={idx}
          image={src}
          flipped={flippedCards.includes(idx) || foundCards.includes(idx)}
          click={() => {
            flipCard(idx);
          }}
        />
      ))}
    </div>
  );
}
