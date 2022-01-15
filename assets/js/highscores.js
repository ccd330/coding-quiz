function printHighscores() {
  // get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sort highscores by score
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    // create li tag for high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // show on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// load page
printHighscores();
