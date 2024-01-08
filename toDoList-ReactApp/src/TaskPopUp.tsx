import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ListItem {
 id: number;
 title: string;
 content: string;
 done: boolean;
 dueDate?: string;
 dueTime?: string;
 priority: 'low' | 'medium' | 'high';
}

interface TaskPopupProps {
  isOpen: boolean;
  onClose: () => void;
  item: ListItem;
}

const TaskPopup: React.FC<TaskPopupProps> = ({ isOpen, onClose, item }) => {
  return (
   <Modal
   isOpen={isOpen}
   onRequestClose={onClose}
   contentLabel="Task Details"
   style={{
     overlay: {
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
     },
     content: {
       width: '50%',
       maxHeight: '80%',
       overflowY: 'auto',
       top: '50%',
       left: '50%',
       right: 'auto',
       bottom: 'auto',
       marginRight: '-25%',
       transform: 'translate(-50%, -50%)',
       color: 'black',
       textAlign: 'center',
       wordWrap: 'break-word',
       wordBreak: 'break-all',
     },
   }}
 >
   <p>{item.title}</p>
   <p>{item.content}</p>
   <p>{item.dueDate}</p>
   <p>{item.priority} priority</p>
   <button onClick={onClose}>
     <FontAwesomeIcon icon={faTimes} />
   </button>
 </Modal>
  );
};

export default TaskPopup;
