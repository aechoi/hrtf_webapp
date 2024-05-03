const waveforms = (function () {
  const waveformCanvas = document.getElementById("waveformCanvas");
  const waveformCanvasContext = waveformCanvas.getContext("2d");
  waveformCanvasContext.clearRect(
    0,
    0,
    waveformCanvas.width,
    waveformCanvas.height
  );

  function drawFull(rawAudio) {
    // todo make a waveform object that stores the waveform data + stuff like
    // how much the waveform has been panned left to right
    // also, this may work better by putting the canvas on a slider and having
    // the slider be sized to match the time length of the waveform
    // this would automatically give things like having zero defined and not
    // letting you pan past the end of the longest waveform. Although you'd
    // want a way to extend data past the end.

    console.log("drawFull called");
    console.log(rawAudio);

    // update canvas
    const rowHeight = 200;
    waveformCanvas.height = rawAudio.length * rowHeight;

    // plot waveform
    console.log("plotting waveform");
    const bufferLength = rawAudio[rawAudio.length - 1].length;
    const waveformWidth = waveformCanvas.width;

    console.log("drawing waveform");
    waveformCanvasContext.beginPath();
    for (let waveIdx = 0; waveIdx < rawAudio.length; waveIdx++) {
      const waveformCenter = (waveIdx + 0.5) * rowHeight;
      waveformCanvasContext.moveTo(0, waveformCenter);
      for (let i = 0; i < bufferLength; i++) {
        const x = (i / bufferLength) * waveformWidth;
        const y = waveformCenter - (rawAudio[waveIdx][i] * rowHeight) / 2;
        waveformCanvasContext.lineTo(x, y);
      }
    }
    waveformCanvasContext.stroke();
  }

  return { drawFull };
})();

export default waveforms;
