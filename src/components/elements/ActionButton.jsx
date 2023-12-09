import React from 'react';

const ActionButton = ({ bgColor, action, onClick }) => {
  const getButtonClasses = () => {
    let buttonClasses = 'py-2 my-2 px-4 rounded text-white cursor-pointer';
    if (bgColor) {
      buttonClasses += ` bg-${bgColor}-500 hover:bg-${bgColor}-600`;
    }
    return buttonClasses;
  };

  return (
    <button onClick={onClick} className={getButtonClasses()}>
      {action === 'addComment' ? 'Add Comment' : 'Remove Favorite'}
    </button>
  );
};

export default ActionButton;
