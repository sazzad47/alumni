import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Box, Grid} from '@mui/material';
import { useTheme } from 'next-themes';
import WorkEdu from './work_edu';
import LivingPlace from './livingPlace';
import Contact from './contact';
import Relationship from './Relationship';
import Details from './details';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function About() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      className="flex justify-between bg-bgLight dark:bg-bgDark my-5 p-4"
    >
      <Grid className='border-r w-[40%] flex'>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        TabIndicatorProps={{
          sx: {
            bgcolor: "transparent",
          },
        }}
        sx={{
          "& button": { color: currentTheme === "dark" ? "#fff" : "#000", textTransform:"capitalize", display: "flex", alignItems: "flex-start" },
          "& button:hover": { bgcolor: currentTheme === "dark" ? "#707075" : "#f0e1e1" },
          "& button:focus": { outline: "none" },
          "& button.Mui-selected": {
            color: currentTheme === "dark" ? "#fff" : "#000",
            bgcolor: currentTheme === "dark" ? "#5a5c5e" : "#0be0e7",
          },
        }}

      >
        <Tab label="Work and education" {...a11yProps(0)} />
        <Tab label="Places lived" {...a11yProps(1)} />
        <Tab label="Contact info" {...a11yProps(2)} />
        <Tab label="Relationship" {...a11yProps(3)} />
        <Tab label="Details about you" {...a11yProps(4)} />
      </Tabs>
      </Grid>
      <Grid className='ml-4 w-[60%]'>
      <TabPanel value={value} index={0}>
        <WorkEdu/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LivingPlace/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Contact/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Relationship/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Details/>
      </TabPanel>
      </Grid>
    </Box>
  );
}