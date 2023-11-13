// List.tsx

import React from 'react';

interface ListItem {
  id: number;
  content: string;
}

interface ListProps {
  items: ListItem[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.content}</li>
      ))}
    </ul>
  );
};

export default List;
