
import {
  Engine,
  Render,
  World,
  Composites,
  Common,
  Bodies,
  Vertices,
  Svg,
  Vector,
  Composite,
  IBodyDefinition,
  Constraint,
  Body,
} from 'matter-js';

import Line from '../Hand/line';

const titles = [
  [
    // D
    { x: 240, y: 250 },
    { x: 240, y: 230 },
    { x: 230, y: 210 },
    { x: 220, y: 200 },
    { x: 180, y: 200 },
    { x: 180, y: 300 },
    { x: 220, y: 300 },
    { x: 230, y: 290 },
    { x: 240, y: 270 },
    { x: 240, y: 250 },
  ],
  [
    // ?
    { x: 480, y: 410 },
    { x: 480, y: 390 },
    { x: 495, y: 375 },
    { x: 520, y: 375 },
    { x: 535, y: 390 },
    { x: 535, y: 415 },
    { x: 520, y: 430 },
    { x: 510, y: 440 },
    { x: 510, y: 470 },
  ],
  [
    // o
    { x: 0, y: 22 },

    { x: 0, y: 10 - 15 },
    { x: 10, y: 0 - 15 },
    { x: 20, y: 0 - 15 },
    { x: 30, y: 10 - 15 },
    
    { x: 30, y: 20 },
    { x: 20, y: 30 },
    { x: 10, y: 30 },
    
    { x: 0, y: 19 },
    // { x: 350, y: 375 },
  ],
];


export const D = (x: number, y: number) => Bodies.fromVertices(
  x, y,
  (new Line(titles[0], 7)).getVertices(),
  {
    render: {
      fillStyle: '#000',
      strokeStyle: '#000',
      lineWidth: 1,
    },
  },
  true,
);

// const createPartsOfU = (x:number, y:number) => Body.create({
//   parts: [...titles[1].map((t) => {
//     const line = (new Line([t], 7));
//     return Bodies.fromVertices(
//       x, y,
//       line.getVertices(),
//       {
//       render: {
//         fillStyle: '#000',
//         strokeStyle: '#000',
//         lineWidth: 1,
//       },
//     });
//   }),
// ]
// });

function createPartsOfU(x :number, y :number) {
  
  const lineVertices = Bodies.fromVertices(
    x, y,
    (new Line(titles[1], 7)).getVertices(),
    {
      render: {
        fillStyle: '#000',
        strokeStyle: '#000',
        lineWidth: 1,
      },
    },
    true,
  )
  
  /*
  const lineVertices = [];

  for(let i = 1; i < titles[1].length; i += 1){

    const T = titles[1][i];
    const oldT = titles[1][i - 1];
    
    const line = (new Line([T, oldT], 1));
    
    const X = (line.insidePoints[0].x + line.insidePoints[1].x) / 2 - x;
    const Y = (line.insidePoints[0].y + line.insidePoints[1].y) / 2 - y;

    lineVertices.push(
      Bodies.fromVertices(
        X, Y,
        line.getVertices(),
        {
          isStatic: true,
          render: {
            fillStyle: '#000',
            strokeStyle: '#000',
            lineWidth: 6,
          },
        }
      )
    );
  }
  */

  return lineVertices;
}

export const uTest =  (x: number, y: number) => createPartsOfU(x, y);

export const uCircleTest = (x: number, y: number) => Bodies.circle(x, y+90, 10, {
  render: {
    fillStyle: '#000',
    strokeStyle: '#000',
    lineWidth: 1,
  },
});

export const O = (x: number, y: number) => Bodies.fromVertices(
  x, y,
  (new Line(titles[2], 7)).getVertices(),
  {
    render: {
      fillStyle: '#000',
      strokeStyle: '#000',
      lineWidth: 1,
    },
  },
  true,
);
