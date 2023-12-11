import React, { useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

interface ListItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
  dueDate?: string;
  dueTime?: string;
  priority: 'low' | 'medium' | 'high';
}

interface TaskItemProps {
  item: ListItem;
  onToggleDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string, newContent: string, date: string, time: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, onDelete, onToggleDone, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedContent, setEditedContent] = useState(item.content);
  const [editedDueDate, setEditedDueDate] = useState(item.dueDate || '');
  const [editedDueTime, setEditedDueTime] = useState(item.dueTime || '');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(item.title);
    setEditedContent(item.content);
    setEditedDueDate(item.dueDate || '');
    setEditedDueTime(item.dueTime || '');
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(item.id, editedTitle, editedContent, editedDueDate, editedDueTime);
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
        width: '90%',
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

        {isEditing ? (
          <>
          <input
            className="item-onedit"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="New Title"
          />

          <input
            className="item-onedit item-content"
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="New Content"
          />

          <input 
            className="item-onedit item-content"
            type="date" 
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            placeholder="Expiry date" 
          />

          <input 
            className="item-onedit item-content"
            type="time" 
            value={editedDueTime}
            onChange={(e) => setEditedDueTime(e.target.value)}
            placeholder="Time" 
          />

          </>
        ) : (
          <>
            <span className="item-title" style={{ marginRight: '20px', textDecoration: item.done ? 'line-through' : 'none' }}>
              {item.title}
            </span>
            <span className="item-content" style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
              {item.content}
            </span>
            {item.dueDate && item.dueTime &&(
              <span className="item-due"><i>{item.dueDate}, {item.dueTime}</i></span>
            )}
          </>
        )}
      </div>

      <div>
        {isEditing ? (
          <>
            <Button onClick={handleSaveClick} label={''}>
              <FontAwesomeIcon icon={faCheck}/>
            </Button>
            <Button onClick={handleCancelClick} label={''} >
              <FontAwesomeIcon icon={faTimes}/>
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEditClick} label={''}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={() => onDelete(item.id)} label={''}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
