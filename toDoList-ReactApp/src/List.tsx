import TaskItem from './TaskItem';
import './List.css';

interface ListItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
  dueDate?: string;
  dueTime?: string;
  priority: 'low' | 'medium' | 'high';
}

interface ListProps {
  items: ListItem[];
  onDelete: (id: number) => void;

  onEdit: (id: number, newTitle: string, newContent: string, date: string, time: string, priority: 'low' | 'medium' | 'high') => void;
  onToggleDone: (id: number) => void;
}

const List: React.FC<ListProps> = ({ items, onDelete, onEdit, onToggleDone}) => {

  return (
    <ul className="custom-list">
      {items.map((item) => (
            <TaskItem key={item.id} item={item} onDelete={onDelete} onEdit={onEdit} onToggleDone={onToggleDone}/>
      ))}
    </ul>
  );
};

export default List;
