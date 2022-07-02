const mainText = document.querySelector("[data-main-text]");
const btnTryAgain = document.querySelector("[data-try-again]");
const inputText = document.querySelector("[data-text-typing]");

const mistakesSpan = document.querySelector("[data-mistakes]")
const timeLeftSpan = document.querySelector("[data-time-left]")
const wpmSpan = document.querySelector("[data-wpm]")
const correctWordSpan = document.querySelector("[data-correct]")

let charIndex = 0;
let mistakes = 0;
let correctWord = 0;


let timeLeft = 60; 

const createRandomText = function(){
    mainText.textContent = "";
    const randomNumber = Math.floor(Math.random()*paragraphs.length);
    paragraphs[randomNumber].split("").forEach(letter => {
        let span = `<span>${letter}</span>`;
        mainText.innerHTML += span;
    });

    window.addEventListener("keydown", () => inputText.focus());
    mainText.addEventListener("click", () => inputText.focus());
}


const timeCounting = function(){
    if(timeLeft < 0){
        timeLeft = 0;
        inputText.style.display = "none";
        alert("Time is over! Press try again")
        clearInterval(indexInterval);
    }
    timeLeftSpan.textContent = timeLeft--;
}

const indexInterval = setInterval(timeCounting,1000)

const initTyping = function(e){
    const characters = mainText.querySelectorAll("span");
    let typedChar = inputText.value.split("")[charIndex];

    if(typedChar == null){
        charIndex--;
        characters[charIndex].classList.remove("correct","incorrect","current");
        
    }else{
        if(characters[charIndex].textContent === typedChar){
            correctWord++;
            characters[charIndex].classList.add("correct")
            correctWordSpan.textContent = correctWord;
        }else{
            mistakes++;
            characters[charIndex].classList.add("incorrect")
            mistakesSpan.textContent = mistakes;

        }
        charIndex++;
    }
    characters.forEach(char => char.classList.remove("current"))
    characters[charIndex].classList.add("current")
}

createRandomText();
inputText.addEventListener("input", initTyping)

const resetStats = function(){
    //time
    timeLeft = 60;
    setInterval(indexInterval);
    inputText.style.display = "block";
    charIndex = 0;
    
    //mistakes
    mistakes = 0;
    mistakesSpan.textContent = mistakes;

    //WPM
    correctWord = 0;
    correctWordSpan.textContent = correctWord;sdas

    inputText.value = "";
}

//refresh everything
btnTryAgain.addEventListener("click", () =>{
    resetStats();
    createRandomText();
})