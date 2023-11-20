import React, { useState } from 'react';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const chats = ['Chat 1', 'Chat 2', 'Chat 3']; // replace with your chat data
  const messages = [
    { type: 'received', text: 'Message 1' },
    { type: 'sent', text: 'Message 2' },
    { type: 'received', text: 'Message 3' },
  ]; // replace with your message data

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Check if screen size is small (less than 640px)
    if (window.innerWidth < 640) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex justify-start min-h-screen bg-backgroundLight dark:bg-secondaryBackgroundDark">
      <div className={`h-screen bg-backgroundLight dark:bg-primary space-y-6 py-7 px-2 overflow-auto ${isMenuOpen ? 'w-full sm:w-1/3 md:w-1/4 lg:w-1/5' : 'hidden'}`}>
        <div className="flex justify-between items-center border-b-2 border-accent">
          <h2 className="text-2xl font-extrabold text-textLight dark:text-textDark">Chats</h2>
        </div>

        <nav>
          <ul className="space-y-2">
            {chats.map((chat, index) => (
              <li key={index}>
                <button onClick={() => handleChatSelect(chat)} 
                  className={`w-full text-left text-textLight dark:text-textDark p-2 rounded-lg bg-backgroundLight dark:bg-secondaryBackgroundDark ${selectedChat === chat ? 'border-accent border-2' : ''}`}>{chat}
                </button>
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
                <h2 className="text-2xl font-extrabold text-textLight dark:text-textDark">{selectedChat}</h2>
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
                <input type="text" className="flex-grow p-2 rounded-lg bg-secondaryBackgroundLight dark:text-textDark dark:bg-secondaryBackgroundDark focus:border-accent focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-99" />
                <button className="text-accent">🙂</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
