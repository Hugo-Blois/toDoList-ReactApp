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
          border: '2px solid white',
          borderRadius: '8px', // Ajoutez une bordure arrondie si nécessaire
          padding: '10px',
          marginBottom: '10px',
          width: '70vw',
          display: 'flex', // Ajoutez cette ligne pour utiliser le modèle de boîte flexible
          justifyContent: 'space-between', // Ajoutez cette ligne pour espacer les éléments horizontalement
          alignItems: 'center', // Ajoutez cette ligne pour aligner les éléments verticalement au centre
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