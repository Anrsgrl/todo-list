import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './App.scss';
import Todo from './components/Todo/Todo';

function App() {
  let theme = createTheme({
    typography: {
      h5:{
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bolder', 
        lineHeight: '2',
        letterSpacing: '0.5em',
      }
    }
  })

  return (
    <div className="App">
      <div className="App-bg"></div>
      <ThemeProvider theme={theme}>
        <Todo />
      </ThemeProvider>
    </div>
  );
}

export default App;
