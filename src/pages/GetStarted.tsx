import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import MicIcon from '@mui/icons-material/Mic';
import AccessibilityIcon from '@mui/icons-material/Accessibility';

const GetStarted: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Choose Your Training Type
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
        Select the type of model you want to train
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ImageIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Image Recognition
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Train a model to recognize images using your webcam or uploaded files.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/train/image"
              >
                Start Training
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <MicIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Sound Recognition
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Train a model to recognize sounds using your microphone.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/train/sound"
              >
                Start Training
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AccessibilityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Pose Recognition
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Train a model to recognize body poses using your webcam.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/train/pose"
              >
                Start Training
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GetStarted; 