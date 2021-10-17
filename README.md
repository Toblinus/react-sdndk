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

## Usage

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

### Creation `Board`
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

### License
MIT