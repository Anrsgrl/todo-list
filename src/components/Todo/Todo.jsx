import React, { useState } from 'react';
import { motion } from "framer-motion"
import {Card, CardContent, TextField, InputAdornment, ToggleButton, Typography, IconButton} from '@mui/material';
import {RadioButtonChecked, Check, Clear, Add, PlaylistRemove} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Todo.scss';

function Todo() {
  const [liste, setListe] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [working, setWorking] = useState(true);

  const deleteItems = (index) => {
    toast('🗑️Deleted!', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const updatedItems = liste.filter((el)=> {
      return index !== el.id;
    });
    setListe(updatedItems);
  }

  const addItems = () => {
    if(newTitle !== ""){
      setListe([...liste, {id: Date.now(), title: newTitle, completed: false }]); setNewTitle("");
      setWorking(true);
    } else{
      setWorking(false);
    }
    
  }

  const setCompleted = (item) => {
    setListe(liste.map(el => el.id === item.id ? {...el, completed: !el.completed} : el));
    toast.success('Good Job!', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <motion.div className="Todo-field" 
    initial={{y: 0}}
    animate={{y: 200}}
    transition={{duration: 2}}
    >
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
              <IconButton onClick={() => setListe([])} className='clearBtn'>
                <PlaylistRemove />
              </IconButton>
              </InputAdornment>
          }} 
          fullWidth 
          required
          />
          <p className={working ? 'error-msg' : 'error-msg active'}>You have to write something</p>
          </CardContent>
        </Card>
        <div className="Todo-list-items">
        {liste.map((item, index) => 
          <>
            <Card key={index} className={item.completed ? 'done' : ''} sx={{mt: 2}}>
            <CardContent sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <ToggleButton
              onClick={() => {setCompleted(item)}}
              sx={{borderRadius:"50%"}}
              size='small'
              value="check"
            >
            <Check />
            <ToastContainer
              position="top-right"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              />
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
            </Card>
          </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Todo;