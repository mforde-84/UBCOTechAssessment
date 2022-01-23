import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

interface TextAreaProps {
  placeHolder: string;
  isReadOnly?: boolean | undefined;
  value: string;
  onChange? : (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextArea(props: TextAreaProps) {
  const { placeHolder, isReadOnly, value, onChange } = props;

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={value}
        onChange={onChange}
        multiline
        rows={4}
        placeholder={placeHolder}
        variant="standard"
        InputProps={{ disableUnderline: true, readOnly: isReadOnly }}
      />
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  minHeight: 200,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function TranslateSection() {
  const [sourceValue, setSourceValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  
  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSourceValue(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/Translation`, {
      text: sourceValue
    })
    .then(function(response) {
      setTargetValue(response.data)
    })
    .catch(function(error) {
      console.log(`Error: ${error}`); //TODO - properly handle errors
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        {[lightTheme].map((theme, index) => (
          <Grid item xs={12} key={index}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "background.default",
                  display: "grid",
                  gridTemplateColumns: { md: "5fr 5fr" },
                  gap: 2,
                }}
              >
                <Item key="source" elevation={1}>
                  <TextArea placeHolder="Hit me with some text" onChange={handleSourceChange} value={sourceValue} />
                </Item>
                <Item key="target" elevation={1}>
                  <TextArea
                    placeHolder="Awaiting translation..."
                    isReadOnly={true}
                    value={targetValue}
                  />
                </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleClick} disabled={sourceValue.trim().length < 1}>
          Translate
        </Button>
      </Box>
    </>
  );
}
