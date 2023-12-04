import TaskItem from './TaskItem';
import './List.css';

interface ListItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
}

interface ListProps {
  items: ListItem[];
  onDelete: (id: number) => void;

  onEdit: (id: number, newContent: string) => void;
  onToggleDone: (id: number) => void;

  onHandleTitleChange: (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => void;
  onHandleContentChange: (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => void;
}

const List: React.FC<ListProps> = ({ items, onDelete, onEdit, onToggleDone, onHandleTitleChange, onHandleContentChange}) => {

  return (
    <ul className="custom-list">
      {items.map((item) => (
            <TaskItem key={item.id} item={item} onDelete={onDelete} onEdit={onEdit} onToggleDone={onToggleDone} onHandleTitleChange={onHandleTitleChange} onHandleContentChange={onHandleContentChange}/>
      ))}
    </ul>
  );
};

export default List;
