import Card from "./Card";
import { useContext } from "react";
import UsersContext from "../context/UserContext";
import ImageList from "@mui/material/ImageList";

const PlayerDeck = () => {
  const { Users, playerOneCards, auxCard } = useContext(UsersContext);
  return (
    <div>
      <h3>Player {Users.name}</h3>
      <p>Card obtained</p>
      <ImageList sx={{ width: 1300, height: 164 }} cols={10} rowHeight={164}>
        {playerOneCards.map((card) => (
          
            <Card key={card.code} imagen={card.image} />
        ))}
      </ImageList>
      <h3>Carta nueva</h3>
      <ImageList sx={{ width: 1300, height: 164 }} cols={10} rowHeight={164}>
            <Card key={auxCard.code} imagen={auxCard.image} />
      </ImageList>
    </div>
  );
};

export default PlayerDeck;
