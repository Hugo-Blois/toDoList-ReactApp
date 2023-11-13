import './App.css'
import List from './List';
import Button from './Button'
import { Fragment, useState } from 'react';

interface ListItem {
  id: number;
  content: string;
}

function App() {

  const [addTask, setAddTask] = useState<boolean>(false);

  const [itemList, setItemList] = useState<ListItem[]>([]);

  const [tache, setTache] = useState<string>("");

  function onChangeTache(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    if(text != '')
      setTache(text);
  }

  function addTache(tache: string) {
    const newItemList = [...itemList, { id: itemList.length + 1, content: tache }];
    if (tache != ""){
      setItemList(newItemList);
      setTache("");
    }
  }

  return (
    <div className="App">

      <h1>List Example</h1>
      <List items={itemList} />
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
