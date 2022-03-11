const RADIUS_ERROR_CORRECTION_ATTEMPTS = 100;

const getMinRadius = tireArcLength => {
  return tireArcLength / Math.PI / 2;
}

const getHeight = (diameter, radius, halfChord) => {
  return diameter - (radius - (Math.sqrt(radius * radius - halfChord * halfChord) || 0))
}

const fromArcLength = (rimWidth, tireArcLength) => {
  const minRadius = getMinRadius(tireArcLength);
  const halfChord = rimWidth / 2;
  const estimatedRadius = minRadius + halfChord / 2;
  const radius = correctRadius({ chord: rimWidth, arc: tireArcLength, radius: estimatedRadius });
  const diameter = radius * 2;
  return {
    minRadius,
    arcLength: tireArcLength,
    diameter,
    radius,
    height: getHeight(diameter, radius, halfChord),
  }
}

const fromWidth = (rimWidth, tireWidth) => {
  const radius = tireWidth / 2;
  const circumference = tireWidth * Math.PI;
  const arcLength = circumference - tireWidth * Math.asin(rimWidth / tireWidth);
  return {
    minRadius: getMinRadius(arcLength),
    arcLength,
    diameter: tireWidth,
    radius: tireWidth / 2,
    height: getHeight(tireWidth, radius, rimWidth / 2),
  }
}

const calculateTireDimensions = ({ rimWidth, tireArcLength = undefined, tireWidth = undefined }) => {
  if (tireWidth === undefined) {
    return fromArcLength(rimWidth, tireArcLength);
  }
  return fromWidth(rimWidth, tireWidth);
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