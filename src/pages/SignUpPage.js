import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"



export default function SignUpPage() {

  const Navigate = useNavigate();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ validate, setValidate ] = useState();

  function SignUp(name, email, password, validate){
    if(!(password === validate)) return alert("Senhas não conferem");
    const body = {name, email, password};
    axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, body)
      .then((response) => {
        alert(`Usuário criado`);
        Navigate("/")
      })
      .catch((error) => {
        alert(error.response.data)
      })
  }


  return (
    <SingUpContainer>
      <form action="">
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" value={validate} onChange={(e) => setValidate(e.target.value)} />
        <button type="button" onClick={() => SignUp(name, email, password, validate)} >Cadastrar</button>
      </form>
      <span></span>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
