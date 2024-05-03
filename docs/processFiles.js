import waveforms from "./waveforms.js";

const processFiles = (function () {
  const input = document.getElementById("fileInput");
  const addButton = document.getElementById("addButton");
  const player = document.getElementById("audioPlayer");
  // const download = document.getElementById("download");
  let reader;

  let rawAudio = [];

  // Load data into player when file is uploaded
  // input.addEventListener("change", fileChange);
  addButton.addEventListener("click", fileChange);
  function fileChange(event) {
    if (input.files.length === 0) return;
    const file = input.files[0];

    reader = new FileReader();
    // takes a while for the file to load. So do this once it's read.
    // Equivalent to reader.addEventListener("load", function() {...});
    reader.onload = function (event) {
      download.disabled = false;
      player.src = reader.result;
      console.log(reader.result);

      const arrayBuffer = event.target.result;
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      audioContext.decodeAudioData(arrayBuffer, function (decodedBuffer) {
        // Get raw PCM samples
        let latestAudio = decodedBuffer.getChannelData(0);
        rawAudio.push(latestAudio);
        console.log("raw audio length: " + rawAudio.length);
        console.log(reader);
        waveforms.updateFull(rawAudio, reader.result);
      });
    };

    reader.readAsArrayBuffer(file);
    console.log("file uploaded");
  }

  // play when play button clicked
  player.addEventListener("play", playReader);
  function playReader() {
    player.play;
  }

  // if (!reader) download.disabled = true;
  // download.addEventListener("click", downloadFile);
  // function downloadFile() {
  //   const a = document.createElement("a");
  //   if (!reader) return;
  //   a.href = player.src;
  //   a.download = "audio.wav";
  //   a.click();
  // }
})();
