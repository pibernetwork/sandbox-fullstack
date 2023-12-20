import BoardWrapper from "./BoardWrapper";
import Card from "./Card";

export default function Board() {
  return (
    <BoardWrapper>
      <Card title="Card 1" />
      <Card title="Card 2" />
      <Card title="Card 3" />
    </BoardWrapper>
  );
}
