import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'What is TrainableAI?',
      answer: 'TrainableAI is a web-based tool that makes creating machine learning models fast, easy, and accessible to everyone. It allows you to train models to recognize images, sounds, and poses without requiring any coding knowledge.'
    },
    {
      question: 'How do I use TrainableAI?',
      answer: 'Using TrainableAI is simple: 1) Gather your examples into classes, 2) Train your model, and 3) Export it for use in your projects. The platform provides a user-friendly interface for each step of the process.'
    },
    {
      question: 'What can I use to teach the models?',
      answer: 'TrainableAI is flexible and supports multiple input methods. You can use your webcam for image and pose recognition, your microphone for sound recognition, or upload files directly. All processing can be done on-device for privacy.'
    },
    {
      question: 'What types of models can I create?',
      answer: 'You can create three types of models: Image Recognition (for classifying images), Sound Recognition (for classifying sounds), and Pose Recognition (for classifying body positions).'
    },
    {
      question: 'Do I need coding experience to use TrainableAI?',
      answer: 'No coding experience is required to use TrainableAI. The platform is designed to be accessible to everyone, from students to professionals.'
    },
    {
      question: 'Can I export my trained models?',
      answer: 'Yes, you can export your trained models in various formats to use them in your own projects, websites, or applications.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, TrainableAI can process all data on-device, meaning your webcam or microphone data never leaves your computer unless you choose to export it.'
    },
    {
      question: 'What are some example projects I can create?',
      answer: 'You can create various projects like: gesture-controlled games, sound-activated devices, image classification systems, and more. The possibilities are endless!'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Frequently Asked Questions
      </Typography>

      <Box sx={{ mt: 4 }}>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ; 