const processFiles = (function () {
  const input = document.getElementById("fileInput");
  const player = document.getElementById("audioPlayer");
  let reader;

  // Load data into player when file is uploaded
  input.addEventListener("change", fileChange);
  function fileChange(event) {
    const file = event.target.files[0];

    reader = new FileReader();
    reader.onload = function (event) {
      player.src = event.target.result;

      const buffer = event.target.result;
      const dataView = new DataView(buffer);

      console.log(dataView);
    };
    reader.readAsDataURL(file);
  }

  // play when play button clicked
  player.addEventListener("play", playReader);
  function playReader() {
    player.play;
  }
})();
