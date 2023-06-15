import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";

const PlayerInput = ({number}) => {
  return (
      <TextField
        defaultValue={number == 1 ? 'One':'Two'}
        id={`${number}`}
        label={`Player ${number}`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
  );
};

export default PlayerInput;
