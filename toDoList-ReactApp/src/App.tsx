import './App.css';
import List from './List';
import Button from './Button';
import { Fragment, useState } from 'react';

interface ListItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
}

function App() {
  const [addTask, setAddTask] = useState<boolean>(false);
  const [itemList, setItemList] = useState<ListItem[]>([]);
  const [tache, setTache] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function onChangeTache(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    if(text != '') setTache(text);
  }
  function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    if(text != '') setDescription(text);
  }

  function addTache(tache: string, description: string) {
    if (tache != ""){
      const newItemList = [...itemList, { id: itemList.length + 1, title: tache, content: description, done: false }];
      setItemList(newItemList);
      setTache('');
      setDescription('');
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
        <div className='add-task'>
        <input type="text" placeholder='Titre' value={tache} onChange={ onChangeTache }></input>
        <input type="text" placeholder='Description' value={description} onChange={ onChangeDescription }></input>
        <Button label='Confirm' onClick={() => {
                setAddTask(false);
                addTache(tache, description);
              } } children={undefined} />
        </div>
       </Fragment>
        :
        <Button label='Add a task' onClick={() => setAddTask(true)} children={undefined}/>
      }
    </div>
  );
}

export default App;
