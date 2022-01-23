import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function tabProps(index: number) {
  return {
    id: `language-tab-${index}`,
  };
}

export default function TabBar() {
  const [sourceValue, setSourceValue] = React.useState(0);
  const [targetValue, setTargetValue] = React.useState(0);

  const handleSourceChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSourceValue(newValue);
  };

  const handleTargetChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTargetValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            value={sourceValue}
            onChange={handleSourceChange}
            aria-label="tab bar"
            sx={{marginLeft: 2}}
          >
            <Tab label="English" {...tabProps(0)} sx={{fontWeight: 600}}/>
            <Tab label="Ublish (Coming Soon)" {...tabProps(1)} disabled sx={{fontWeight: 600}}/>
          </Tabs>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            value={targetValue}
            onChange={handleTargetChange}
            aria-label="tab bar"
            sx={{marginLeft: 2}}
          >
            <Tab label="Ublish" {...tabProps(0)} sx={{fontWeight: 600}}/>
            <Tab label="English (Coming Soon)" {...tabProps(1)} disabled sx={{fontWeight: 600}}/>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}
