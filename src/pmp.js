import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

//Function section
export function Questions() {
    const [questions, setQuestions] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0); // State to track the current card index
    const [selectedValue, setSelectedValue] = React.useState('');

    React.useEffect(() => {
        fetch('http://54.241.188.164:5000/data')
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
        setSelectedValue(''); //Clears selection
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
        setSelectedValue('');
    };

    const handleRadioChange = (event, queh) => {
        const selectedAnswer = event.target.value;

        // Update selected value
        setSelectedValue(selectedAnswer);

        // Check if the selected answer matches the correct answer
        const isCorrect = selectedAnswer.trim().toLowerCase() === queh.Answer.trim().toLowerCase();
    };




    //If nothing is loaded or connection to db is severed, display "Loading..."
    if (questions.length === 0) {
        return <center><div>Loading...</div></center>
    }

    return (
        <>
            <center>
                <Button variant="contained" onClick={prevCard} sx={{ marginRight: 2, marginTop: 5 }}>Previous</Button>
                <Button variant="contained" onClick={shuffleQuestions} sx={{ marginRight: 2, marginTop: 5 }}>Shuffle</Button>
                <Button variant="contained" onClick={nextCard} sx={{ marginTop: 5 }}>Next</Button>
            </center>
            <br />
            {/* Render only the current card */}
            {questions.length > 0 && <Cardbox key={currentIndex} queh={questions[currentIndex]} selectedValue={selectedValue} handleRadioChange={handleRadioChange} setSelectedValue={setSelectedValue} />}

        </>
    );
}

function Cardbox({ queh, selectedValue, handleRadioChange }) {
    const [isCorrect, setIsCorrect] = React.useState(false);

    // Just a quick toggle to reveal answer
    const [showAnswer, setShowAnswer] = React.useState(false);
    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    // Button options
    const radioOptions = ['A', 'B', 'C', 'D'].map((option) => ({
        value: queh[option],
        label: queh[option]
    }));

    // Check if the selected value is empty
    const isValueSelected = selectedValue.trim() !== '';

    return (

        <Card sx={{ minWidth: 300, maxWidth: 750, margin: '0px auto', border: '1px solid #ffffff', borderRadius: '20px', backgroundColor: '#ffffffaa', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.493), 0 6px 20px 0 rgba(0, 0, 0, 0.164)' }}>
            <CardContent>
                <h1>PMBOK & Agile Flashcards</h1>
                <p>Click on your answer to see if you got it right and press the "Show answer" button to reveal the correct answer and a reason for the answer. To shuffle around the cards, press the shuffle button.</p>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="pmbok-question-group"
                        value={selectedValue}
                        onChange={(event) => {
                            handleRadioChange(event, queh);
                            setIsCorrect(event.target.value.trim().toLowerCase() === queh.Answer.trim().toLowerCase());
                        }}
                        name="questionOption"
                    >
                        <h3>{queh.Question}</h3>
                        <br />
                        {radioOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>

                    {/* Display whether the answer is correct or wrong if a value is selected */}
                    {isValueSelected && (isCorrect ? <p>✔️That is correct!</p> : <p>❌Try again...</p>)}

                    {/* Use of the toggle here. */}
                    <Button variant="outlined" sx={{ marginTop: 2, backgroundColor: 'white' }} onClick={toggleAnswer}>
                        {showAnswer ? 'Hide answer' : 'Show answer'}
                    </Button>
                    {showAnswer && (
                        <>
                            <p>Answer: {queh.Answer}</p>
                            <p>Reason: {queh.Reason}</p>
                        </>
                    )}
                </FormControl>
            </CardContent>
        </Card>
    );
}

export function Intro({ startQuiz }) {
    return (
        <Card sx={{ minWidth: 300, maxWidth: 750, margin: '0px auto', border: '1px solid #ffffff', borderRadius: '20px', backgroundColor: '#ffffffaa', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.493), 0 6px 20px 0 rgba(0, 0, 0, 0.164)' }}>
            <CardContent>
                <h1>Welcome to the PMBOK & Agile Flashcards Quiz!</h1>
                <p>This quiz pulls questions from a YouTube channel by <a href='https://www.youtube.com/@davidmclachlanproject/videos'>David McLachlan</a>. Questions in particular are from PMBOK and Agile. Click on your answer to see if you got it right and press the "Show answer" button to reveal the answer and a reason for the answer. To shuffle around the cards, press the shuffle button.</p>
                <p>Now, pull up your favorite classical or lofi hip hop music, hunker down, and let's get studying!</p>
                <Button variant="contained" onClick={startQuiz} sx={{ marginTop: 5 }}>Start Quiz</Button>
            </CardContent>
        </Card>
    );
}
