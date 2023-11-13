import { useState } from 'react'
import './App.css'
import List from './List';
import Button from './Button'

function App() {
  const [tache, setTache] = useState<string>();

  function onChangeTache(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    if(text != '')
      setTache(text);
  const [count, setCount] = useState(0)
  const [age, setAge] = useState(0)

  const itemList = [
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
  ];

  useEffect(() => {
    console.log("la nouvelle valeur du compteur est: " + count)
  }, [count]);
  
  function onChangeAge(e: React.ChangeEvent<HTMLInputElement>){
    const value = Number(e.currentTarget.value)
    if(!isNaN(value)){
      setAge(value);
      console.log(age);
    }
  }

  function addTache(){
    console.log(tache)
  }

  return (
    <>
      <input type="text" placeholder='Ajouter une nouvelle tâche' value={tache} onChange={ onChangeTache }></input>
      <Button label='Ajouter' onClick={addTache} />
    </>
  )
}

export default App
