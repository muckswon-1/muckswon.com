import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {

  const [message, setMessage] = useState('');
  
  useEffect(  () => {

    const getMessage = async () => {
      const response = await axios.get('http://localhost:3000/')
      setMessage(response.data);
    }

    getMessage();
    


  },[])

  return (
    <>
      {
        message && <h1>{message}</h1>
      }
    </>
  )
}

export default App
