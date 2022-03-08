const svg = document.getElementById('svg');
const ctx = svg.getContext('2d');

const width = svg.width / 2;
const height = svg.height / 2;
const radius = width - ctx.lineWidth;
const startAngle = Math.PI;
const endAngle = Math.PI * 2;

const renderCenterPoint = () => {
  ctx.beginPath();
  ctx.arc(width, height, radius / 100, 0, Math.PI * 2);
  ctx.fill();
}

const renderTireAndRim = angleOffset => {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.arc(width, height, radius, startAngle - angleOffset, endAngle + angleOffset);
  ctx.closePath();
  ctx.stroke();
}

const renderVirtualTireBottom = angleOffset => {
  ctx.beginPath();
  ctx.setLineDash([5, 15]);
  ctx.arc(width, height, radius, startAngle - angleOffset, endAngle + angleOffset, true);
  ctx.stroke();
}

const render = (sliderPercentage = 0) => {
  const angleOffset = sliderPercentage / 100 * Math.PI / 2;
  
  ctx.clearRect(0, 0, svg.width, svg.height);
  renderCenterPoint();
  renderTireAndRim(angleOffset);
  renderVirtualTireBottom(angleOffset);
}

const handleSliderInput = e => {
  const val = e.target.value;
  render(val);
}

document.getElementById('range').addEventListener('input', handleSliderInput);
render();