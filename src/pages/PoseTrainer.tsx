import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, TextField, Card, CardContent } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

const PoseTrainer: React.FC = () => {
  const [model, setModel] = useState<posenet.PoseNet | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [classes, setClasses] = useState<string[]>([]);
  const [newClass, setNewClass] = useState('');
  const [isModelReady, setIsModelReady] = useState(false);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const poseNetModel = await posenet.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          inputResolution: { width: 640, height: 480 },
          multiplier: 0.75,
        });
        setModel(poseNetModel);
        setIsModelReady(true);
      } catch (error) {
        console.error('Error loading PoseNet model:', error);
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

  const detectPose = async () => {
    if (!model || !webcamRef.current || !canvasRef.current) return;

    try {
      const pose = await model.estimateSinglePose(webcamRef.current, {
        flipHorizontal: false,
      });

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Draw keypoints
      pose.keypoints.forEach((keypoint) => {
        if (keypoint.score > 0.5) {
          ctx.beginPath();
          ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = 'aqua';
          ctx.fill();
        }
      });

      // Draw skeleton
      const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
        pose.keypoints,
        0.5
      );

      adjacentKeyPoints.forEach((keypoints) => {
        ctx.beginPath();
        ctx.moveTo(keypoints[0].position.x, keypoints[0].position.y);
        ctx.lineTo(keypoints[1].position.x, keypoints[1].position.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'aqua';
        ctx.stroke();
      });
    } catch (error) {
      console.error('Error detecting pose:', error);
    }
  };

  useEffect(() => {
    if (isModelReady && webcamRef.current) {
      const video = webcamRef.current;
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 640,
            height: 480,
          },
        })
        .then((stream) => {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            setInterval(detectPose, 100);
          };
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    }
  }, [isModelReady]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pose Recognition Training
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Webcam Preview
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <video
                  ref={webcamRef}
                  style={{ width: '100%', height: 'auto' }}
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
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
                  label="New Pose Class"
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
                    onClick={() => setIsTraining(true)}
                    disabled={!isModelReady}
                  >
                    Capture Pose
                  </Button>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PoseTrainer; 