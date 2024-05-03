import waveforms from "./waveforms.js";

const processFiles = (function () {
  const input = document.getElementById("fileInput");
  const player = document.getElementById("audioPlayer");
  const download = document.getElementById("download");
  let reader;

  // const waveformCanvas = document.getElementById("waveformCanvas");
  // const waveformCanvasContext = waveformCanvas.getContext("2d");
  // waveformCanvasContext.clearRect(
  //   0,
  //   0,
  //   waveformCanvas.width,
  //   waveformCanvas.height
  // );
  let rawAudio = [];

  // Load data into player when file is uploaded
  input.addEventListener("change", fileChange);
  function fileChange(event) {
    const file = event.target.files[0];

    reader = new FileReader();
    // takes a while for the file to load. So do this once it's read.
    // Equivalent to reader.addEventListener("load", function() {...});
    reader.onload = function (event) {
      download.disabled = false;
      player.src = reader.result;

      const arrayBuffer = event.target.result;
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      audioContext.decodeAudioData(arrayBuffer, function (decodedBuffer) {
        // Get raw PCM samples
        let latestAudio = decodedBuffer.getChannelData(0);
        rawAudio.push(latestAudio);
        console.log("raw audio length: " + rawAudio.length);

        waveforms.drawFull(rawAudio);

        // // update canvas
        // const rowHeight = 200;
        // waveformCanvas.height = rawAudio.length * rowHeight;

        // // plot waveform
        // console.log("plotting waveform");
        // const bufferLength = latestAudio.length;
        // const waveformWidth = waveformCanvas.width;
        // const waveformCenter = (rawAudio.length - 1 + 0.5) * rowHeight;
        // waveformCanvasContext.beginPath();
        // waveformCanvasContext.moveTo(0, waveformCenter);

        // console.log("drawing waveform");
        // for (let i = 0; i < bufferLength; i++) {
        //   const x = (i / bufferLength) * waveformWidth;
        //   const y = waveformCenter - (latestAudio[i] * rowHeight) / 2;
        //   waveformCanvasContext.lineTo(x, y);
        // }

        // waveformCanvasContext.stroke();
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

  if (!reader) download.disabled = true;
  download.addEventListener("click", downloadFile);
  function downloadFile() {
    const a = document.createElement("a");
    if (!reader) return;
    a.href = player.src;
    a.download = "audio.wav";
    a.click();
  }
})();
