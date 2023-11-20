import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Button from './Button';
import React from 'react';
import TaskItem from './TaskItem';
import './List.css';

interface ListItem {
  id: number;
  title: string;
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
  return (
    <ul className="custom-list">
      {items.map((item) => (
            <TaskItem key={item.id} item={item} onDelete={onDelete} onEdit={onEdit} onToggleDone={onToggleDone} />
      ))}
    </ul>
  );
};

export default List;
