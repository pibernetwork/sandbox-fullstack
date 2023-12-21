"use client";

import { useState } from "react";
import BoardWrapper from "./BoardWrapper";
import Card from "./Card";

export default function Board() {
  const cards = ["Card 1", "Card 2", "Card 3", "Card 4"];

  const [boardPoints, setBoardPoints] = useState(0);

  return (
    <BoardWrapper>
      <div>Board: {boardPoints}</div>
      {cards.map((card) => (
        <Card
          key={card}
          title={card}
          boardPoints={boardPoints}
          setBoardPoints={setBoardPoints}
        />
      ))}
    </BoardWrapper>
  );
}
