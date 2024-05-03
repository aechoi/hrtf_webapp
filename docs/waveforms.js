const waveforms = (function () {
  const fullWaveTable = document.getElementById("fullWaveTable");
  const waveformCanvas = document.getElementById("waveformCanvas");
  const waveformCanvasContext = waveformCanvas.getContext("2d");
  waveformCanvasContext.clearRect(
    0,
    0,
    waveformCanvas.width,
    waveformCanvas.height
  );

  function updateFull(rawAudio, fileData) {
    // todo make a waveform object that stores the waveform data + stuff like
    // how much the waveform has been panned left to right
    // also, this may work better by putting the canvas on a slider and having
    // the slider be sized to match the time length of the waveform
    // this would automatically give things like having zero defined and not
    // letting you pan past the end of the longest waveform. Although you'd
    // want a way to extend data past the end.
    // TODO: fix download

    console.log("drawFull called");
    fullWaveTable.innerHTML = "";

    for (let i = 0; i < rawAudio.length; i++) {
      let row = fullWaveTable.insertRow(i);
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);

      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "fullWave";
      cell0.appendChild(radio);

      // create canvas for waveform
      let fullCanvas = document.createElement("canvas");
      fullCanvas.setAttribute("width", "800");
      fullCanvas.setAttribute("height", "200");
      let fullCtx = fullCanvas.getContext("2d");

      // plot waveform
      console.log("plotting waveform");
      const bufferLength = rawAudio[rawAudio.length - 1].length;
      const waveformWidth = fullCanvas.width;
      fullCtx.beginPath();
      const waveformCenter = 0.5 * fullCanvas.height;
      fullCtx.moveTo(0, waveformCenter);
      for (let j = 0; j < bufferLength; j++) {
        const x = (j / bufferLength) * waveformWidth;
        const y = waveformCenter - (rawAudio[i][j] * fullCanvas.height) / 2;
        fullCtx.lineTo(x, y);
      }
      fullCtx.stroke();
      cell1.appendChild(fullCanvas);

      // save button
      let saveButton = document.createElement("button");
      saveButton.innerHTML = "Download";
      saveButton.addEventListener("click", function downloadFile() {
        const a = document.createElement("a");
        a.href = fileData;
        console.log(fileData);
        a.download = "audio.wav";
        a.click();
      });
      cell2.appendChild(saveButton);
    }
  }

  return { updateFull };
})();

export default waveforms;
