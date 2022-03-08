const svg = document.getElementById('svg');
const ctx = svg.getContext('2d');

const centroidX = svg.width / 2;
const centroidY = svg.height / 2;
const startRadius = (centroidX - ctx.lineWidth) / 2;
const startAngle = Math.PI * 0.5;
const endAngle = Math.PI * 2.5;

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
  ctx.setLineDash([5, 15]);
  ctx.arc(centroidX, centroidY, radius, startAngle + angleOffset, endAngle - angleOffset, true);
  ctx.stroke();
}

const render = (sliderPercentage = 0) => {
  const angleOffset = sliderPercentage * Math.PI / 2;
  const chordLength = sliderPercentage * svg.width;
  const radiusContribution = chordLength / 4;
  const radius = startRadius + radiusContribution;
  
  ctx.clearRect(0, 0, svg.width, svg.height);
  renderCenterPoint();
  renderTireAndRim(radius, angleOffset);
  renderVirtualTireBottom(radius, angleOffset);
}

const handleSliderInput = e => {
  const val = e.target.value;
  render(val / 100);
}

document.getElementById('range').addEventListener('input', handleSliderInput);
render();