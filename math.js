const RADIUS_ERROR_CORRECTION_ATTEMPTS = 100;

const calculateTireDimensions = ({ tireArcLength, rimWidth }) => {
  // Radius of the tire when rim size is 0
  const minRadius = tireArcLength / Math.PI / 2;
  const halfChord = rimWidth / 2;
  const uncorrectedRadius = minRadius + halfChord / 2;
  const radius = correctRadius({ chord: rimWidth, arc: tireArcLength, radius: uncorrectedRadius });
  const diameter = radius * 2;
  const sagitta = radius - (Math.sqrt(radius * radius - halfChord * halfChord) || 0);
  return {
    minRadius,
    radius,
    diameter,
    height: diameter - sagitta,
  }
}

const correctRadius = ({ chord, arc, radius, attempt = 0 }) => {
  const diameter = 2 * radius;
  const leftSide = Math.sin(arc / diameter);
  const rightSide = chord / diameter;
  const error = leftSide - rightSide;
  if (attempt === RADIUS_ERROR_CORRECTION_ATTEMPTS) {
    return radius;
  }
  return correctRadius({ chord, arc, radius: radius - error, attempt: attempt + 1 });
}

export default calculateTireDimensions;