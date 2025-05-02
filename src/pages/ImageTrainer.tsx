import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, TextField, Card, CardContent } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const ImageTrainer: React.FC = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [classifier, setClassifier] = useState<knnClassifier.KNNClassifier | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [classes, setClasses] = useState<string[]>([]);
  const [newClass, setNewClass] = useState('');
  const [isModelReady, setIsModelReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const mobilenetModel = await mobilenet.load();
        const knn = knnClassifier.create();
        setModel(mobilenetModel);
        setClassifier(knn);
        setIsModelReady(true);
      } catch (error) {
        console.error('Error loading models:', error);
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

  const captureExample = async (classIndex: number) => {
    if (!model || !classifier || !webcamRef.current) return;

    try {
      const activation = model.infer(webcamRef.current, true);
      classifier.addExample(activation, classIndex);
    } catch (error) {
      console.error('Error capturing example:', error);
    }
  };

  const predict = async () => {
    if (!model || !classifier || !webcamRef.current) return;

    try {
      const activation = model.infer(webcamRef.current, true);
      const result = await classifier.predictClass(activation);
      console.log('Prediction:', classes[result.classIndex]);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Image Recognition Training
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Webcam Preview
              </Typography>
              <video
                ref={webcamRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: 'auto' }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Training Controls
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="New Class Name"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
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

              {classes.map((className, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {className}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => captureExample(index)}
                    disabled={!isModelReady}
                  >
                    Capture Example
                  </Button>
                </Box>
              ))}

              <Button
                variant="contained"
                color="primary"
                onClick={predict}
                disabled={!isModelReady || classes.length === 0}
                sx={{ mt: 2 }}
              >
                Start Prediction
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ImageTrainer; 