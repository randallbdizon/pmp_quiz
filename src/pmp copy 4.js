import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Questions() {
    const [questions, setQuestions] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0); // State to track the current card index
    const [selectedValue, setSelectedValue] = React.useState('');

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
        setSelectedValue('');
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
        setSelectedValue('');
    };

    const handleRadioChange = (event, queh, trim) => {
        const selectedAnswer = event.target.value;
        setSelectedValue(selectedAnswer);
    
        const isCorrect = selectedAnswer.trim().toLowerCase() === queh.Answer.trim().toLowerCase();
        if (isCorrect) {
            // Display correct answer message
            console.log("Correct answer!");
        } else {
            // Display wrong answer message
            console.log("Wrong answer...");
        }
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
            {questions.length > 0 && <Cardbox key={currentIndex} queh={questions[currentIndex]} selectedValue={selectedValue} handleRadioChange={handleRadioChange} />}
        </>
    );
}

function Cardbox({ queh, selectedValue, handleRadioChange }) {
    const [showAnswer, setShowAnswer] = React.useState(false);

    //Just a quick toggle
    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <Card sx={{ minWidth: 300, maxWidth: 750, margin: '50px 25%', }}>
            <CardContent>
                <FormControl>
                    <FormLabel id="pmbok-question-group">PMBOK Questions 100</FormLabel>
                    <RadioGroup
                        aria-labelledby="pmbok-question-group"
                        value={selectedValue}
                        onChange={handleRadioChange}
                        name="questionOption"
                    >
                        <h3>{queh.Question}</h3>
                        <br />
                        <FormControlLabel value="answerA" control={<Radio />} label={queh.A} />
                        <FormControlLabel value="answerB" control={<Radio />} label={queh.B} />
                        <FormControlLabel value="answerC" control={<Radio />} label={queh.C} />
                        <FormControlLabel value="answerD" control={<Radio />} label={queh.D} />
                    </RadioGroup>

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
                </FormControl>
            </CardContent>
        </Card>
    );
}
