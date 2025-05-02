import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import GetStarted from './pages/GetStarted';
import ImageTrainer from './pages/ImageTrainer';
import SoundTrainer from './pages/SoundTrainer';
import PoseTrainer from './pages/PoseTrainer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4285f4',
    },
    secondary: {
      main: '#34a853',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/train/image" element={<ImageTrainer />} />
          <Route path="/train/sound" element={<SoundTrainer />} />
          <Route path="/train/pose" element={<PoseTrainer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
