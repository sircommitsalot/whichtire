import calculateTireDimensions from './math.js';
import renderSidebar, { tireFlatWidthEl, rimWidthEl } from './sidebar.js';
import renderDiagram, { canvasRadius } from './diagram.js'

const render = rimWidthRaw => {
  const rimWidth = parseFloat(rimWidthRaw);
  const tireFlatWidth = parseFloat(tireFlatWidthEl.value);
  const { diameter, minRadius, radius, height } = calculateTireDimensions({ rimWidth, tireFlatWidth });
  const scaleFactor = canvasRadius / minRadius;
  renderSidebar({ diameter, height });
  renderDiagram({ radius, rimWidth, scaleFactor });
}

const handleRimWidthChange = e => {
  const val = e.target.value;
  render(val);
}

rimWidthEl.addEventListener('input', handleRimWidthChange);
render(rimWidthEl.value);