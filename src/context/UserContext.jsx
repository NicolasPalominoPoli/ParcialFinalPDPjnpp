import { createContext, useState } from "react";
import axios from "axios";

const UsersContext = createContext();

const users = [
  { id: 1, name: "One" }
];

var GameId = "";

// eslint-disable-next-line react/prop-types
const UsersProvider = ({ children }) => {
  const [Users, setUsers] = useState(users);
  const [playerOneCards, setplayerOneCards] = useState([]);
  const [auxCard, setAuxCard] = useState([]);
  const [count, setCount] = useState(1);
  const [winner, setWinner] = useState('');

  const getplayerOneInitialCards = async () => {
    const url = `https://deckofcardsapi.com/api/deck/${GameId}/draw/?count=1`;
    const response = await fetch(url);
    const data = await response.json();
    setplayerOneCards(data.cards);
  };

  const handlerUsers = () => {
    const newUsers = { Users, name: document.getElementById("1").value };
    setUsers(newUsers);

    const query = async () => {
      const url = `https://deckofcardsapi.com/api/deck/new/shuffle`;
      const { data } = await axios(url);
      GameId = data.deck_id;
      console.log(GameId);
      getplayerOneInitialCards();
    };
    query();
  };

  const getplayerOneCard = async () => {
    const url = `https://deckofcardsapi.com/api/deck/${GameId}/draw/?count=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.cards[0]);
    setAuxCard(data.cards[0]);
    console.log(playerOneCards[0].suit);
    console.log(data.cards[0].suit);

    if(data.cards[0].value == playerOneCards[0].value)
    {
      console.log("SON IGUALES LAS LETRAS");
      
      if(data.cards[0].suit == 'CLUBS' && playerOneCards[0].suit == 'DIAMONDS' || data.cards[0].suit == 'DIAMONDS' && playerOneCards[0].suit == 'CLUBS')
      {
        console.log("SON PINTAS OPUESTAS");
        setWinner(`El jugador ${users[0].name} ha ganado el juego`);
        setCount(52);
        
      }
      else if(data.cards[0].suit == 'HEARTS' && playerOneCards[0].suit == 'SPADES' || data.cards[0].suit == 'SPADES' && playerOneCards[0].suit == 'HEARTS')
      {
        console.log("SON PINTAS OPUESTAS");
        setWinner(`El jugador ${users[0].name} ha ganado el juego`);
        setCount(52);
      }
    }

  };


  const handlerCards = () => {
    if (count < 52) {
      setCount(count + 1);
      console.log(count);
      getplayerOneCard();
    }
  };

  return (
    <UsersContext.Provider
      value={{
        Users,
        handlerUsers,
        playerOneCards,
        auxCard,
        handlerCards,
        count,
        winner
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;
