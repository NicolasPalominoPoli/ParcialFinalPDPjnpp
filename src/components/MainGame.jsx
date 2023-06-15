import Button from "@mui/material/Button";
import PlayerDeck from "./PlayerDeck";
import UsersContext from "../context/UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const MainGame = () => {
  const { handlerCards, winner } = useContext(UsersContext);
  return (
    <div>
      <NavLink to = {winner !== "" ? "/gameover" : "/game" }>
        <Button variant="contained" onClick={handlerCards}>
          Cards
        </Button>
      </NavLink>
        <PlayerDeck></PlayerDeck>
    </div>
  )
}

export default MainGame