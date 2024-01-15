import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from './Button';

interface InfoPopUpProps {
  isOpen: boolean;
  onRequestClose: () => void;
  jsonContent: string;
}

const InfoPopUp: React.FC<InfoPopUpProps> = ({ isOpen, onRequestClose, jsonContent }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(jsonContent);
    setCopySuccess(true);

    // Reset copy success message after a brief delay
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="JSON Info Modal"
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
         transform: 'translate(-50%, -50%)',
         color: 'black',
         wordWrap: 'break-word',
         wordBreak: 'break-all',
       },
     }}
    >
      <p>JSON Content</p>
      <pre>{JSON.stringify(JSON.parse(jsonContent), null, 2)}</pre>
      <div>
        <Button label="Copy JSON" onClick={handleCopyClick} children={undefined} />
        {copySuccess && <span style={{ color: 'green', marginLeft: '10px' }}>Copied!</span>}
        <Button label="Close" onClick={onRequestClose} children={undefined} />
      </div>
    </Modal>
  );
};

export default InfoPopUp;
