import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import React, { useState } from "react";

interface TextAreaProps {
  placeHolder: string;
  isReadOnly?: boolean | undefined;
}

function TextArea(props: TextAreaProps) {
  const { placeHolder, isReadOnly } = props;
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

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
        onChange={handleChange}
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
                  <TextArea placeHolder="Hit me with some text" />
                </Item>
                <Item key="target" elevation={1}>
                  <TextArea
                    placeHolder="Awaiting translation..."
                    isReadOnly={true}
                  />
                </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained">Translate</Button>
      </Box>
    </>
  );
}
