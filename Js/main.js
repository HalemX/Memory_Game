//Main Variables
const startControl = document.querySelector(".start-control");
const startControlSpan = document.querySelector(".start-control span");
const infoContainer = document.querySelector(".info-container");
const infoContainerName = document.querySelector(".info-container .name span");
const memoryGameBlocks = document.querySelector(".memory-game-blocks");
const memoryBlock = document.querySelectorAll(
  ".memory-game-blocks .game-block"
);
const hour = document.getElementById("h");
const minutes = document.getElementById("m");
const secondes = document.getElementById("s");
const pupup = document.querySelector(".pupup");

//When Click On start Control Span
startControlSpan.onclick = handleSpan;

//Create Function To Handle Span Click
function handleSpan() {
  let userName = prompt("What's Your Name");

  if (userName === null || userName === "") {
    infoContainerName.innerHTML = "Unknown";
  } else {
    infoContainerName.innerHTML = userName;
  }
  //Set Timer Increase
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  setInterval(() => {
    hour.innerHTML = date.getHours();
    minutes.innerHTML = date.getMinutes();
    secondes.innerHTML = date.getSeconds();
    if (document.getElementById("h").innerHTML < 10) {
      document.getElementById("h").innerHTML = `0${date.getHours()}`;
    }
    if (document.getElementById("m").innerHTML < 10) {
      document.getElementById("m").innerHTML = `0${date.getMinutes()}`;
    }
    if (document.getElementById("s").innerHTML < 10) {
      document.getElementById("s").innerHTML = `0${date.getSeconds()}`;
    }
    date.setTime(date.getTime() + 1000);
    if (date.getMinutes() === 1) {
      pupup.innerHTML = `Ops,Time Is Up Try Again `;
      pupup.style.display = "block"
      memoryGameBlocks.style.opacity = "0.2"
      memoryGameBlocks.classList.add("no-clicking");
      infoContainer.style.opacity = "0.2";
    }
  }, 1000);
  startControl.remove();
  document.getElementById("welcome").play();
}

//Get Random Order Of Each Block
const arrOfBlocks = Array.from(memoryBlock);
arrOfBlocks.forEach((block) => {
  const randomNum = Math.floor(Math.random() * arrOfBlocks.length + 1);
  block.style.order = randomNum;

  //Add Class Flipped by function
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

//Flipped function
function flipBlock(setBlock) {
  setBlock.classList.add("is-flipped");

  //Collect All Flipped Block
  const allFlippedBlocks = arrOfBlocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  //If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    //Stop Clicking
    stopClicked();

    //Check Function
    checkMatchBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

//Stop Clicking Function
function stopClicked() {
  //Add Class
  memoryGameBlocks.classList.add("no-clicking");

  //After Time Remove Class
  setTimeout(() => {
    memoryGameBlocks.classList.remove("no-clicking");
  }, 1000);
}

//Check Match Block
function checkMatchBlocks(firstBlock, secondBlock) {
  let triesEle = document.querySelector(".trias span");
  if (firstBlock.dataset.player === secondBlock.dataset.player) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    const allFlippedBlocksMatch = arrOfBlocks.filter((match) =>
      match.classList.contains("has-match")
    );
    if (allFlippedBlocksMatch.length === 20) {
      pupup.innerHTML = `Good Jop The Fail Tries Is ${triesEle.innerHTML}`;
      pupup.style.display = "block"
      memoryGameBlocks.style.opacity = "0.2"
      infoContainer.style.opacity = "0.2";
    }
    document.getElementById("suc").play();
  } else {
    triesEle.innerHTML = parseInt(triesEle.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, 1000);
    document.getElementById("fail").play();
  }
}
