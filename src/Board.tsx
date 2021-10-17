import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Board: React.FC = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      { children }
    </DndProvider>
  )
}

export default Board;
