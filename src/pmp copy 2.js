import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Questions() {
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        fetch('https://night-excited-college.glitch.me/')
            .then(response => response.json())
            .then(json => setQuestions(json));
    }, []);

    const shuffleQuestions = () => {
        let array = [...questions];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        setQuestions(array);
    };

    return (
        <>
            <Button variant="contained" onClick={shuffleQuestions} sx={{ marginBottom: 2 }}>Shuffle</Button>
            {questions.map((question, index) => (
                <Cardbox key={index} queh={question} />
            ))}
        </>
    );
}

function Cardbox({ queh }) {
    const [showAnswer, setShowAnswer] = React.useState(false); // State to toggle visibility

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer); // Toggle the state
    };

    return (
        <Card sx={{ minWidth: 275, maxWidth: 750, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {queh.Question}
                </Typography>
                <br />
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
                {showAnswer && (
                    <>
                        <Typography variant="body2">
                            Answer: {queh.Answer}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Reason: {queh.Reason}
                        </Typography>
                    </>
                )}
                <Button variant="outlined" sx={{ marginTop: 2 }} onClick={toggleAnswer}>
                    {showAnswer ? 'Hide answer' : 'Show answer'}
                </Button>
            </CardContent>
        </Card>
    );
}