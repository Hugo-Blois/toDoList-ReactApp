import { useState } from 'react'
import './App.css'
import Button from './Button'

function App() {
  const [tache, setTache] = useState<string>();

  function onChangeTache(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    if(text != '')
      setTache(text);
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
