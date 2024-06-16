// Question Types
// 1. MCQs | Multiple Choice | single
import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import Chirp from '@/Components/Chirp';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Level from './Level';
import theme from '/public/music/5000 Music.mp3'
import theme2 from '/public/music/10000 Music.mp3'
import correct from '/public/music/CORRECT ANSWER.mp3'
import wrong from '/public/music/WRONG ANSWER.mp3'

  
export default function Quiz ({quizz}) {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(0)
    const [move, setMove] = useState(false);
    const [level, setLevel] = useState(true);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [fiftyUsed, setFiftyUsed] = useState(true);
    const [phoneUsed, setPhoneUsed] = useState(true);
    
    let audio = new Audio();
    
    // const [ question, setQuestion] = useState(quiz.questions[activeQuestion]);
    const [ questions, setQuestions] = useState(JSON.parse(quizz[0].questions));
    const priceMoney = ['N1000', 'N2000', 'N3000', 'N4000', 'N6000', 'N8000', 'N10000', 'N12000', 'N14000', 'N15000', 'N16000', 'N17000', 'N18000', 'N20000', 'N25000']
    console.log(JSON.parse(quizz[0].questions));

    const mark = () => {
        if (selectedAnswer === questions[activeQuestion].correctAnswer) {
            // let audio = new Audio(correct);
            audio.src=correct;
            audio.play(); 
            let n = document.getElementsByClassName("selected-answer");
            let change = false;
            let blink = setInterval(() => {
                if(change){
                    n[0].classList.add("green-bg"); //style.backgroundColor = 'green';
                    change = !change;
                }
                else{
                    n[0].classList.remove("green-bg")//style.backgroundColor = 'transparent';
                    change = !change;
                }
            }, 100);

            setTimeout(() => {
                clearInterval(blink);
                n[0].classList.add("green-bg");
                setMove(true);
            }, 5000)
            // n[0].style.backgroundColor = 'green'
            // console.log(n);
            // alert(n);
            setShowResult(showResult + 1);
        } else {
            // let audio = new Audio(wrong);
            audio.src = wrong;
            audio.play();
            setMove(false);
            // let i = e.target.getAttribute("data-bind");
            let ind = questions[activeQuestion].choices.indexOf(questions[activeQuestion].correctAnswer);
            let ans = document.getElementById(ind);
            let change = false;
            let blink = setInterval(() => {
                if(change){
                    ans.classList.add("green-bg");
                    change = !change;
                }
                else{
                    ans.classList.remove("green-bg");
                    change = !change;
                }
            }, 100);

            setTimeout(() => {
                clearInterval(blink);
                ans.classList.add("green-bg");
            }, 5000)
            
            console.log(ans);
        }
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // let rand = randomNumber(1, 3);
    // console.log(rand);
    const fifty_50 = () => {
      // console.log(choices);
      setFiftyUsed(false)
      let chox = [...questions[activeQuestion].choices];

      chox.splice(chox.indexOf(questions[activeQuestion].correctAnswer), 1);
      console.log(chox);
      let rand = randomNumber(1, 3);
      chox.splice(rand, 1);
      // console.log(chox);

      // let ind = choices.indexOf(correctAnswer);
      let newchoices = [...questions[activeQuestion].choices];
      // // setChoices([...choices, ])
      newchoices[newchoices.indexOf(chox[0])] = "";
      newchoices[newchoices.indexOf(chox[1])] = "";
      // // choices[choices.indexOf(chox[1])] = "";
      let que = questions;
      que[activeQuestion].choices = [...newchoices]
      setQuestions([...que]);
      console.log(questions);
      console.log(que);

    }
    // console.log(questions[activeQuestion].choices);
    const next = () => {
        setMove(false)
        if(move){
            if(activeQuestion + 1 < questions.length){
              setActiveQuestion(activeQuestion + 1);
            }
            setSelectedAnswerIndex(null);
            setSelectedAnswer("");
            console.log(questions[activeQuestion].choices);
            // 
            audio.src = theme2;
            audio.play(); 
        }
    }
    const onAnswerSelected = (answer, index) => {
      setSelectedAnswerIndex(index);
      setSelectedAnswer(answer);
    }

    const closeLevel = () => {
      let el = document.getElementById("slide");
      el.classList.remove('left-0');
      el.classList.add('-left-96');
    }

    const openLevel = () => {
      let el = document.getElementById("slide");
      el.classList.remove('-left-96');
      el.classList.add('left-0');
    }
    const openLifeLine = () => {
      let el = document.getElementById("slide-right");
      el.classList.remove('-right-96');
      el.classList.add('right-0');
      // let audio = new Audio(theme);
      audio.src = theme
      audio.play();
    }

    const closeLifeLine = () => {
      let el = document.getElementById("slide-right");
      el.classList.add('-right-96');
      el.classList.remove('right-0');
    }
  
    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
  
    return (
      <div className="quiz-container bg-dark-blue ">
        <div id="slide-right" className='z-10 border-l border-white bg-dark-blue text-white fixed top-0 -right-96 w-96 h-screen transition-all duration-1000 h-screen'>
          <div className='flex flex-row-reverse'><i onClick={closeLifeLine} className="text-lg las la-times"></i></div>
          <div className=''>
            <div onClick={()=>{setPhoneUsed(false)}}>
              <div className={`mx-auto cursor-pointer flex items-center justify-center w-56 h-56 rounded-full border-2 ${phoneUsed ? "border-white" : "border-[#ff0000]"}`}>
                <i className={`${phoneUsed ? "text-white" : "text-[#ff0000]"} text-7xl las la-phone-volume`}></i>
              </div>
            </div>
            <div className='mt-4 '>
              <div className={`mx-auto cursor-pointer flex items-center justify-center w-56 h-56 rounded-full border-2 ${fiftyUsed ? "border-white" : "border-[#ff0000]"}`}>
                <p className={`${fiftyUsed ? "text-white" : "text-[#ff0000]"} text-6xl`}>50/50</p>
              </div>
            </div>
          </div>
        </div>
        
        <div id="slide" className='z-10 bg-dark-blue text-white fixed top-0 -left-96 w-96 h-screen transition-all duration-1000 h-screen'>
          <div className='flex flex-row-reverse'><i onClick={closeLevel} className="text-lg las la-times"></i></div>
          <div className='flex flex-col-reverse'>
            {
              questions.map((n, i) => {
                return (
                  <div key={i} className={ 
                    "flex m-3 border border-white px-4 p-2 rounded-full justify-between "
                    + ((i+1)%5==0 && "bg-orange") + ((i) == activeQuestion && " bg-green")
                  }>
                    <p>{i+1}</p><p>{priceMoney[i]}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
        
        <div className='fixed top-0 left-0 text-white'>
          <div className='cursor-pointer' onClick={mark}><i className="las la-check-double"></i></div>
          <div className='cursor-pointer mt-5' onClick={fifty_50}>50</div>
          <div className="cursor-pointer mt-5" onClick={openLevel}><i className="las la-tasks"></i></div>
          <div className="cursor-pointer mt-5" onClick={openLifeLine}><i className="las la-star-of-life"></i></div>
        </div>
          <div>
            <div>
              <span className="active-question-no">
                {addLeadingZero(activeQuestion + 1)}
              </span>
              <span className="total-question">
                /{addLeadingZero(questions.length)}
              </span>
            </div>
            <h2 className='text-white'>{questions[activeQuestion].question}</h2>
            <ul>
              { 
              questions[activeQuestion].choices.map((answer, index) => (
                <li
                  key={index}
                  id={index}
                  data-bind={index}
                  onClick={() => onAnswerSelected(answer, index)}
                  className={
                    selectedAnswerIndex === index ? 'selected-answer' : null
                  }
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="flex-right">
              <button
                onClick={next}
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
      </div>
    )
}