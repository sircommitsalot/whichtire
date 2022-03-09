const calculateTireDimensions = ({ tireFlatWidth, rimWidth }) => {
  // Radius of the tire when rim size is 0
  const minRadius = tireFlatWidth / Math.PI / 2;
  const halfChord = rimWidth / 2;
  
  // Naive model: Every unit increase in chord length
  //              is 1/4 unit increases in radius
  // Insert numeric analysis here
  const radius = minRadius + halfChord / 2;
  
  const diameter = radius * 2;
  const sagitta = radius - (Math.sqrt(radius * radius - halfChord * halfChord) || 0);
  return {
    minRadius,
    radius,
    diameter,
    height: diameter - sagitta,
  }
}

export default calculateTireDimensions;