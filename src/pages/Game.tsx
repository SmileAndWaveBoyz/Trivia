import React, { useState, useEffect, useRef } from 'react';

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


function Game() {
  const [data, setData] = useState<TriviaResponse>({ results: [] })
  const [questionNumber, setQuestionNumber] = useState(0)
  const [possibleAnswers, setPossibleAnswers] = useState<string[][]>([])
  let possibleAnswersVar : string[][] = []
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState([0])
  const [questionString, setQuestionString] = useState<string[]>([])
  const [score, setScore] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then(response => response.json())
      .then((responseData: TriviaResponse) => {
        setData(responseData)
      })
  }, [])

  useEffect(()=>{
    if (data.results.length > 0) {
      const questionsArray : string[] = []
      for (let i = 0; i < data.results.length; i++) {
        questionsArray.push(decodeHTMLEntities(data.results[i].question))
      }
      setQuestionString(questionsArray)

      let numberOfQuestions = data.results.length
      
      console.log("Start");

      const correctAnswerIndexVar : number[] = []

      for (let j = 0; j < numberOfQuestions; j++) {

        possibleAnswersVar[j] = [];
        for (let i = 0; i < data.results[j].incorrect_answers.length; i++) { // Pushes the incorrect answers into possibleAnswersVar[]
          possibleAnswersVar[j].push(decodeHTMLEntities(data.results[j].incorrect_answers[i]))
        }
        const correctAnswer = decodeHTMLEntities(data.results[j].correct_answer)// Pushes the correct answer into possibleAnswersVar[]
        possibleAnswersVar[j].push(correctAnswer)
  
        possibleAnswersVar[j] = shuffle(possibleAnswersVar[j]) //Suffles them
  
        
        for (let i = 0; i < possibleAnswersVar[j].length; i++) {//Makes a note of the correct answers
          if(possibleAnswersVar[j][i] === correctAnswer){
            correctAnswerIndexVar.push(i)
            console.log("Correct answer is: " + correctAnswer + " " + i);
          }
        }
      }
      setCorrectAnswerIndex(correctAnswerIndexVar)
      setPossibleAnswers(possibleAnswersVar)// Defines a list of all answers 
    }
  },[data])


  function checkAnswer(index:number) {
    console.log(correctAnswerIndex);
    
    if (index === correctAnswerIndex[questionNumber]) {
      console.log("Correct! ");
      
      setScore(score + 1)
    } else{
      console.log("wrong");
    }
    setQuestionNumber(questionNumber + 1)
    if (containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop += containerRef.current.offsetHeight
        }
      }, 1000);
      
    }

    document.querySelectorAll(`.index${correctAnswerIndex[questionNumber]}`)[questionNumber]?.classList.toggle("correct")
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
    <div className='container' ref={containerRef}>
      {data.results.length > 0 ? (
        questionString.map((currentQuestion, currentQuestionIndex)=>{
          return (
            <div className="slide" key={currentQuestionIndex}>
              <p className='score'>Question {questionNumber + 1}</p>
              <div className="questionContainer">
              <div className='questionContainer__question'>{currentQuestion}</div>
              <div className="questionContainer__buttonContainer">
                {
                  possibleAnswers[currentQuestionIndex] && possibleAnswers[currentQuestionIndex].map((question, index)=>{
                    return <button key={index} className={`questionContainer__answerButton index${index}`} onClick={()=> checkAnswer(index)}>{question}</button>
                  })
                  
                }
              </div>
              
            </div>
            <p className='score'>Score: {score}</p>
          </div>

          
          )
        })

      ) : (
        <div className='slide'>
          <div className="questionContainer">
            <div className="questionContainer__buttonContainer"> 
            <div className="lds-hourglass"></div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default Game;
