import { useState } from "react";
import "./guessWorld.css";
import { words } from "./words";
import Otp from "./Otp";
import sound from "./../../public/succ.mp3";
import Lottie from "lottie-react";
import winAnimation from "./../../public/Animation - 1708188880289.json";

let randomWord = words[Math.round(Math.random() * words.length)];
let disc = randomWord.disc;
let word = randomWord.word;
export default function GuessWorld() {
    const [maxGuess, showMaxGuess] = useState(5);
    let cloneMax = maxGuess;
    if (cloneMax === 0) {
        showMaxGuess(5);
        randomWord = words[Math.round(Math.random() * words.length)];
        if(randomWord){
            disc = randomWord.disc;
            word = randomWord.word;
        }
    } else {
        cloneMax = maxGuess;
    }
    const winSound = new Audio(sound);
    let answer = false;
    const onOtpSubmit = (otp) => {
        if (otp.toLowerCase() === word) {
            answer = true;
        } else {
            answer = false;
        }
    };
    // console.log(word);
    const [show, setShow] = useState(false);
    const [answerBoolean, setAnswer] = useState(false);
    const winText = ["🥳 مبروك", "😉 شكلك مذاكر", "الله ينور", "😎 يجامد", "🤩 في الجون"];
    function showWorld() {
        let randomWinText = winText[Math.round(Math.random() * winText.length)];
        return (
            <h2 className={show ? "activeWord" : "hidden"}>{randomWinText}</h2>
        );
    }
    return (
        <div className="bg-color">
            <div className="guess-container">
                <h2 className="title">خمن الكلمة</h2>
                <div className="box">
                    <div className="inputs">
                        {show ? null : (
                            <Otp
                                length={word.length}
                                onOtpSubmit={onOtpSubmit}
                            />
                        )}
                    </div>
                    <div className="desc">
                        <h3>{show ? null : disc}</h3>
                        <p>
                            عدد المحاولات : <span>{maxGuess}</span>
                        </p>
                        <button
                            onClick={() => {
                                setShow((e) => !e);
                                {
                                    if (show) {
                                        winSound.pause();
                                    } else {
                                        if (answer) {
                                            // console.log("you win");
                                            winSound.play();
                                            showMaxGuess(cloneMax);
                                            setAnswer(true);
                                            showMaxGuess(0);
                                        } else {
                                            // console.log("you lose");
                                            alert("fail try");
                                            showMaxGuess((cloneMax -= 1));
                                            setAnswer(false);
                                        }
                                    }
                                }
                            }}
                        >
                            {show ? "جرب تاني" : "الإجابه"}
                        </button>
                    </div>
                    {answerBoolean ? showWorld() : null}
                    {answerBoolean ? <Lottie animationData={winAnimation} className={show?"winAnimation":"hiddenAnimation"}/> : null}
                </div>
            </div>
        </div>
    );
}
