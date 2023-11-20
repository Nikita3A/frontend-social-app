import React from 'react';

const MyButton = ({ onClick, children }) => {
  return <button className='bg-green-300 hover:bg-green-400 w-18 rounded-full border-2 p-4'
   onClick={onClick}>{children}</button>;
};

export default MyButton;