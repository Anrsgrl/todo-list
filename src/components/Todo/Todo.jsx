import React, { useState } from 'react';
import {Card, CardContent, TextField, InputAdornment, ToggleButton, Typography, IconButton} from '@mui/material';
import {RadioButtonChecked, Check, Clear, Add, PlaylistRemove} from '@mui/icons-material';
import './Todo.scss';

function Todo() {
  const [liste, setListe] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  const deleteItems = (index) => {
    const updatedItems = liste.filter((el)=> {
      return index !== el.id;
    });
    setListe(updatedItems);
  }

  const addItems = () => {
    setListe([...liste, {id: Date.now(), title: newTitle, completed: false }]); setNewTitle("");
  }

  return (
    <div className="Todo-field">
      <div className="Todo-list-area">
      <Typography variant='h5' gutterBottom>TODO</Typography>
        <Card>
          <CardContent>
           <TextField value={newTitle} onChange={e => setNewTitle(e.target.value)} 
           InputProps={{
            startAdornment: <InputAdornment position="start"><RadioButtonChecked /></InputAdornment>,
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={() => addItems()}>
                <Add />
              </IconButton>
              <IconButton onClick={() => setListe([])}>
                <PlaylistRemove />
              </IconButton>
              </InputAdornment>
          }} 
          fullWidth 
          required
          />
          {/* <button onClick={() => {setListe([...liste, {id: Date.now(), title: newTitle, completed: false }]); setNewTitle("")}}>XXXX</button> */}
          </CardContent>
        </Card>
        <div className="Todo-list-items">
        {liste.map((item, index) => 
          <Card key={index} className={item.completed ? 'done' : ''} sx={{mt: 2}}>
            <CardContent sx={{display:'flex', justifyContent:'space-between'}}>
              <ToggleButton
              onClick={() => {setListe(liste.map(el => el.id === item.id ? {...el, completed: !el.completed} : el))}}
              sx={{borderRadius:"50%"}}
              size='small'
              value="check"
            >
            <Check />
              </ToggleButton>
              {item.title}
            <ToggleButton
              onClick={() => deleteItems(item.id)}
              sx={{borderRadius:"50%"}}
              size='small'
              value="check"
            >
              <Clear />
              </ToggleButton>
            </CardContent>
          </Card>)}
        </div>
      </div>
    </div>
  )
}

export default Todo;