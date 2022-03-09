const canvas = document.getElementById('canvas');

const styles = getComputedStyle(canvas.parentElement);
const smallDimension = Math.min(
  parseInt(styles.getPropertyValue('width'), 10),
  parseInt(styles.getPropertyValue('height'), 10),
);

canvas.width = smallDimension;
canvas.height = smallDimension;

const ctx = canvas.getContext('2d');

const centroidX = canvas.width / 2;
const centroidY = canvas.height / 2;
const startAngle = Math.PI * 0.5;
const endAngle = Math.PI * 2.5;

export const canvasRadius = (centroidX - ctx.lineWidth) / 2;

const renderCenterPoint = () => {
  ctx.beginPath();
  ctx.arc(centroidX, centroidY, canvasRadius / 100, 0, Math.PI * 2);
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

const render = ({ radius, rimWidth, scaleFactor }) => {
  const angleOffset = rimWidth * scaleFactor / canvas.width * Math.PI / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderCenterPoint();
  renderTireAndRim(radius * scaleFactor, angleOffset);
  renderVirtualTireBottom(radius * scaleFactor, angleOffset);
}

export default render;