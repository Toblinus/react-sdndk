
import { useDrop } from 'react-dnd';
import { CARD } from './consts';
import { ElementRefWrapper } from './types';
import { CardDataType } from './useCard';

export const useColumn = ({
  id,
  onCardEntry
}: {
  id: string,
  onCardEntry?: (card: CardDataType) => void
}): ElementRefWrapper => {
  const [, drop] = useDrop<CardDataType, unknown, unknown>(() => ({ 
    accept: CARD,
    drop: (card) => { 
      if(card.colId !== id) {
        onCardEntry?.(card);
      }
    },
  }), [onCardEntry]);

  return drop;
}

export default useColumn;
