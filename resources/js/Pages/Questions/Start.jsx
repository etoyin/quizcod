import React from 'react'
import Quiz from './Quiz'
import { useState } from 'react'
// import soundfile from '../assets/alert.mp3'
import sound from '/public/music/START MUSIC.mp3'

function Start({quizz}) {
    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false)
    let audio = new Audio(sound);
    if (start) {
      audio.play();
    }
  return (
    <div className='bg-dark-blue'>
      {
        start ?
        <Quiz quizz={quizz} />:
        <div className="fixed top-0 left-0 w-full h-screen bg-blue flex justify-center items-center">
            <div 
                onClick={() => {setStart(true)}}
                className="w-24 text-white text-center cursor-pointer font-bold uppercase bg-dark-blue p-3 rounded-lg">
                Start
            </div>
        </div>
      }
    </div>
  )
}

export default Start
