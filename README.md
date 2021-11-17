# React SDnDK

Pluggable components to add a Trello (like) kanban board to your application

## Features

* Easily pluggable into existing react application
* Drag-And-Drop on cards and lanes
* Edit functionality to add/delete cards
* Custom elements to define lane and card appearance

## Getting Started

Install using npm or yarn

```bash
$ npm install react-sdndk
```

or

```bash
$ yarn add react-sdndk
```

## Created

The module contains 3 types of entities:
* `Board` - main component for making kanban board. It can contain a component called `Column`.
* `Column` - component that contains other components called `Card`. It implements the functionality of receiving components called `Card`.
* `Card` - sortable component that contains data.

### Creation `Board`

```jsx
import { Board } from 'react-dnd-kanban';

const MyBoard = () => {
  return (
    <Board>
      {/* some code, that contains Column components*/}
    </Board>
  );
}
```

### Creation `Column`
```ts
import React from 'react';
import { useColumn, CardDataType } from 'react-dnd-kanban';

type ColumnProps = {
  id: string,
  onCardEntry?: (card: CardDataType, newCol: string) => void
}

const Column: React.FC<ColumnProps> = ({ children, id, onCardEntry }) => {
  const col = useColumn({
    id,
    onCardEntry: (card) => {
      onCardEntry?.(card, id);
    }
  });

  return <div ref={col}>
    { children }
  </div>
}
```

### Creation `Card`

```ts
import React from 'react';
import { useCard, CardDataType } from 'react-dnd-kanban';

type CardProps = {
  id: string,
  colId?: string,
  onCardDrop?: (target: CardDataType, current: CardDataType) => void
};

const Card: React.FC<CardProps> = ({ children, id, colId, onCardDrop }) => {
  const [card, isDragging] = useCard({
    id,
    colId,
    onDrop: (idTarget) => {
      onCardDrop?.(idTarget, {id, colId});
    }
  });

  return <div
    style={{height: 50, width: 200, opacity: isDragging ? 0 : 1}}
    ref={(node) => card(node)}
  >
    { children }
  </div>
}
```

## Usage

```ts
const App: React.FC = () => {
  const [cards, setCards] = React.useState<
    (CardDataType & { content: React.ReactNode })[]
    >([
      {
        id: "1",
        colId: "1",
        content: "card 1 col 1"
      },
      {
        id: "2",
        colId: "2",
        content: "card 2 col 2"
      },
      {
        id: "12",
        colId: "1",
        content: "card 3 col 1"
      },
    ]);

    const swapCard = (target: CardDataType, current: CardDataType) => {
      let targetIndex = -1, currentIndex = -1;
      cards.forEach(({ id }, index) => {
        if(id === target.id) targetIndex = index;
        if(id === current.id) currentIndex = index;
      })

      if(targetIndex === -1 || currentIndex === -1) {
        return;
      }

      setCards((prev) => {
        const prevCards = [...prev];
        [prevCards[targetIndex], prevCards[currentIndex]] = 
          [prevCards[currentIndex], prevCards[targetIndex]];
        return prevCards;
      })
    }

  const entryCard = (card: CardDataType, col: string) => {
    setCards((prev) => {
      const target = prev.find(({ id }) =>  id === card.id);
      const index = prev.indexOf(target);

      if(!target || index < 0) {
        return;
      }

      const newCards = [...prev];
      newCards[index].colId = col;

      return newCards;
    })
  } 

  return <Board>
    <Column id="1" onCardEntry={entryCard}>
      {cards
        .filter(({ colId }) => colId === "1")
        .map(({ id, colId, content }) => (
          <Card key={id} id={id} colId={colId} onCardDrop={swapCard}>{content}</Card>
        ))}
    </Column>
    <Column id="2" onCardEntry={entryCard}>
      {cards
        .filter(({ colId }) => colId === "2")
        .map(({ id, colId, content }) => (
          <Card key={id} id={id} colId={colId} onCardDrop={swapCard}>{content}</Card>
        ))}
    </Column>
  </Board>;
}

export default App;
```

### License
MIT