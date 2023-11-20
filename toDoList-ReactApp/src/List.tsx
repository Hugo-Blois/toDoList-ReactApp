import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Button from './Button'
import { useState } from 'react';
import './List.css';
interface ListItem {
  id: number;
  title: string;
  content: string;
}

interface ListProps {
  items: ListItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newContent: string) => void;
}

const List: React.FC<ListProps> = ({ items, onDelete, onEdit  }) => {
  const [editContent, setEditContent] = useState<string>('');

  const handleEdit = (id: number) => {
    const newContent = window.prompt('Enter the new content:', editContent);
    if (newContent !== null) {
      setEditContent(newContent);
      onEdit(id, newContent);
    }
  };

  return (
    <ul className="custom-list">
      {items.map((item) => (
        <li key={item.id} className="list-item">
          
          <span className="item-title">{item.title}</span>
          <span className="item-content">{item.content}</span>

          <Button onClick={() => handleEdit(item.id)} label={''}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>

          <Button onClick={() => onDelete(item.id)} label={''}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>

        </li>
      ))}
    </ul>
  );
};

export default List;
