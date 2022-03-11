import calculateTireDimensions from './math.js';
import renderSidebar, { tireFlatWidthEl, rimWidthEl, tireWidthEl, rimWidthSlider, sidebar } from './sidebar.js';
import renderDiagram, { getCanvasRadius, sizeCanvas } from './diagram.js';

const render = ({
  tireArcLength,
  tireWidth,
}) => {
  const rimWidth = parseFloat(rimWidthEl.value);
  const {
    diameter,
    minRadius,
    radius,
    height,
    arcLength,
  } = calculateTireDimensions({
    rimWidth,
    tireWidth,
    tireArcLength,
  });
  const canvasRadius = getCanvasRadius();
  const scaleFactor = canvasRadius / minRadius;
  renderSidebar({
    diameter,
    height,
    arcLength,
  });
  renderDiagram({
    radius,
    rimWidth,
    scaleFactor,
  });
};

const handleResize = () => {
  const isVertical = window.innerHeight > window.innerWidth;
  if (isVertical) {
    document.body.classList.add('vertical');
  } else {
    document.body.classList.remove('vertical');
  }
  sizeCanvas(sidebar, isVertical);
  render({ tireWidth: parseFloat(tireWidthEl.value) });
};

const handleRimWidthInput = e => {
  const rimWidth = e.target.value;
  rimWidthEl.value = rimWidth;
  rimWidthSlider.value = rimWidth;
  render({ tireWidth: parseFloat(tireWidthEl.value) });
};

const handleTireWidthInput = e => {
  render({ tireWidth: parseFloat(e.target.value) });
}

const handleTireArcLengthInput = e => {
  render({ tireArcLength: parseFloat(e.target.value) });
}

window.addEventListener('resize', handleResize);
rimWidthEl.addEventListener('input', handleRimWidthInput);
rimWidthSlider.addEventListener('input', handleRimWidthInput);
tireFlatWidthEl.addEventListener('input', handleTireArcLengthInput);
tireWidthEl.addEventListener('input', handleTireWidthInput);
handleResize();