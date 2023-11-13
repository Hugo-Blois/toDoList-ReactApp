import { useState } from 'react'
import './App.css'
import List from './List';
import Button from './Button'

function App() {
  const initialItemList = [
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
  ];

  const [tache, setTache] = useState<string>("");
  const [itemList, setItemList] = useState(initialItemList);

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
    <>
      <input type="text" placeholder='Ajouter une nouvelle tâche' value={tache} onChange={ onChangeTache }></input>
      <Button label='Ajouter' onClick={() => addTache(tache)} />
      <div className="App">
      <h1>List Example</h1>
      <List items={itemList} />
    </div>
    </>
  )
}

export default App
