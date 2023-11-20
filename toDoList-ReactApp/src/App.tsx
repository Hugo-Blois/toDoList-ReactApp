import './App.css'
import List from './List';
import Button from './Button'
import { Fragment, useState } from 'react';

interface ListItem {
  id: number;
  content: string;
  done: boolean;
}

function App() {
  const [addTask, setAddTask] = useState<boolean>(false);
  const [itemList, setItemList] = useState<ListItem[]>([]);
  const [tache, setTache] = useState<string>("");

  function onChangeTache(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    if(text != '') setTache(text);
  }

  function addTache(tache: string) {
    if (tache != ""){
      const newItemList = [...itemList, { id: itemList.length + 1, content: tache, done: false  }];
      setItemList(newItemList);
      setTache("");
    }
  }

  function deleteTache(id: number) {
    const updatedItemList = itemList.filter((item) => item.id !== id);
    setItemList(updatedItemList);
  }

  function editTache(id: number, newContent: string) {
    const updatedItemList = itemList.map((item) =>
      item.id === id ? { ...item, content: newContent } : item
    );
    setItemList(updatedItemList);
  }

  function toggleDone(id: number) {
    const updatedItemList = itemList.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setItemList(updatedItemList);
  }

  return (
    <div className="App">

      <h1>List Example</h1>
      <List items={itemList} onDelete={deleteTache} onEdit={editTache} onToggleDone={toggleDone}/>
      {
       addTask === true ?
       <Fragment>
       <input type="text" placeholder='Ajouter une nouvelle tâche' value={tache} onChange={ onChangeTache }></input>
       <Button label='Confirm' onClick={() => {
          setAddTask(false);
          addTache(tache); 
        }} />
       </Fragment>
        :
        <Button label='Add a task' onClick={ () => setAddTask(true)}/>
      }
    </div>
  )
}

export default App
