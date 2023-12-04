import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddChatModal = ({ isOpen, onRequestClose, onAddChat, setChats }) => {
  const [chatName, setChatName] = useState('');
  const currentUser = useSelector(state => state.user.currentUser);

  const handleAddChat = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/api/chats', {
        id: currentUser.id, // Use the user ID from the Redux store
        name: chatName,
      });
  
      // Handle response here. For example:
      console.log(response.data);
      if (typeof onAddChat === 'function') {
        onAddChat(chatName);
      }
  
      // Close the modal
      onRequestClose();
  
      // Refresh the chat list
      const chatResponse = await axios.get(`/api/users/${currentUser.user.id}/chats`);
      setChats(chatResponse.data);
    } catch (error) {
      console.error("Error adding chat: ", error);
    }
  
    setChatName('');
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Chat"
      className="flex items-center justify-center min-h-screen px-4 py-12 bg-secondaryBackgroundDark"
    >
      <div className="w-full max-w-md p-8 space-y-4 bg-primary rounded-lg">
        <h2 className="text-2xl font-extrabold text-textDark">Add Chat</h2>
        <button
          onClick={onRequestClose}
          className="absolute top-0 right-0 m-4 text-textDark bg-accent p-2 rounded"
        >
          close
        </button>
        <form onSubmit={handleAddChat} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Chat Name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="w-full p-2 rounded-lg text-textDark bg-secondaryBackgroundDark focus:border-accent focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-99"
          />
          <button
            type="submit"
            className="w-full mt-4 text-textDark bg-accent p-2 rounded"
          >
            Add
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddChatModal;
