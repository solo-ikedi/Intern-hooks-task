import React, { useState, useContext } from 'react';
import PostList from './components/PostList';
import { ThemeContext } from './context/ThemeContext';
import { useFriendStatus } from './hooks/useFriendStatus';

function App() {
  const [theme, setTheme] = useState('light');

  // useContext example
  const themeValue = useContext(ThemeContext);

  // useFriendStatus (useDebugValue demo)
  const friendOnline = useFriendStatus(1);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ padding: 20, background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
        <h1>Simple Blog with React Hooks</h1>

        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme (Current: {theme})
        </button>

        <p>Friend is {friendOnline === null ? 'Loading...' : friendOnline ? 'Online' : 'Offline'}</p>

        <PostList />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
