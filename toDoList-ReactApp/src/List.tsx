import React from 'react';
import Button from './Button'
import { useState } from 'react';

interface ListItem {
  id: number;
  content: string;
  done: boolean;
}

interface ListProps {
  items: ListItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newContent: string) => void;
  onToggleDone: (id: number) => void;
}

const List: React.FC<ListProps> = ({ items, onDelete, onEdit, onToggleDone  }) => {
  const [editContent, setEditContent] = useState<string>('');

  const handleEdit = (id: number) => {
    const newContent = window.prompt('Enter the new content:', editContent);
    if (newContent !== null) {
      setEditContent(newContent);
      onEdit(id, newContent);
    }
  };

  return (
    <ul>
      {items.map(item => (
         <li key={item.id}>
         {item.content} 
         <button onClick={() => handleEdit(item.id)}>Edit</button>
         <Button label='Supprimer' onClick={() => onDelete(item.id)} />
         <input
            type="checkbox"
            checked={item.done}
            onChange={() => onToggleDone(item.id)}
          />
       </li>
      ))}
    </ul>
  );
};

export default List;
