import React, { useState, useReducer, useCallback, useMemo, useTransition, useDeferredValue } from 'react';
import Post from './Post';

const initialPosts = [
  { id: 1, content: 'Hello world!' },
  { id: 2, content: 'React hooks are awesome.' },
  { id: 3, content: 'This is a simple blog post.' },
];

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return state.map(post =>
        post.id === action.id ? { ...post, content: action.content } : post
      );
    default:
      return state;
  }
}

export default function PostList() {
  const [posts, dispatch] = useReducer(reducer, initialPosts);

  // useCallback to memoize update function
  const updatePost = useCallback((id, content) => {
    dispatch({ type: 'update', id, content });
  }, []);

  // useMemo to memoize post count
  const postCount = useMemo(() => posts.length, [posts]);

  // useTransition to manage UI update on big lists (not really needed here, but demo)
  const [isPending, startTransition] = useTransition();

  // useDeferredValue to defer expensive input updates (demo)
  const [filter, setFilter] = React.useState('');
  const deferredFilter = useDeferredValue(filter);

  // Filter posts by content
  const filteredPosts = posts.filter(p =>
    p.content.toLowerCase().includes(deferredFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Posts ({postCount})</h2>

      <input
        placeholder="Filter posts..."
        value={filter}
        onChange={e => {
          const val = e.target.value;
          startTransition(() => {
            setFilter(val);
          });
        }}
      />

      {isPending && <p>Updating posts...</p>}

      {filteredPosts.map(post => (
        <Post key={post.id} post={post} onUpdate={updatePost} />
      ))}
    </div>
  );
}
