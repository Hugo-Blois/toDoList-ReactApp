import React from 'react';
import Button from './Button'
import { useState } from 'react';

interface ListItem {
  id: number;
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
    <ul>
      {items.map(item => (
         <li key={item.id}>
         {item.content} 
         <button onClick={() => handleEdit(item.id)}>Edit</button>
         <Button label='Supprimer' onClick={() => onDelete(item.id)} />
       </li>
      ))}
    </ul>
  );
};

export default List;
