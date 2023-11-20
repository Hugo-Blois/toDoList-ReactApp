import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ListItem {
    id: number;
    title: string;
    content: string;
    done: boolean;
}

interface TaskItemProps {
    item: ListItem;
    onDelete: (id: number) => void;
    onEdit: (id: number, newContent: string) => void;
    onToggleDone: (id: number) => void;
  }

  const TaskItem: React.FC<TaskItemProps> = ({ item, onDelete, onEdit, onToggleDone }) => {
    const handleEdit = () => {
      const newContent = window.prompt('Enter the new content:', item.content);
      if (newContent !== null) {
        onEdit(item.id, newContent);
      }
    };
  
    return (
      <li
        key={item.id}
        className="list-item"
        style={{
          padding: '10px',
          marginBottom: '10px',
          width: '70vw',
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}
      >
  
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => onToggleDone(item.id)}
          />
          
          <span className="item-title">{item.title}</span>
          <span className="item-content">{item.content}</span>
        </div>
  
        <div>
          <Button onClick={() => handleEdit()} label={''}>
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