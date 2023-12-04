import './App.css';
import List from './List';
import Button from './Button';
import { useState } from 'react';

interface ListItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
  dueDate: string;
}

function App() {
  const [addTask, setAddTask] = useState<boolean>(false);
  const [itemList, setItemList] = useState<ListItem[]>([]);
  const [tache, setTache] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string | undefined>("");
  const [error, setError] = useState<string | null>(null);
  const dateTime = new Date().toISOString().split('T')[0];

  function onChangeTache(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    if(text != '') setTache(text);
  }
  function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    if(text != '') setDescription(text);
  }
  function onChangeDueDate(e: React.ChangeEvent<HTMLInputElement>){
    const date = e.currentTarget.value;
    setDueDate(date);
  }

  function addTache(tache: string, description: string, dueDate: string) {
    if (tache != "" && description != "" && dueDate != ""){
      const newItemList = [...itemList, { id: itemList.length + 1, title: tache, content: description, done: false, dueDate }];
      setItemList(newItemList);
      setTache('');
      setDescription('');
      setDueDate(undefined);
      setAddTask(false);
    }else {
      setError("Fields cannot be empty");
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
      <h1>Todo List</h1>
      
      <div className="task-section">
        <h2>To-Do Tasks</h2>
        <h4>Expired Tasks</h4>
        <List items={itemList.filter((item) => !item.done && item.dueDate <= dateTime)} onDelete={deleteTache} onEdit={editTache} onToggleDone={toggleDone}/>
        <h4>Active Tasks</h4>
        <List items={itemList.filter((item) => !item.done && item.dueDate > dateTime)} onDelete={deleteTache} onEdit={editTache} onToggleDone={toggleDone}/>
        {
        addTask === true ? 
          <div className='add-task'>
            <input type="text" placeholder='Title' value={tache} onChange={ onChangeTache }></input>
            <input type="text" placeholder='Description' value={description} onChange={ onChangeDescription }></input>
            <input type="date" placeholder="Expiry date" value={dueDate || ''} onChange={onChangeDueDate}></input>
            {error && <p className="error-message">{error}</p>}
            <div>
              <Button label='Confirm' onClick={() => {
                    addTache(tache, description, dueDate || '');
                  } } children={undefined} />
              <Button label='Cancel' onClick={() => {
                    setAddTask(false);
                    setTache("");
                    setDescription("");
                    setDueDate(undefined);
                    setError(null);
                  } } children={undefined} />
            </div>
          </div>
          :
          <Button label='Add a task' onClick={() => setAddTask(true)} children={undefined}/>
        }
      </div>
      <div className="completed-task-section">
        <h2>Completed Tasks</h2>
        <List items={itemList.filter((item) => item.done)} onDelete={deleteTache} onEdit={editTache} onToggleDone={toggleDone} />
      </div>
    </div>
  );
}

export default App;

