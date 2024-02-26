import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function Questions() {
    const [questions, setQuestions] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0); // State to track the current card index

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

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    };

    if (questions.length === 0) {
        return <center><div>Loading...</div></center>
    }

    return (
        <>
            <center>
                <Button variant="contained" onClick={prevCard} sx={{ marginRight: 2 }}>Previous</Button>
                <Button variant="contained" onClick={shuffleQuestions} sx={{ marginRight: 2 }}>Shuffle</Button>
                <Button variant="contained" onClick={nextCard}>Next</Button>
            </center>
            {/* Render only the current card */}
            {questions.length > 0 && <Cardbox key={currentIndex} queh={questions[currentIndex]} />}
        </>
    );
}

function Cardbox({ queh }) {
    const [showAnswer, setShowAnswer] = React.useState(false);

    //Just a quick toggle
    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <Card sx={{ minWidth: 300, maxWidth: 750, margin: '50px 25%', }}>
            <CardContent>
                <h3>{queh.Question}</h3>
                <br />
                <p>A: {queh.A}</p>
                <p>B: {queh.B}</p>
                <p>C: {queh.C}</p>
                <p>D: {queh.D}</p>
                {showAnswer && (
                    <>
                        <p>Answer: {queh.Answer}</p>
                        <p>Reason: {queh.Reason}</p>
                    </>
                )}

                {/* Use of the toggle here. */}
                <Button variant="outlined" sx={{ marginTop: 2 }} onClick={toggleAnswer}>
                    {showAnswer ? 'Hide answer' : 'Show answer'}
                </Button>
            </CardContent>
        </Card>
    );
}
