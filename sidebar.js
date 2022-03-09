const tireWidthEl = document.getElementById('tire-width');
const tireHeightEl = document.getElementById('tire-height');
export const tireFlatWidthEl = document.getElementById('tire-flat-width');
export const rimWidthEl = document.getElementById('rim-width');

tireFlatWidthEl.value = 110;
tireFlatWidthEl.disabled = true;

const render = ({ diameter, height }) => {
  tireWidthEl.innerText = String(diameter.toFixed(2));
  tireHeightEl.innerText = String(height.toFixed(2));
}

export default render;