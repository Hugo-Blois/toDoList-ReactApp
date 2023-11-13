import { useEffect, useState } from 'react'
import './App.css'
import Button from './Button'

function App() {
  const [count, setCount] = useState(0)
  const [age, setAge] = useState(0)
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
  
  function verifyAge(){
    if(age >= 18) console.log("Vous êtes majeur")
    else console.log("Vous êtes mineur")
  }

  return (
    <>
      <div>Compteur: {count}</div>
      <div>
        <Button label="+" onClick={() => 
          setCount((count) => count + 1)}/>
        <Button label="-" onClick={() => 
          setCount((count) => count - 1)}/>
        <Button label="Reset" onClick={() => 
          setCount(0)}/>
      </div>
      <input type="number" placeholder='Age' value={age} onChange={ onChangeAge }></input>
      <Button label='Vérifier' onClick={verifyAge} />
    </>
  )
}

export default App
