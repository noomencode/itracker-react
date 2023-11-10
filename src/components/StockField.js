import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import axios from "axios";

export default function StockField(props) {
  const { handleNewAsset } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState(null);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (inputValue !== "" && active) {
      const timeoutId = setTimeout(async () => {
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
      onChange={async (event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if (newValue?.symbol) {
          const quoteData = await axios.get(
            `/api/assets/quote/${newValue.symbol}`
          );
          handleNewAsset(newValue, quoteData.data);
        } else {
          handleNewAsset(undefined, undefined);
        }
      }}
      isOptionEqualToValue={(option, value) =>
        option.shortname === value.shortname
      }
      getOptionLabel={(option) => option.shortname || option.longname}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.key}>
          <span>{`${option.shortname || option.longname} (${
            option.symbol
          })`}</span>
        </Box>
      )}
      value={value}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          required
          color="secondary"
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
