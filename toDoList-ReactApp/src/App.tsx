import './App.css';
import List from './List';
import Button from './Button';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'react-calendar/dist/Calendar.css';
import Fuse from 'fuse.js'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  EventClickArg
} from "@fullcalendar/core";
import Modal, { Styles } from 'react-modal';
import Stats from './Stats';
import InfoPopUp from './InfoPopUp';

Modal.setAppElement('#root');

interface ListItem {
  id: number;
  title: string;
  content: string;
  done: boolean;
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
}

function App() {
  const [addTask, setAddTask] = useState<boolean>(false);
  const [itemList, setItemList] = useState<ListItem[]>(() => {
    const storedItemList = localStorage.getItem('itemList');
    return storedItemList ? JSON.parse(storedItemList) : [];
  });
  const [tache, setTache] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [dueTime, setDueTime] = useState<string>("")
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const dateTime = new Date().toISOString().split('T')[0];
  const [activeTab, setActiveTab] = useState<string>('tasks'); 
  const [selectedTask, setSelectedTask] = useState<ListItem | null>(null);
  type TaskPriority = "low" | "medium" | "high";
  const [priority, setPriority] = useState<TaskPriority>('low');  
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const exampleJson = `[{"id":10,"title":"laver","content":"faire machine à laver","done":false,"dueDate":"2024-01-17","dueTime":"14:00","priority":"high"},{"id":11,"title":"bien","content":"joué","done":true,"dueDate":"2024-01-26","dueTime":"16:05","priority":"medium"}]`;

  const modalStyles: Styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: 'black', // Couleur du texte
      textAlign: 'center', // Centrage du texte
    },
  };

  const closeModal = () => {
    setTaskToDeleteId(null);
    setConfirmDelete(false);
  };

  useEffect(() => {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }, [itemList]);

  function onChangeTache(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    setTache(text);
  }
  function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>){
    const text = String(e.currentTarget.value);
    setDescription(text);
  }
  function onChangeDueDate(e: React.ChangeEvent<HTMLInputElement>){
    const date = e.currentTarget.value;
    setDueDate(date);
  }
  function onChangeDueTime(e: React.ChangeEvent<HTMLInputElement>){
    const time = e.currentTarget.value;
    setDueTime(time);
  }

  function addTache(tache: string, description: string, dueDate: string, dueTime: string, priority: 'low' | 'medium' | 'high') {
    if (tache != "" && description != "" && dueDate != "" && dueTime != ""){
      const newItemList = [...itemList, { 
        id: itemList.length + 1, 
        title: tache, 
        content: description, 
        done: false, 
        dueDate, dueTime , priority
      }];
      setItemList(newItemList);
      setTache('');
      setDescription('');
      setDueDate("");
      setDueTime("")
      setAddTask(false);
      setPriority('low')
      setItemList(newItemList);
      scrollToTopWithDelay();
    }else {
      scrollToDownSide();
      setError("Fields cannot be empty");
    }
  }
  
  function deleteTache(id: number) {
    setTaskToDeleteId(id);
    setConfirmDelete(true);
  }

  function confirmDeleteTask() {
    if (taskToDeleteId !== null) {
      const updatedItemList = itemList.filter((item) => item.id !== taskToDeleteId);
      setItemList(updatedItemList);
      setTaskToDeleteId(null);
      setConfirmDelete(false);
    }
  }
  

  function editTache(id: number, newTitle: string, newContent: string, date: string, time: string, priority: 'low' | 'medium' | 'high') {
    const updatedItemList = itemList.map((item) =>
      item.id === id ? { ...item, title: newTitle, content: newContent, dueDate: date, dueTime: time, priority: priority} : item
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
    let filteredItems = items;

    if (searchTerm) {
      const options = {
        keys: ['title', 'content'],
        threshold: 0.3,
      };
  
      const fuse = new Fuse(filteredItems, options);
      const result = fuse.search(searchTerm);
  
      filteredItems = result.map((item) => item.item);
    }

    if (selectedPriority) {
      const options = {
        keys: ['priority'],
        threshold: 0.3,
      };
  
      const fuse = new Fuse(filteredItems, options);
      const result = fuse.search(selectedPriority);
  
      filteredItems = result.map((item) => item.item);
    }
  
    return filteredItems;
  }

  function getPriorityClass(priority: TaskPriority): string {
    switch (priority) {
      case 'low':
        return 'low-priority';
      case 'medium':
        return 'medium-priority';
      case 'high':
        return 'high-priority';
      default:
        return '';
    }
  }  

  function scrollToDownSide() {
    const scrollToY = window.innerHeight;
  
    window.scrollTo({
      top: scrollToY,
      behavior: 'smooth',
    });
  }

  function scrollToTopWithDelay() {
    setTimeout(function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 10); 
  }
  


  function mapTasksToEvents(tasks: ListItem[]): any[] {
    return tasks.map((task) => ({
      title: task.title,
      start: `${task.dueDate}T${task.dueTime}`,
      allDay: false,
      className: getPriorityClass(task.priority), // Ajoutez cette ligne
    }));
  }
  

  function handleEventClick(clickInfo: EventClickArg) {
    const taskTitle = clickInfo.event.title;

    const clickedTask = itemList.find((task) => task.title === taskTitle);

    if (clickedTask) {
      if (selectedTask && selectedTask.id === clickedTask.id) {
        setSelectedTask(null);
      } else {
        setSelectedTask(clickedTask);
      }
    } else {
      setSelectedTask(null);
    }
    
    scrollToDownSide();
  }

  function filterByPriority(priority: TaskPriority | null) {
    setSelectedPriority(priority);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderPriorityButton = (priority: TaskPriority, label: string, icon: any) => (
  <button
    key={priority}
    className={`priority-button ${selectedPriority === priority ? 'active' : ''}`}
    onClick={() => filterByPriority(selectedPriority === priority ? null : priority)}
  >
    {label}&nbsp;&nbsp;&nbsp;
    <FontAwesomeIcon icon={icon} />
  </button>

  );

  const exportTasks = () => {
    const exportedData = JSON.stringify(itemList);
    const blob = new Blob([exportedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTasks = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target?.result as string);
        const uniqueImportedTasks = importedTasks.filter((importedTask: ListItem) => {
          return !itemList.some((existingTask: ListItem) => existingTask.id === importedTask.id);
        });
        setItemList((prevItemList) => [...prevItemList, ...uniqueImportedTasks]);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
  
    reader.readAsText(file);
  };
  

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("1")
    if (file) {
      console.log("2")
      importTasks(file);
    }
  };
  
return (
  <div className="App">
    <div className='navbar'>
      <h1>Todo List</h1>
      <div className="tabs">
        <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
          Tasks
        </button>
        <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>
          Calendar
        </button>
        <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
          Statistics
        </button>
        <Button label="Export" onClick={exportTasks} children={undefined} />
        <label htmlFor="import-file" className="import-label">
          Import
        </label>
        <input
          type="file"
          id="import-file"
          accept=".json"
          onChange={handleImportFileChange}
          style={{ display: 'none' }}
        />
        <Button label="Show JSON Info" onClick={() => setShowInfo(true)} children={undefined} />

        <InfoPopUp isOpen={showInfo} onRequestClose={() => setShowInfo(false)} jsonContent={exampleJson} />
      </div>  
    </div>

      {activeTab === 'calendar' && (
        <div className="demo-app-main">
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
        
        {selectedTask && (
          <div>
            <h3>Selected Task</h3>
            <p>Title: {selectedTask.title}</p>
            <p>Description: {selectedTask.content}</p>
          </div>
        )}
      </div>
      )}

      {activeTab === 'stats' && (
        <div>
          <h2>Nombre de tâches: {itemList.length}</h2>
         <Stats tasks={itemList} />
        </div>
      )}

      {activeTab === 'tasks' && (
      <div >
        <div className='navbartasks'>
          <h2>Tasks</h2>
          <button onClick={() => {
            setSearchTerm(""); 
            setSelectedPriority(null);
            setShowSearch(!showSearch); 
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
            <div className="priority-filters">
              {renderPriorityButton('low', 'Low', faSearch)}
              {renderPriorityButton('medium', 'Medium', faSearch)}
              {renderPriorityButton('high', 'High', faSearch)}
            </div>
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
                <Modal
                  isOpen={confirmDelete}
                  onRequestClose={closeModal}
                  style={modalStyles}
                  contentLabel="Confirm Delete Modal"
                >
                  <p>Delete this task?</p>
                  <div>
                    <Button label="Cancel" onClick={closeModal} children={undefined} />
                    <Button label="Delete" onClick={confirmDeleteTask} children={undefined} />
                  </div>
                </Modal>
              </div>
              </div>
              {
                addTask === true ? 
                <div className='add-task'>
                  <input type="text" placeholder='Title' value={tache} onChange={ onChangeTache }></input>
                    <input type="text" placeholder='Description' value={description} onChange={ onChangeDescription }></input>
                    <input type="date" placeholder="Expiry date" value={dueDate || ''} onChange={onChangeDueDate}></input>
                    <input type="time"  value={dueTime || ''} onChange={onChangeDueTime}></input>
                    <div className="label-select-container">
                      <label htmlFor="priority">Priority:</label>
                      <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                      <Button label='Confirm' onClick={() => {
                            addTache(tache, description, dueDate, dueTime || '', priority);
                          } } children={undefined} />
                      <Button label='Cancel' onClick={() => {
                            setAddTask(false);
                            setTache("");
                            setDescription("");
                            setDueDate("");
                            setError(null);
                            setPriority("low");
                            scrollToTopWithDelay();
                          } } children={undefined} />
                    </div>
                </div>
                :
                <div className='add-task'>
                  <Button label='Add a task' onClick={() => { setAddTask(true); scrollToDownSide(); }} children={undefined} />
                </div>
            }
  </div>
)}
    </div>
);


}

export default App;

