import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ListItem {
    id: number;
    title: string;
    content: string;
    done: boolean;
    dueDate?: string;
}

interface TaskItemProps {
  item: ListItem;
  onToggleDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string, newContent: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, onDelete, onToggleDone, onEdit }) => {

  return (
    <li
      key={item.id}
      className="list-item"
      style={{
        border: '2px',
        borderRadius: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '10px',
        marginBottom: '10px',
        width: '70vw',
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}
    >

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggleDone(item.id)}
          style={{ marginRight: '30px' }}
        />
        
        <span className="item-title" style={{ marginRight: '50px', textDecoration: item.done ? 'line-through' : 'none' }}>
          {item.title}</span>
        <span className="item-content" style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
          {item.content}</span>
      </div>
      

      <div>
        {item.dueDate && (
            <span className="item-due-date" >
                DeadLine : {item.dueDate}
            </span>
        )}

        <Button onClick={() => onEdit(item.id, item.title, item.content)} label={''}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>

        <Button onClick={() => onDelete(item.id)} label={''}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>

    </li>
  );
};

export default TaskItem;
