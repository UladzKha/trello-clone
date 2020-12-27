import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../context/AppStateContext";
import { CardContainer } from "../styles";
import { CardDragItem } from "../utils/DragItem";
import { isHidden } from "../utils/isHidden";
import { useItemDrag } from "../utils/useItemDrag";

interface CardProps {
  id: string;
  text: string;
  index: number;
  isPreview?: boolean;
  columnId: string;
}

const Card = ({ id, text, index, columnId, isPreview }: CardProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId });

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
      });
      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });

  drag(drop(ref));
  return (
    <CardContainer
      isHidden={isHidden(isPreview, state.draggedItem, "CARD", id)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};

export default Card;
