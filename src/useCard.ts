import { useDrag, useDrop } from 'react-dnd';
import { CARD } from './consts';
import { ElementRefWrapper } from './types';

/** Внутренний тип для перетаскиваемого элемента */
export type CardDataType = {
  id: string;
  colId?: string;
}

/** 
 * Возвращает ref, который позвляет превратить элемент в перетаскиваемую карту
 */
export const useCard = ({
  /** Уникальный идентификатор карты */
  id,
  colId,
  /** Вызывается, когда на карту "падает" другая карты */
  onDrop
}:{
  onDrop?: (fallenCard: CardDataType) => void,
} & CardDataType): [ElementRefWrapper, boolean] => {
  const [isDragging, drag] = useDrag<CardDataType, unknown, boolean>({
    type: CARD,
    item: {
      id,
      colId
    },
    collect: (monitor) => {
      return monitor.isDragging();
    },
  }, [id, colId]);

  const [, drop] = useDrop<CardDataType, unknown, {}>({
    accept: CARD,
    drop: (item, monitor) => {
      onDrop?.(item)
    }
  })
  return [(ref) => drop(drag(ref)), isDragging];
}

export default useCard;
