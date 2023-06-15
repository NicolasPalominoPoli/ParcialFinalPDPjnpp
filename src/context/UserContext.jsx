import { createContext, useState } from "react";
import axios from "axios";

const UsersContext = createContext();

const users = [
  { id: 1, name: "One" },
  { id: 2, name: "Two" },
];

var GameId = "";

// eslint-disable-next-line react/prop-types
const UsersProvider = ({ children }) => {
  const [Users, setUsers] = useState(users);
  const [playerOneCards, setplayerOneCards] = useState([]);
  const [playerTwoCards, setplayerTwoCards] = useState([]);
  const [count, setCount] = useState(1);
  const [winner, setWinner] = useState('');

  const getplayerOneInitialCards = async () => {
    const url = `https://deckofcardsapi.com/api/deck/${GameId}/draw/?count=10`;
    const response = await fetch(url);
    const data = await response.json();
    setplayerOneCards(data.cards);
  };
  const getplayerTwoInitialCards = async () => {
    const url = `https://deckofcardsapi.com/api/deck/${GameId}/draw/?count=10`;
    const response = await fetch(url);
    const data = await response.json();
    setplayerTwoCards(data.cards);
  };

  const handlerUsers = () => {
    const newUsers = Users.map((u) =>
      u.id === 1
        ? { ...u, name: document.getElementById("1").value }
        : { ...u, name: document.getElementById("2").value }
    );
    setUsers(newUsers);

    const query = async () => {
      const url = `https://deckofcardsapi.com/api/deck/new/shuffle/`;
      const { data } = await axios(url);
      GameId = data.deck_id;
      console.log(GameId);
      getplayerOneInitialCards();
      getplayerTwoInitialCards();
    };
    query();
  };

  const getplayerOneCard = async () => {
    const url = `https://deckofcardsapi.com/api/deck/${GameId}/draw/?count=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.cards[0]);
    modifyPlayerOneCards(data.cards[0]);
  };

  const modifyPlayerOneCards = (newCardRequest) => {
    const newCardValue = newCardRequest.value;
    const newCardSuit = newCardRequest.suit;

    const auxFilterPlayerOneCardsValue = playerOneCards.filter(
      (c) => c.value === newCardValue
    );
    console.log(auxFilterPlayerOneCardsValue);

    if (auxFilterPlayerOneCardsValue.length >= 1) {
      const auxFilterPlayerOneCardsSuit = auxFilterPlayerOneCardsValue.filter(
        (c) => c.suit === newCardSuit
      );
      if (auxFilterPlayerOneCardsSuit.length == 0) {
        console.log("No hay cartas de esta pinta, se mete al mazo");
        const auxModifyDifferentCard = playerOneCards.filter(
          (c) => c.value != newCardValue
        );
        console.log("Arreglo de cartas diferentes: ");
        console.log(auxModifyDifferentCard);

        const valueCount = {};
        const uniqueCards = [];

        for (const card of auxModifyDifferentCard) {
          if (valueCount[card.value]) {
            valueCount[card.value]++;
          } else {
            valueCount[card.value] = 1;
            uniqueCards.push(card);
          }
        }

        var filteredCards = uniqueCards.filter(
          (card) => valueCount[card.value] === 1
        );

        if (filteredCards.length == 0) {
          filteredCards = uniqueCards.filter(
            (card) => valueCount[card.value] === 2
          );
        }
        if (filteredCards.length != 0) {
          console.log("Cartas filtradas: ");
          console.log(filteredCards);

          const codeReplaceCard =
            filteredCards[Math.floor(Math.random() * filteredCards.length)]
              .code;
          console.log(codeReplaceCard);

          const newPlayerOneCards = playerOneCards.map((u) =>
            u.code === codeReplaceCard ? newCardRequest : u
          );
          setplayerOneCards(newPlayerOneCards);
        }
        else
        {
            setWinner(`El jugador ${users[0].name} ha ganado el juego`);
            setCount(16);
        }
      } else console.log("Hay cartas de esta pinta, no se mete al mazo");
    } else {
      console.log("No hay de este valor, no se mete");
    }
  };

  const getplayerTwoCard = async () => {
    const url = `https://deckofcardsapi.com/api/deck/${GameId}/draw/?count=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.cards[0]);
    modifyPlayerTwoCards(data.cards[0]);
  };

  const modifyPlayerTwoCards = (newCardRequest) => {
    const newCardValue = newCardRequest.value;
    const newCardSuit = newCardRequest.suit;

    const auxFilterPlayerTwoCardsValue = playerTwoCards.filter(
      (c) => c.value === newCardValue
    );
    console.log(auxFilterPlayerTwoCardsValue);

    if (auxFilterPlayerTwoCardsValue.length >= 1) {
      const auxFilterPlayerTwoCardsSuit = auxFilterPlayerTwoCardsValue.filter(
        (c) => c.suit === newCardSuit
      );
      if (auxFilterPlayerTwoCardsSuit.length == 0) {
        console.log("No hay cartas de esta pinta, se mete al mazo");
        const auxModifyDifferentCard = playerTwoCards.filter(
          (c) => c.value != newCardValue
        );
        console.log("Arreglo de cartas diferentes: ");
        console.log(auxModifyDifferentCard);

        const valueCount = {};
        const uniqueCards = [];

        for (const card of auxModifyDifferentCard) {
          if (valueCount[card.value]) {
            valueCount[card.value]++;
          } else {
            valueCount[card.value] = 1;
            uniqueCards.push(card);
          }
        }

        var filteredCards = uniqueCards.filter(
          (card) => valueCount[card.value] === 1
        );

        if (filteredCards.length == 0) {
          filteredCards = uniqueCards.filter(
            (card) => valueCount[card.value] === 2
          );
        }

        if (filteredCards.length != 0) {
          console.log("Cartas filtradas: ");
          console.log(filteredCards);

          const codeReplaceCard =
            filteredCards[Math.floor(Math.random() * filteredCards.length)]
              .code;
          console.log(codeReplaceCard);

          const newPlayerTwoCards = playerTwoCards.map((u) =>
            u.code === codeReplaceCard ? newCardRequest : u
          );
          setplayerTwoCards(newPlayerTwoCards);
        }
        else
        {
            setWinner(`El jugador ${users[1].name} ha ganado el juego`);
            setCount(16);
        }
      } else console.log("Hay cartas de esta pinta, no se mete al mazo");
    } else {
      console.log("No hay de este valor, no se mete");
    }
  };

  const handlerCards = () => {
    if (count < 17) {
      setCount(count + 1);
      getplayerOneCard();
      getplayerTwoCard();
    }
  };

  return (
    <UsersContext.Provider
      value={{
        Users,
        handlerUsers,
        playerOneCards,
        playerTwoCards,
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
