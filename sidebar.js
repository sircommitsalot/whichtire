const tireHeightEl = document.getElementById('tire-height');
export const tireWidthEl = document.getElementById('tire-width');
export const sidebar = document.getElementById('sidebar');
export const tireFlatWidthEl = document.getElementById('tire-flat-width');
export const rimWidthEl = document.getElementById('rim-width');
export const rimWidthSlider = document.getElementById('rim-width-slider');

const render = ({
  diameter,
  height,
  arcLength,
}) => {
  const maxRimWidth = tireFlatWidthEl.value / Math.PI * 2;
  rimWidthEl.max = maxRimWidth;
  rimWidthSlider.max = maxRimWidth;
  
  tireWidthEl.value = String(diameter.toFixed(2));
  tireFlatWidthEl.value = String(arcLength.toFixed(2));
  tireHeightEl.innerText = String(height.toFixed(2));
};

export default render;