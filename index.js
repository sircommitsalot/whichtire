const canvas = document.getElementById('canvas');

const styles = getComputedStyle(canvas.parentElement);
const w = parseInt(styles.getPropertyValue('width'), 10);
const h = parseInt(styles.getPropertyValue('height'), 10);

const smallDimension = Math.min(w, h);

canvas.width = smallDimension;
canvas.height = smallDimension;

const ctx = canvas.getContext('2d');

const centroidX = canvas.width / 2;
const centroidY = canvas.height / 2;
const canvasRadius = (centroidX - ctx.lineWidth) / 2;
const startAngle = Math.PI * 0.5;
const endAngle = Math.PI * 2.5;

const tireFlatWidthEl = document.getElementById('tire-flat-width');
tireFlatWidthEl.value = 110;
tireFlatWidthEl.disabled = true;

const rimWidthEl = document.getElementById('rim-width');
const tireWidthEl = document.getElementById('tire-width');
const tireHeightEl = document.getElementById('tire-height');

const renderCenterPoint = () => {
  ctx.beginPath();
  ctx.arc(centroidX, centroidY, canvasRadius / 100, 0, Math.PI * 2);
  ctx.fill();
}

const renderTireAndRim = (radius, angleOffset) => {
  console.log(radius)
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
  const flatWidth = parseInt(tireFlatWidthEl.value, 10)
  const startRadius = flatWidth / Math.PI / 2;
  const scaleFactor = canvasRadius / startRadius;
  
  const halfChord = chord / 2;
  const radius = startRadius + halfChord / 2;
  
  const diameter = radius * 2;
  const sagitta = radius - Math.sqrt(radius * radius - halfChord * halfChord);
  const tireHeight = diameter - sagitta;
  
  tireWidthEl.innerText = String(diameter.toFixed(2));
  tireHeightEl.innerText = String(tireHeight.toFixed(2));
  
  const angleOffset = (chord * scaleFactor) / canvas.width * Math.PI / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderCenterPoint();
  renderTireAndRim(radius * scaleFactor, angleOffset);
  renderVirtualTireBottom(radius * scaleFactor, angleOffset);
}

const handleSliderInput = e => {
  const val = e.target.value;
  render(val);
}

document.getElementById('rim-width').addEventListener('input', handleSliderInput);
render(rimWidthEl.value);