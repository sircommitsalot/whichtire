const canvas = document.getElementById('canvas');

const styles = getComputedStyle(canvas.parentElement);
const w = parseInt(styles.getPropertyValue("width"), 10);
const h = parseInt(styles.getPropertyValue("height"), 10);

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

const centroidX = canvas.width / 2;
const centroidY = canvas.height / 2;
const startRadius = (centroidX - ctx.lineWidth) / 2;
const startAngle = Math.PI * 0.5;
const endAngle = Math.PI * 2.5;

const tireFlatWidth = startRadius * 2 * Math.PI;

const scaleFactor = 110.2 / tireFlatWidth;

const tireFlatWidthEl = document.getElementById('tire-flat-width');
tireFlatWidthEl.value = tireFlatWidth * scaleFactor;
tireFlatWidthEl.disabled = true;

const rimWidthEl = document.getElementById('rim-width');
const tireWidthEl = document.getElementById('tire-width');
const tireHeightEl = document.getElementById('tire-height');

const renderCenterPoint = () => {
  ctx.beginPath();
  ctx.arc(centroidX, centroidY, startRadius / 100, 0, Math.PI * 2);
  ctx.fill();
}

const renderTireAndRim = (radius, angleOffset) => {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.arc(centroidX, centroidY, radius, startAngle + angleOffset, endAngle - angleOffset);
  ctx.closePath();
  ctx.stroke();
}

const renderVirtualTireBottom = (radius, angleOffset) => {
  ctx.beginPath();
  ctx.setLineDash([1, 2]);
  ctx.arc(centroidX, centroidY, radius, startAngle + angleOffset, endAngle - angleOffset, true);
  ctx.stroke();
}

const render = (chord = 0) => {
  const scaledChord = chord / scaleFactor;
  const halfChord = scaledChord / 2;
  const radius = startRadius + halfChord / 2;
  
  const diameter = radius * 2;
  const sagitta = radius - Math.sqrt(radius * radius - halfChord * halfChord);
  const tireHeight = diameter - sagitta;
  
  tireWidthEl.innerText = String((diameter * scaleFactor).toFixed(2));
  tireHeightEl.innerText = String((tireHeight * scaleFactor).toFixed(2));
  
  const angleOffset = scaledChord / canvas.width * Math.PI / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderCenterPoint();
  renderTireAndRim(radius, angleOffset);
  renderVirtualTireBottom(radius, angleOffset);
}

const handleSliderInput = e => {
  const val = e.target.value;
  render(val);
}

document.getElementById('rim-width').addEventListener('input', handleSliderInput);
render(rimWidthEl.value);