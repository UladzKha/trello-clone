import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../context/AppStateContext";
import AddNewItem from "./AddNewItem";
import { useItemDrag } from "../utils/useItemDrag";
import { DragItem } from "../utils/DragItem";
import { isHidden } from "../utils/isHidden";
import Card from "./Card";
import { ColumnContainer, ColumnTitle } from "../styles";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}

const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });

      item.index = hoverIndex;
    },
  });
  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) =>
          dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })
        }
        dark
      />
    </ColumnContainer>
  );
};

export default Column;
