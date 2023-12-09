import React, { useState } from 'react';
import ActionButton from './ActionButton';

const Comments = ({ movieId, addComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      addComment(movieId, commentText);
      setCommentText(''); 
    }
  };

  return (
    <div className="mt-2">
      <textarea
        value={commentText}
        onChange={handleCommentChange}
        placeholder="Add your comment..."
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
      ></textarea>
      <ActionButton bgColor="blue" action="addComment" onClick={handleAddComment} />
    </div>
  );
};

export default Comments;
