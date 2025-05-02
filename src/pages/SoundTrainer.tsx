import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, TextField, Card, CardContent } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';

const SoundTrainer: React.FC = () => {
  const [model, setModel] = useState<speechCommands.SpeechCommandRecognizer | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [classes, setClasses] = useState<string[]>([]);
  const [newClass, setNewClass] = useState('');
  const [isModelReady, setIsModelReady] = useState(false);
  const [currentClass, setCurrentClass] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const recognizer = speechCommands.create('BROWSER_FFT');
        await recognizer.ensureModelLoaded();
        setModel(recognizer);
        setIsModelReady(true);
      } catch (error) {
        console.error('Error loading speech model:', error);
      }
    };
    init();
  }, []);

  const addClass = () => {
    if (newClass && !classes.includes(newClass)) {
      setClasses([...classes, newClass]);
      setNewClass('');
    }
  };

  const startListening = async (className: string) => {
    if (!model) return;

    try {
      setCurrentClass(className);
      setIsListening(true);
      model.listen(
        (result) => {
          console.log('Sound detected:', result);
        },
        {
          includeSpectrogram: true,
          probabilityThreshold: 0.75,
          invokeCallbackOnNoiseAndUnknown: true,
          overlapFactor: 0.5,
        }
      );
    } catch (error) {
      console.error('Error starting listening:', error);
    }
  };

  const stopListening = () => {
    if (!model) return;

    try {
      model.stopListening();
      setIsListening(false);
      setCurrentClass(null);
    } catch (error) {
      console.error('Error stopping listening:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sound Recognition Training
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Training Controls
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="New Sound Class"
                  value={newClass}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewClass(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={addClass}
                  disabled={!newClass}
                >
                  Add Class
                </Button>
              </Box>

              {classes.map((className) => (
                <Box key={className} sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {className}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => startListening(className)}
                    disabled={!isModelReady || isListening}
                  >
                    Record Sound
                  </Button>
                </Box>
              ))}

              {isListening && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={stopListening}
                  sx={{ mt: 2 }}
                >
                  Stop Recording
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Status
              </Typography>
              <Typography variant="body1">
                {isListening
                  ? `Recording sound for class: ${currentClass}`
                  : 'Ready to record sounds'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SoundTrainer; 