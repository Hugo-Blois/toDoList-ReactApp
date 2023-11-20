import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Button from './Button';
import './List.css';

interface ListItem {
  id: number;
  title: string;
  content: string;
}

interface ListProps {
  items: ListItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string, newContent: string) => void;
}

const List: React.FC<ListProps> = ({ items, onDelete}) => {
  const [editStates, setEditStates] = useState<{ [key: number]: { title: string; content: string } }>({});

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    setEditStates((prev) => ({ ...prev, [itemId]: { ...prev[itemId], title: e.target.value } }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    setEditStates((prev) => ({ ...prev, [itemId]: { ...prev[itemId], content: e.target.value } }));
  };

  return (
    <ul className="custom-list">
      {items.map((item) => (
        <li key={item.id} className="list-item">
          <div className='edit-task'>
          <input
            type="text"
            value={editStates[item.id]?.title !== undefined ? editStates[item.id]?.title : ''}
            onChange={(e) => handleTitleChange(e, item.id)}
            placeholder="Nouveau titre"
          />

          <input
            type="text"
            value={editStates[item.id]?.content !== undefined ? editStates[item.id]?.content : ''}
            onChange={(e) => handleContentChange(e, item.id)}
            placeholder="Nouvelle description"
          />
            <Button onClick={() => onDelete(item.id)} label="">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
