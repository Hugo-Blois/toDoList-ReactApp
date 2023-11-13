import './App.css'
import List from './List';
import Button from './Button'

function App() {

  const itemList = [
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
  ];

  return (
    <>
      <div className="App">
      <h1>List Example</h1>
      <List items={itemList} />
    </div>
    </>
  )
}

export default App
