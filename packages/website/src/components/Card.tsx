"use client";

import { useCallback, useState } from "react";

interface CardProps {
  title: string;
  boardPoints: number;
  setBoardPoints: (count: number) => void;
}

export default function Card({
  title,
  boardPoints,
  setBoardPoints,
}: CardProps) {
  const [cardPoints, setCardPoints] = useState(0);

  const setPoints = useCallback(() => {
    setCardPoints(cardPoints + 1);
    setBoardPoints(boardPoints + 1);
  }, [cardPoints, boardPoints, setBoardPoints]);

  return (
    <div className="p-4 bg-white text-red-800">
      <div>{title}</div>
      <div>
        {cardPoints} / {boardPoints}
      </div>
      <div>
        <button onClick={setPoints}>Add 1</button>
      </div>
    </div>
  );
}
