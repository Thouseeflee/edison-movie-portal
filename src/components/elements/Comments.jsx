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
      {/* <ActionButton bgColor="blue" action="addComment" onClick={handleAddComment} /> */}
      <button className="py-2 my-2 px-4 rounded text-white cursor-pointer bg-blue-500 hover:bg-blue-600" onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default Comments;
