const tireWidthEl = document.getElementById('tire-width');
const tireHeightEl = document.getElementById('tire-height');
export const sidebar = document.getElementById('sidebar');
export const tireFlatWidthEl = document.getElementById('tire-flat-width');
export const rimWidthEl = document.getElementById('rim-width');
export const rimWidthSlider = document.getElementById('rim-width-slider');

tireFlatWidthEl.value = 110.2;
tireFlatWidthEl.disabled = true;

const max = tireFlatWidthEl.value / Math.PI * 2;
rimWidthEl.max = max;
rimWidthSlider.max = max;

const render = ({
  diameter,
  height,
}) => {
  tireWidthEl.innerText = String(diameter.toFixed(2));
  tireHeightEl.innerText = String(height.toFixed(2));
};

export default render;