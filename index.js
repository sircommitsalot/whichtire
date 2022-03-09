import calculateTireDimensions from './math.js';
import renderSidebar, { tireFlatWidthEl, rimWidthEl, rimWidthSlider, sidebar } from './sidebar.js';
import renderDiagram, { getCanvasRadius, sizeCanvas } from './diagram.js';

const render = rimWidthRaw => {
  const canvasRadius = getCanvasRadius();
  const rimWidth = parseFloat(rimWidthRaw);
  const tireFlatWidth = parseFloat(tireFlatWidthEl.value);
  const { diameter, minRadius, radius, height } = calculateTireDimensions({ rimWidth, tireFlatWidth });
  const scaleFactor = canvasRadius / minRadius;
  renderSidebar({ diameter, height });
  renderDiagram({ radius, rimWidth, scaleFactor });
}

const handleRimWidthChange = e => {
  const val = e.target.value;
  rimWidthSlider.value = val;
  rimWidthEl.value = val;
  render(val);
}

const handleResize = () => {
  const isVertical = window.innerHeight > window.innerWidth;
  if (isVertical) {
    document.body.classList.add('vertical');
  } else {
    document.body.classList.remove('vertical');
  }
  sizeCanvas(sidebar, isVertical);
  render(rimWidthEl.value);
}


window.addEventListener('resize', handleResize);
rimWidthEl.addEventListener('input', handleRimWidthChange);
rimWidthSlider.addEventListener('input', handleRimWidthChange);
handleResize();