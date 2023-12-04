import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
    onEdit: (id: number, newTitlte: string, newContent: string) => void;
  }

  const TaskItem: React.FC<TaskItemProps> = ({ item, onDelete, onToggleDone }) => {
  
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

        </div>
        
  
        <div>
          {item.dueDate && (
              <span className="item-due-date" >
                  DeadLine : {item.dueDate}
              </span>
          )}
  
        <Button onClick={() => onDelete(item.id)} label={''}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        </div>
  
      </li>
    );
  };
  
  export default TaskItem;