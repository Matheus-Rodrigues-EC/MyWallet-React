import axios from "axios"
import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [operations, setOperation] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState("");


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/home`, 
      {
        headers: {
          'Authorization': `Baerer ${token}` 
        }
      }
    )
      .then((response) => {
        const list = response.data.list;
        setUser(response.data.user)
        setOperation(list.reverse());
        let sum = 0;
        for (let i = 0; i < list.length; i++) {
          if(list[i].type === "entrada"){
            sum += Number(list[i].value);
          }
          if(list[i].type === "saida"){
            sum -= Number(list[i].value);
          }
        }
        // console.log(sum)
        setTotal(sum);
        return;
      })
      .catch((error) => {
        alert(error);
        Navigate("/");
      })
  }, [Navigate, token, operations, setOperation])

  function logOut(){
    localStorage.removeItem("token");
    alert("Sessão encerrada.")
    Navigate("/");
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={() => logOut()} />
      </Header>

      <TransactionsContainer>
        <UL>
          {operations.map((op) => {
              
              return(
                <ListItemContainer key={op._id}>
                  <div>
                    <span>{op.date}</span>
                    <strong>{op.description}</strong>
                  </div>
                  <Value color={(op.type === "entrada")? "positivo" : "negativo"}>
                    {(Number(op.value)).toFixed(2)}
                  </Value>
                </ListItemContainer>
              )
          })}
        </UL>

        <article>
          <strong>Saldo</strong>
          <Value color={(total >= 0) ? "positivo" : "negativo" }>
            {(Number(total)).toFixed(2)}
          </Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => Navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => Navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 70%;
  justify-content: space-between;
  box-sizing: border-box;
  article {
    display: flex;
    height: 20px;
    align-items: end;
    background-color: #fff;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const UL = styled.ul`
  height: 95%;
  overflow-y: scroll;
`

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`