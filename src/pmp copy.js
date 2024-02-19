import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Questions() {
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        fetch('https://night-excited-college.glitch.me/')
            .then(response => response.json())
            .then(json => setQuestions(json));
    }, []);

    return (
        <>
            {questions.map((question, index) => (
                <Cardbox key={index} queh={question} />
            ))}
        </>
    );
}

function Cardbox({ queh }) {
    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {queh.Question}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                    A: {queh.A}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                    B: {queh.B}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                    C: {queh.C}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                    D: {queh.D}
                </Typography>
                <Typography variant="body2">
                    Answer: {queh.Answer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Reason: {queh.Reason}
                </Typography>
                <Button variant="outlined" sx={{ marginTop: 2 }}>Unsure</Button>
            </CardContent>
        </Card>
    );
}

export default Questions;
