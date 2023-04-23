import axios from "axios"
import styled from "styled-components"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {

  const Navigate = useNavigate();
  const [value, setValue] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  function sendOperation(value, description, event){
    event.preventDefault();
    const body = {value, description};

    axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/entrada`, body, 
    {
      headers: {
        'Authorization': `Baerer ${token}` 
      }
    })
      .then((response) => {
        console.log(response.data);
        Navigate("/home");
      })
      .catch((error) => {
        alert(error.response.data);
        setLoading(false);
      })
  }


  return (
    <TransactionsContainer>
      <h1>Nova Entrada</h1>
      <form action="">
        <input 
          placeholder="Valor" 
          type="number" 
          required
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />

        <input 
          placeholder="Descrição" 
          type="text" 
          required
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button disabled={loading} onClick={(event) => {setLoading(true); sendOperation(value, description, event);}} >Salvar Entrada</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    h1 {
      align-self: flex-start;
      margin-bottom: 40px;
    }
`
