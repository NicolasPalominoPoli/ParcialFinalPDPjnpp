import UsersContext from "../context/UserContext";
import { useContext } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const WinnerScreen = () => {
  const { winner } = useContext(UsersContext);
  return (
    <div>
      {winner === "" ? (
        <Alert severity="error">
          <AlertTitle>Game Over</AlertTitle>
          No ha ganado nadie, <strong>se han acabado las oportunidades.</strong>
        </Alert>
      ) : (
        <Alert severity="success">
          <AlertTitle>Winner</AlertTitle>
          <strong>{`${winner}`}</strong>
        </Alert>
      )}
    </div>
  );
};

export default WinnerScreen;
