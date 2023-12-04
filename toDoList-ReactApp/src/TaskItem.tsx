import React, { useState } from 'react';
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
    onToggleDone: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newTitlte: string, newContent: string) => void;
    onHandleTitleChange: (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => void;
    onHandleContentChange: (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => void;
  }

  const TaskItem: React.FC<TaskItemProps> = ({ item, onDelete, onToggleDone, onEdit, onHandleTitleChange, onHandleContentChange}) => {

    const [editStates, setEditStates] = useState<{ [key: number]: { title: string; content: string } }>({});

    const handleEdit = () => {
      onEdit(item.id, editStates[item.id]?.title || item.title, editStates[item.id]?.content || item.content);
      setEditStates((prev) => ({ ...prev, [item.id]: { title: '', content: '' } }));
    };
  
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
          
          <input
            type="text"
            value={editStates[item.id]?.title !== undefined ? editStates[item.id]?.title : ''}
            onChange={(e) => onHandleTitleChange(e, item.id)}
            placeholder="Nouveau titre"
          />

          <input
            type="text"
            value={editStates[item.id]?.content !== undefined ? editStates[item.id]?.content : ''}
            onChange={(e) => onHandleContentChange(e, item.id)}
            placeholder="Nouvelle description"
          />

        </div>

        <div>
        <Button onClick={handleEdit} label="">
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