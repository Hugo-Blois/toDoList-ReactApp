import './App.css';
import List from './List';
import Button from './Button';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'react-calendar/dist/Calendar.css';
import Fuse from 'fuse.js'
import FullCalendar from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  EventClickArg
} from "@fullcalendar/core";

interface ListItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
  dueDate: string;
  dueTime: string;
}

function App() {
  const [addTask, setAddTask] = useState<boolean>(false);
  const [itemList, setItemList] = useState<ListItem[]>([]);
  const [tache, setTache] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [dueTime, setDueTime] = useState<string>("")
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const dateTime = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<string>('tasks'); 
  const [selectedTask, setSelectedTask] = useState<ListItem | null>(null); // Ajout de la propriété selectedTask

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
  function onChangeDueTime(e: React.ChangeEvent<HTMLInputElement>){
    const time = e.currentTarget.value;
    setDueTime(time);
  }

  function addTache(tache: string, description: string, dueDate: string, dueTime: string) {
    if (tache != "" && description != "" && dueDate != "" && dueTime != ""){
      const newItemList = [...itemList, { id: itemList.length + 1, title: tache, content: description, done: false, dueDate, dueTime }];
      setItemList(newItemList);
      setTache('');
      setDescription('');
      setDueDate("");
      setDueTime("")
      setAddTask(false);
    }else {
      setError("Fields cannot be empty");
    }
  }
  

  function deleteTache(id: number) {
    const updatedItemList = itemList.filter((item) => item.id !== id);
    setItemList(updatedItemList);
  }

  function editTache(id: number, newTitle: string, newContent: string, date: string, time: string) {
    const updatedItemList = itemList.map((item) =>
      item.id === id ? { ...item, title: newTitle, content: newContent, dueDate: date, dueTime: time} : item
    );
    setItemList(updatedItemList);
  }

  function toggleDone(id: number) {
    const updatedItemList = itemList.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setItemList(updatedItemList);
  }

function filterTasks(items: ListItem[]): ListItem[] {
    if (!searchTerm) {
      return items;
    }
  
    const options = {
      keys: ['title', 'content'],
      threshold: 0.3,
    };
  
    const fuse = new Fuse(items, options);
    const result = fuse.search(searchTerm);
  
    return result.map((item) => item.item);
  }

  function mapTasksToEvents(tasks: ListItem[]): any[] {
    return tasks.map((task) => ({
      title: task.title,
      start: `${task.dueDate}T${task.dueTime}`,
      allDay: false
    }));
  }

  function handleEventClick(clickInfo: EventClickArg) {
    const taskTitle = clickInfo.event.title;

    // Trouver la tâche correspondante dans la liste
    const clickedTask = itemList.find((task) => task.title === taskTitle);

    // Mettre à jour la tâche sélectionnée
    if (clickedTask) {
      // Vérifier si la tâche cliquée est déjà la tâche sélectionnée
      if (selectedTask && selectedTask.id === clickedTask.id) {
        // Si c'est le cas, désélectionnez la tâche en mettant selectedTask à null
        setSelectedTask(null);
      } else {
        // Sinon, sélectionnez la tâche cliquée
        setSelectedTask(clickedTask);
      }
    } else {
      // Si aucune tâche n'est associée à l'événement, désélectionnez la tâche en mettant selectedTask à null
      setSelectedTask(null);
    }
  }
  
return (
  <div className="App">
    <div className='navbar'>
      <h1>Todo List</h1>
      <div className="tabs">
        <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>
          Calendar
        </button>
        <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
          Tasks
        </button>
      </div>  
    </div>

      {activeTab === 'calendar' && (
        <div className="demo-app-main">
        {selectedTask && (
          <div>
            <h3>Selected Task</h3>
            <p>Title: {selectedTask.title}</p>
            <p>Description: {selectedTask.content}</p>
            {/* Ajoutez d'autres champs de tâche si nécessaire */}
          </div>
        )}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={mapTasksToEvents(itemList)}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false,
          }}
          eventClick={handleEventClick}
        />
      </div>
      )}

      {activeTab === 'tasks' && (
      <div >
        <div className='navbartasks'>
          <h2>Tasks</h2>
          <button onClick={() => {
            setSearchTerm(""); // Réinitialiser la valeur du champ de recherche
            setShowSearch(!showSearch); // Inverser l'état de visibilité du champ de recherche
          }}>
            <FontAwesomeIcon icon={faSearch} />
          </button> 
          {showSearch && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>
    <div className="task-section">
      <div className="grid-container">
        <div className="grid-item">
          <h2>Today</h2>
          <List items={filterTasks(itemList.filter((item) => !item.done && item.dueDate === dateTime))} onDelete={deleteTache} onEdit={editTache} onToggleDone={toggleDone}/>
        </div>
        <div className="grid-item">
          <h2>Active Tasks</h2>
          <List items={filterTasks(itemList.filter((item) => !item.done && item.dueDate > dateTime))} onDelete={deleteTache} onEdit={editTache} onToggleDone={toggleDone}/>
        </div>
        <div className="grid-item">
          <h2>Completed Tasks</h2>
          <List items={filterTasks(itemList.filter((item) => item.done))} onDelete={deleteTache} onEdit={editTache} onToggleDone={toggleDone} />
        </div>
        <div className="grid-item">
          <h2>Expired Tasks</h2>
          <List items={filterTasks(itemList.filter((item) => !item.done && item.dueDate < dateTime))} onDelete={deleteTache} onEdit={editTache} onToggleDone={toggleDone}/>
        </div>
      </div>
    </div>
    {
      addTask === true ? 
        <div className='add-task'>
            <input type="text" placeholder='Title' value={tache} onChange={ onChangeTache }></input>
            <input type="text" placeholder='Description' value={description} onChange={ onChangeDescription }></input>
            <input type="date" placeholder="Expiry date" value={dueDate || ''} onChange={onChangeDueDate}></input>
            <input type="time" value={dueTime || ''} onChange={onChangeDueTime}></input>
            {error && <p className="error-message">{error}</p>}
            <div>
              <Button label='Confirm' onClick={() => {
                    addTache(tache, description, dueDate, dueTime || '');
                  } } children={undefined} />
              <Button label='Cancel' onClick={() => {
                    setAddTask(false);
                    setTache("");
                    setDescription("");
                    setDueDate("");
                    setError(null);
                  } } children={undefined} />
            </div>
        </div>
        :
        <div className='add-task'>
          <Button label='Add a task' onClick={() => setAddTask(true)} children={undefined}/>
        </div>
    }
  </div>
)}
    </div>
);


}

export default App;

