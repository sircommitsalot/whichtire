import calculateTireDimensions from './math.js';
import renderSidebar, { tireFlatWidthEl, rimWidthEl, rimWidthSlider, sidebar } from './sidebar.js';
import renderDiagram, { getCanvasRadius, sizeCanvas } from './diagram.js';

const render = () => {
  const rimWidth = parseFloat(rimWidthEl.value);
  const tireArcLength = parseFloat(tireFlatWidthEl.value);
  const {
    diameter,
    minRadius,
    radius,
    height,
  } = calculateTireDimensions({
    rimWidth,
    tireArcLength,
  });
  const canvasRadius = getCanvasRadius();
  const scaleFactor = canvasRadius / minRadius;
  renderSidebar({
    diameter,
    height,
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
  render(rimWidthEl.value);
};

const handleRimWidthInput = e => {
  const rimWidth = e.target.value;
  rimWidthEl.value = rimWidth;
  rimWidthSlider.value = rimWidth;
  render();
};

window.addEventListener('resize', handleResize);
rimWidthEl.addEventListener('input', handleRimWidthInput);
rimWidthSlider.addEventListener('input', handleRimWidthInput);
tireFlatWidthEl.addEventListener('input', render);
handleResize();