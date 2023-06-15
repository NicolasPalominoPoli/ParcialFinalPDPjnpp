import Card from "./Card";
import { useContext } from "react";
import UsersContext from "../context/UserContext";
import ImageList from "@mui/material/ImageList";

const PlayerDeck = () => {
  const { Users, playerOneCards, playerTwoCards } = useContext(UsersContext);
  return (
    <div>
      <h3>Player {Users.find(user => user.id==1).name}</h3>
      <p>Cards obtained</p>
      <ImageList sx={{ width: 1300, height: 164 }} cols={10} rowHeight={164}>
        {playerOneCards.map((card) => (
          
            <Card key={card.code} imagen={card.image} />
        ))}
      </ImageList>
      <h3>Player {Users.find(user => user.id==2).name}</h3>
      <p>Cards obtained</p>
      <ImageList sx={{ width: 1300, height: 164 }} cols={10} rowHeight={164}>
        {playerTwoCards.map((card) => (
            <Card key={card.code} imagen={card.image} />
        ))}
      </ImageList>
    </div>
  );
};

export default PlayerDeck;
