import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddChatModal from '../../components/addModalChat';
import io from 'socket.io-client';
import axios from "axios";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const socket = io('http://localhost:3000/chat', {
      query: {
        accessToken: currentUser.accessToken,
      },
    });
    setSocket(socket);

    socket.on('chatToClient', (messagesArray) => {
      console.log('chat MSG: ', messagesArray);
      setMessages((prevMessages) => {
        // Create a new array that includes all previous messages
        let newMessages = [...prevMessages];
        // Iterate over the array of new messages
        for (let message of messagesArray) {
          // Check if the message already exists in the state
          const messageExists = prevMessages.some((prevMessage) => prevMessage.id === message.id);
          if (!messageExists) {
            // If the message doesn't exist, add it to the new array
            newMessages.push(message);
          }
        }
        // Return the new array
        console.log('newarr: ', newMessages);
        return newMessages;
      });
    });

    const fetchChats = async () => {
      try {
        const response = await axios.get(`/api/users/${currentUser.user.id}/chats`);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats: ", error);
      }
    };

    fetchChats();

    return () => socket.close();
  }, [currentUser]);

  useEffect(() => {
    // console.log('Updated messages: ', messages);
  }, [messages]);

  const addChat = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    if (window.innerWidth < 640) {
      setIsMenuOpen(false);
    }
  
    if (socket) {
      if (selectedChat) {
        socket.emit('leaveChat', selectedChat.id); // Leave the previous chat room
      }
    }
  
    const chatSocket = io('http://localhost:3000/chat', {
      query: { chatId: chat.id },
    });
  
    chatSocket.emit('joinChat', chat.id); // Join the new chat room

    chatSocket.emit('requestMessages', chat.id);
    console.log('chatID: ', chat.id);
    chatSocket.on('chatToClient', (messages) => {
      // console.log('Received messages: ', messages);
      setMessages(messages);
    });
    setSocket(chatSocket);
    // Clear the messages state when a new chat is selected
    setMessages([]);
  };
  
  useEffect(() => {
    return () => {
      if (socket) {
        if (selectedChat) {
-          socket.emit('leaveChat', selectedChat.id); // Leave the chat room when the component unmounts
        }
      }
    };
  }, [socket, selectedChat]);

  const handleSendMessage = (text) => {
    if (socket && text.trim() !== '') {
      socket.emit('sendMessage', {
        text: text,
        userId: currentUser.user.id,
        chatId: selectedChat.id
      });
      socket.on('newMessage', (message) => {
        console.log('msmsms: ', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      })
      setNewMessage('');
    }
  };
  
  return (
    <div className="flex justify-start min-h-screen bg-backgroundLight dark:bg-secondaryBackgroundDark">
      <AddChatModal isOpen={isModalOpen} onRequestClose={closeModal} setChats={setChats} />
      <div className={`h-screen bg-backgroundLight dark:bg-primary space-y-6 py-7 px-2 overflow-auto ${isMenuOpen ? 'w-full sm:w-1/3 md:w-1/4 lg:w-1/5' : 'hidden'}`}>
        <div className="flex justify-between items-center border-b-2 border-accent">
          <h2 className="text-2xl font-extrabold text-textLight dark:text-textDark">Chats</h2>
          <button onClick={addChat} className="text-textDark bg-accent p-2 rounded mb-4">Add</button>
        </div>
        <nav>
          <ul className="space-y-2">
          {chats.map((chat, index) => (
            <li key={index}>
              <button onClick={() => handleChatSelect(chat)} className={`w-full text-left text-textLight dark:text-textDark p-2 rounded-lg bg-backgroundLight dark:bg-secondaryBackgroundDark ${selectedChat === chat ? 'border-accent border-2' : ''}`}>{chat.name}</button>
            </li>
          ))}
          </ul>
        </nav>
      </div>
      <div className={`flex-grow w-full h-screen overflow-auto bg-backgroundLight dark:bg-backgroundDark ${isMenuOpen ? 'hidden sm:block sm:w-2/3' : 'w-full'}`}>
        {selectedChat && (
          <div className="flex flex-col h-full">
            <div className="py-8 px-6 flex-grow overflow-auto">
              <div className="flex justify-between items-center border-b-2 border-accent">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-textDark bg-accent p-2 rounded mb-4">{isMenuOpen ? 'Hide Chats' : 'Chats'}</button>
                <h2 className="text-2xl font-extrabold text-textLight dark:text-textDark">{selectedChat.name}</h2>
              </div>
              <div className="mt-6 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`p-4 rounded-lg ${message.type === 'received' ? 'bg-secondaryBackgroundLight dark:bg-secondaryBackgroundDark' : 'bg-accentHover'}`}> 
                    <p className="text-textLight dark:text-textDark">{message.text}</p> 
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}  className="flex-grow p-2 rounded-lg bg-secondaryBackgroundLight dark:text-textDark dark:bg-secondaryBackgroundDark focus:border-accent focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-99" />
                <button className="text-accent">🙂</button>
                <button onClick={() => handleSendMessage(newMessage)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-accent">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
                {/* <button onClick={() => handleSendMessage('Hello, world!')}>Send Message</button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
