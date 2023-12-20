"use client";

import { useState } from "react";

interface CardProps {
  title: string;
}

export default function Card(props: CardProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-white text-red-800">
      <div>{props.title}</div>
      <div>{count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>Add 1</button>
      </div>
    </div>
  );
}
