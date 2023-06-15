import PlayerInput from "./PlayerInput";
import UsersContext from "../context/UserContext";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const Users = () => {
  const { Users, handlerUsers } = useContext(UsersContext);

  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        {Users.map((user) => (
          <PlayerInput key={user.id} number={user.id} />
        ))}
        <NavLink to={"/game"}>
          <Button variant="contained" onClick={handlerUsers}>
            Login
          </Button>
        </NavLink>
      </Box>
    </div>
  );
};

export default Users;
