import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function StockField() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState(null);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (inputValue !== "" && active) {
      const timeoutId = setTimeout(async () => {
        console.log(inputValue);
        const searchResult = await axios.post("/api/assets/search", {
          query: inputValue,
        });
        setOptions(searchResult.data);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
        active = false;
      };
    }
  }, [inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      size="small"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      isOptionEqualToValue={(option, value) =>
        option.shortname === value.shortname
      }
      getOptionLabel={(option) => `${option.shortname} (${option.symbol})`}
      value={value}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          required
          id="name"
          label="Name"
          name="name"
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
