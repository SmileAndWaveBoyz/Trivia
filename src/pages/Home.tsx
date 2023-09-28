import React, { useState, useEffect } from 'react';

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaResponse {
  results: TriviaQuestion[];
}

function Home() {
  const [data, setData] = useState<TriviaResponse>({ results: [] })
  const [questionNumber, setQuestionNumber] = useState(0)
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([])
  let possibleAnswersVar : string[] = []
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0)
  const [questionString, setQuestionString] = useState("")

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(response => response.json())
      .then((responseData: TriviaResponse) => {
        setData(responseData);
      })
  }, [])

  useEffect(()=>{
    if (data.results.length > 0) {
      setQuestionString(decodeHTMLEntities(data.results[questionNumber].question))
      for (let i = 0; i < data.results[questionNumber].incorrect_answers.length; i++) {
        possibleAnswersVar.push(decodeHTMLEntities(data.results[questionNumber].incorrect_answers[i]))
      }
      const correctAnswer = decodeHTMLEntities(data.results[questionNumber].correct_answer)
      possibleAnswersVar.push(correctAnswer)
      possibleAnswersVar = shuffle(possibleAnswersVar)

      for (let i = 0; i < possibleAnswersVar.length; i++) {        
        if(possibleAnswersVar[i] === correctAnswer){
          setCorrectAnswerIndex(i)
          console.log("Correct answer is: " + correctAnswer + " " + i);
        }
      }

      setPossibleAnswers(possibleAnswersVar)
    }
  },[data, questionNumber])

  function checkAnswer(index:number) {
    if (index === correctAnswerIndex) {
      console.log("Correct!");
      setQuestionNumber(questionNumber + 1)
    } else{
      console.log("wrong");
      
    }
  }

  function shuffle(array : string[]) {
    let currentIndex = array.length
    let randomIndex = 0;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function decodeHTMLEntities(input: string): string {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent || "";
  }
  

  return (
    <>
      {data.results.length > 0 ? (
        <div className="questionContainer">
          <div>{questionString}</div>
          <div className="questionContainer__buttonContainer">
            {
              possibleAnswers.map((question, index)=>{
                return <button className='questionContainer__answerButton' onClick={()=> checkAnswer(index)}>{question}</button>
              })
              
            }
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Home;
