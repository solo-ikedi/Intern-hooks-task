import React, { useState, useRef, useEffect, useLayoutEffect, useImperativeHandle, forwardRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} {...props} />;
});

export default function Post({ post, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const inputRef = useRef();

  // useEffect to sync content when post changes
  useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  // useLayoutEffect to log layout updates
  useLayoutEffect(() => {
    if (isEditing) {
      console.log('Editing mode - layout effect');
    }
  }, [isEditing]);

  function save() {
    onUpdate(post.id, content);
    setIsEditing(false);
  }

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      {isEditing ? (
        <>
          <FancyInput
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={save}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          <button onClick={() => inputRef.current.focus()}>Focus Input</button>
        </>
      ) : (
        <>
          <p>{content}</p>
          <button onClick={() => setIsEditing(true)}>Edit Post</button>
        </>
      )}
    </div>
  );
}
