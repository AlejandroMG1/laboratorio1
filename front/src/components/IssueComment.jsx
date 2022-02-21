import React from 'react';

const IssueComment = ({ comment, user }) => {
  return (
    <div className='my-3'>
      <span className='block text-gray-700 text-lg font-bold '>{user}</span>
      <div className='block border border-grey-light w-full p-3 rounded mb-4'>
        {comment}
      </div>
    </div>
  );
};

export default IssueComment;
