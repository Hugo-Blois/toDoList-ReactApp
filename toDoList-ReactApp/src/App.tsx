import './App.css'
import List from './List';
import Button from './Button'
import { Fragment, useState } from 'react';

interface ListItem {
  id: number;
  content: string;
}

function App() {

  const [addTask, setAddTask] = useState<boolean>(true);

  const [itemList, setItemList] = useState<ListItem[]>([
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
  ]);

  const handleConfirm = () => {
    // Generate a unique ID for the new item
    const newId = itemList.length + 1;

    // Add a new item to the itemList
    const newItem: ListItem = {
      id: newId,
      content: `Item ${newId}`,
    };

    // Update the state with the new itemList
    setItemList([...itemList, newItem]);
  };

  return (
    <>
    <div className="App">
      {
       addTask === true ?
       <Fragment>
        <p>Code de bastien pour l'ajout d'une task</p>
        <Button label='Confirm' onClick={() => {
          setAddTask(false);
          handleConfirm(); 
        }} />
       </Fragment>
        :
       <Fragment>
        <p>nothing</p>
       </Fragment>
      }
      <h1>List Example</h1>
      <List items={itemList} />
      <Button label='Add a task' onClick={ () => setAddTask(true)}/>
    </div>
    </>
  )
}

export default App
