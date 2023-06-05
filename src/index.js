import gsap from 'gsap';
import './style.css';
import gardenBackground from '../images/garden.jpg';
import butterflyImage from '../images/butterfly.png';

/**
 * @typedef {Object} vector
 * @property {number} x
 * @property {number} y
 */

let butterfly;
let tl;
let flitDistance = 30;
let flitSpeed = 0.1;

window.onload = () => {
  document.body.style.backgroundImage = `url(${gardenBackground})`;
  butterfly = document.querySelector('.butterfly');
  butterfly.querySelector('div').style.backgroundImage = `url(${butterflyImage})`;

  // const degress =
};
window.onclick = (event) => {
  const { x, y } = getMousePosition(event);
  moveButterflyToXPosition(butterfly, { x, y });
};

const getMousePosition = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  return { x, y };
};

/**
 *
 * @param {HTMLElement} butterfly
 * @param {vector} destination
 */
const moveButterflyToXPosition = (butterfly, destination) => {
  // get current position
  const originalPosition = getCurrentPosition(butterfly);
  console.log('original position', originalPosition);
  console.log('destination', destination);
  // get distance to travel
  const distance = calcDistanceBetweenVectors(originalPosition, destination);
  console.log('vector distance', distance);
  // get number of flits
  const numberOfFlits = getNumberOfFlits(distance);
  console.log('numberOfFlits', numberOfFlits);
  // create butterfly timline
  if (tl) tl.kill();
  tl = getButterflyTimeline(butterfly, numberOfFlits, originalPosition, destination);
  tl.play();
};

const getCurrentPosition = (butterfly) => {
  const { x, y } = butterfly.getBoundingClientRect();
  return { x, y };
};

/**
 * Get number of flits
 *
 * @param {number} distance
 * @returns
 */
const getNumberOfFlits = (distance) => {
  // butterfly can travel 100px per flit (flitDistance)
  return Math.ceil(distance / flitDistance) + Math.floor(Math.random() * 5);
};

/**
 * Calculate Distance between two vectors
 *
 * @see https://www.mathsisfun.com/algebra/distance-2-points.html
 *
 * @param {vector} vector1
 * @param {vector} vector2
 */
const calcDistanceBetweenVectors = (vector1, vector2) => {
  const x = Math.pow(vector1.x - vector2.x, 2);
  const y = Math.pow(vector1.y - vector2.y, 2);
  return Math.sqrt(x + y);
};

/**
 *
 * @param {HTMLElement} butterfly
 * @param {number} numberOfFlits
 * @param {vector} originalPosition
 * @param {vector} destination
 * @returns
 */
const getButterflyTimeline = (butterfly, numberOfFlits, originalPosition, destination) => {
  let flitLatitude = 12 + Math.random() * 5;
  let flitAmplitude = 50;
  const xDistance = destination.x - originalPosition.x;
  const yDistance = destination.y - originalPosition.y;
  console.log('xDistance', xDistance);
  console.log('yDistance', yDistance);
  tl = gsap.timeline();
  for (let i = 1; i <= numberOfFlits; i++) {
    let isEven = i % 2 === 0;
    if (isEven) {
      flitLatitude = flitLatitude * -1;
    }

    let x = originalPosition.x + parseInt(xDistance / numberOfFlits) * i;
    let y = originalPosition.y + parseInt(yDistance / numberOfFlits) * i;
    console.log(`y: ${y.toFixed(2)}, sin(x): ${Math.sin(x)})`);
    if (Math.abs(xDistance) > Math.abs(yDistance)) {
      y += Math.sin(x) * flitAmplitude;
    } else {
      x += Math.sin(y) * flitAmplitude;
    }
    if (xDistance < 0) {
      // flip the butterfly. However, in order to do this we need gsap to control the flap animation
    }
    tl.to(butterfly, {
      x: `${x}`,
      y: `${y}`,

      duration: flitSpeed,
      ease: 'bouce.out',
    });
  }
  return tl;
};
