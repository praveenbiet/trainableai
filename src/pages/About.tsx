import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const About: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        About TrainableAI
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                What is TrainableAI?
              </Typography>
              <Typography variant="body1" paragraph>
                TrainableAI is a web-based tool that makes creating machine learning models fast, easy, and accessible to everyone. Our platform allows you to train models to recognize images, sounds, and poses without requiring any coding knowledge.
              </Typography>
              <Typography variant="body1" paragraph>
                Whether you're a student, educator, artist, or developer, TrainableAI provides a simple interface to create custom machine learning models for your projects.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                How to Use TrainableAI
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  1. Gather
                </Typography>
                <Typography variant="body1" paragraph>
                  Collect and group your examples into classes or categories that you want the computer to learn.
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  2. Train
                </Typography>
                <Typography variant="body1" paragraph>
                  Train your model and instantly test it to see if it can correctly classify new examples.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  3. Export
                </Typography>
                <Typography variant="body1">
                  Export your model for use in your projects: websites, apps, and more.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Features
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">Image Recognition</Typography>
                    <Typography variant="body2">
                      Train models to recognize images using your webcam or uploaded files.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">Sound Recognition</Typography>
                    <Typography variant="body2">
                      Train models to recognize sounds using your microphone.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6">Pose Recognition</Typography>
                    <Typography variant="body2">
                      Train models to recognize body poses using your webcam.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About; 