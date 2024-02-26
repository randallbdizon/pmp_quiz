import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//Display section
function Cardbox({ queh, selectedValue, handleRadioChange, isCorrect }) {
    // Just a quick toggle to reveal answer
    const [showAnswer, setShowAnswer] = React.useState(false);
    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    // Button options
    const radioOptions = ['A', 'B', 'C', 'D'].map((option) => ({
        value: queh[option], //The problem was here; previously `answer${option}`
        label: queh[option]
    }));

    return (
        <Card sx={{ minWidth: 300, maxWidth: 750, margin: '0px 25%' }}>
            <CardContent>
                <FormControl>
                    <FormLabel id="pmbok-question-group">PMBOK Questions 100</FormLabel>
                    <RadioGroup
                        aria-labelledby="pmbok-question-group"
                        value={selectedValue}
                        onChange={(event) => handleRadioChange(event, queh)} // Pass 'queh' along with the event
                        name="questionOption"
                    >

                        <h3>{queh.Question}</h3>
                        <br />
                        {/* Dynamically generate radio buttons */}
                        {radioOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>


                    {/* Use of the toggle here. */}
                    <Button variant="outlined" sx={{ marginTop: 2 }} onClick={toggleAnswer}>
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


//Function section
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
        console.log(selectedAnswer, "<- selectedAnswer")

        // Check if the selected answer matches the correct answer
        const isCorrect = selectedAnswer.trim().toLowerCase() === queh.Answer.trim().toLowerCase();
        console.log(isCorrect, "<- isCorrect")
        console.log(queh.Answer, "<- queh.Answer")

        if (isCorrect) {
            console.log("Correct answer!")
        } else {
            console.log("Wrong answer...")
        }
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
            {/* Render only the current card */}
            {questions.length > 0 && <Cardbox key={currentIndex} queh={questions[currentIndex]} selectedValue={selectedValue} handleRadioChange={handleRadioChange} />}
        </>
    );
}

