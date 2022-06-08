/* Notes:

1) I had some real trouble recreating the CSS from the video. I had no idea why. After some investigating, I realized I was using the CSS property "border" and not "outline". It turns out these properties are positioned slightly differently, and create spacing around objects in different ways.
2) Implemented functionality: 
    * "If a box can be selected twice, then it changes to a different color and requires 2 clicks."
    * The game has an opening screen and a start button (and title)

*/

let game = document.getElementById("game");
let score = document.getElementById("score");

// Start dialog

document.getElementById("start").addEventListener("click", function (event) {
  console.log("Clicked");
  runGame();
});

// Number of boxes, for-loop with boxes, let htmlVar= "html string" */

let boxNo = 25;
for (let i = 0; i < boxNo; i++) {
  // create 25 html boxes
  let boxHTML = "<div class = 'box'></div>";
  //display it in html
  game.innerHTML += boxHTML;
}

let boxes = document.getElementsByClassName("box");

/* CREATE game function */
function runGame() {
  /* set interval where red boxes turn up. */
  setInterval(gameProcess, 1000);
}

// The rand function. Takes a number 'hi', and returns a random number between 0 and 'hi'
function rand(hi) {
  return Math.floor(Math.random() * hi);
}

// This process picks a random number, picks the box it corresponds to, and makes the box red.
function gameProcess() {
  let randomNum = rand(boxNo);
  let target = boxes[randomNum];
  if (target.style.backgroundColor == !"lightsalmon") {
    target.style.backgroundColor = "lightsalmon";
  } else {
    target.style.backgroundColor = "indianred";
    // This pushes a background image of a mole when the square gets deep red. The basic logic works, but the visual effect of this particular picture isn't amazing.
    target.style.backgroundImage =
      "url(http://www.clker.com/cliparts/2/7/c/3/13189594971286782138Furry%20Mole.svg.med.png)";
  }
}

// There's a wrinkle here: event.target.style only picks up inline styles, and not in <style> tags. MDN recommends using Window.getComputedStyle().
// Guide: This event-listens a click, checks if the box is red, and if it is, it updates the score and pops the color out.
let points = 0;
window.addEventListener("click", function (event) {
  if (event.target.style.backgroundColor == "lightsalmon") {
    console.log(points++);
    score.innerHTML = points;
    event.target.style.backgroundColor = "";
    event.target.style.backgroundImage = "";
  }
});

// Doubleclick cases, when the tile is extra-red.
window.addEventListener("click", function (event) {
  if (event.target.style.backgroundColor == "indianred") {
    console.log(points++);
    score.innerHTML = points;
    event.target.style.backgroundColor = "lightsalmon";
  }
});
