/* Notes:

1) I had some real trouble recreating the CSS from the video. I had no idea why. After some investigating, I realized I was using the CSS property "border" and not "outline". It turns out these properties are positioned slightly differently, and create spacing around objects in different ways.

*/

let game = document.getElementById("game");
let score = document.getElementById("score");

/* Number of boxes, for-loop with boxes, let htmlVar= "html string" */

let boxNo = 25;
for (let i = 0; i < boxNo; i++) {
  /* create html boxes x 25 */
  let boxHTML = "<div class = 'box'></div>";
  //insert it in html.
  game.innerHTML += boxHTML;
}

let boxes = document.getElementsByClassName("box");

/* CREATE game function */
function runGame() {
  /* set interval where red boxes turn up. */
  setInterval(gameProcess, 1000);
}
runGame();

// The rand function.
function rand(hi) {
  return Math.floor(Math.random() * hi);
}

// This process picks a random number, picks the box it corresponds to, and makes the box red.
function gameProcess() {
  let randomNum = rand(boxNo);
  let target = boxes[randomNum];
  target.style.backgroundColor = "palevioletred";
}

// There's a wrinkle here: event.target.style only picks up inline styles, and not in <style> tags. MDN recommends using Window.getComputedStyle().
// Guide: This event-listens a click, checks if the box is red, and if it is, it updates the score and pops the color out.
let points = 0;
window.addEventListener("click", function (event) {
  if (event.target.style.backgroundColor == "palevioletred") {
    console.log(points++);
    score.innerHTML = points;
    event.target.style.backgroundColor = "";
  }
});
