import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

import MatterWrap from './wrap';
import Line from './line';
import { Hands, Camera } from '../../utils/hands';

type HANDtype = {
  HAND01: Matter.Body;
  HAND12: Matter.Body;
  HAND23: Matter.Body;
  HAND34: Matter.Body;
  HAND05: Matter.Body;
  HAND56: Matter.Body;
  HAND67: Matter.Body;
  HAND78: Matter.Body;
  HAND59: Matter.Body;
  HAND9a: Matter.Body;
  HANDab: Matter.Body;
  HANDbc: Matter.Body;
  HAND9d: Matter.Body;
  HANDde: Matter.Body;
  HANDef: Matter.Body;
  HANDfg: Matter.Body;
  HANDdh: Matter.Body;
  HANDhi: Matter.Body;
  HANDij: Matter.Body;
  HANDjk: Matter.Body;
  HAND0h: Matter.Body;
};

const WIDTH_C = 800;
const HEIGHT_C = 600;

const WIDTH = innerWidth;
const HEIGHT = innerHeight;

const lineUpdate = (
  body: Matter.Body,
  p1: { x: number; y: number; visibility: undefined },
  p2: { x: number; y: number; visibility: undefined },
) => {
  const line = new Line([
    {
      x: (1 - p1.x) * WIDTH - (WIDTH - WIDTH_C) / 2,
      y: p1.y * HEIGHT - (HEIGHT - HEIGHT_C) / 2,
    },
    {
      x: (1 - p2.x) * WIDTH - (WIDTH - WIDTH_C) / 2,
      y: p2.y * HEIGHT - (HEIGHT - HEIGHT_C) / 2,
    },
  ]);

  const vertices = line.getVertices();
  const bodies = Matter.Bodies.fromVertices(0, 0, vertices);
  const bounds = Matter.Bounds.create(vertices);

  const fx =
    bodies.position.x - bodies.bounds.min.x + bounds.min.x - body.position.x;
  const fy =
    bodies.position.y - bodies.bounds.min.y + bounds.min.y - body.position.y;

  Matter.Body.translate(body, Matter.Vector.create(fx, fy));

  // Matter.Body.applyForce(
  //   body,
  //   Matter.Vector.create(
  //     bodies.position.x - bodies.bounds.min.x + bounds.min.x,
  //     bodies.position.y - bodies.bounds.min.y + bounds.min.y,
  //   ),
  //   Matter.Vector.create(fx, fy),
  // );

  Matter.Body.setVertices(body, vertices);
};

function Hand() {
  const video = useRef({} as HTMLVideoElement);
  const ref = useRef({} as HTMLDivElement);
  const canvas = useRef({} as HTMLCanvasElement);

  const [HAND, setHAND] = useState<HANDtype>();
  const [marks, setMarks] = useState<any>();

  useEffect(() => {
    // module aliases
    Matter.use(MatterWrap);

    const {
      Engine,
      Render,
      World,
      Bodies,
      Composites,
      Common,
      Composite,
    } = Matter;

    // create an engine
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
      element: ref.current,
      canvas: canvas.current,
      engine,
      options: {
        width: WIDTH_C,
        height: HEIGHT_C,
        wireframes: false,
      },
    });

    // create two boxes and a ground
    // add bodies
    const stack = Composites.stack(20, 20, 20, 5, 0, 0, (x: any, y: any) =>
      Bodies.circle(x, y, Common.random(10, 20), {
        friction: 0.00001,
        restitution: 0.5,
        density: 0.001,
      }),
    );

    const HAND01 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND12 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND23 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND34 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND05 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND56 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND67 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND78 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND59 = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND9a = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDab = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDbc = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND9d = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDde = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDef = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDfg = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDdh = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDhi = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDij = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HANDjk = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });
    const HAND0h = Bodies.rectangle(0, 0, 0, 0, { isStatic: true });

    setHAND({
      HAND01,
      HAND12,
      HAND23,
      HAND34,
      HAND05,
      HAND56,
      HAND67,
      HAND78,
      HAND59,
      HAND9a,
      HANDab,
      HANDbc,
      HAND9d,
      HANDde,
      HANDef,
      HANDfg,
      HANDdh,
      HANDhi,
      HANDij,
      HANDjk,
      HAND0h,
    });

    // add all of the bodies to the world
    World.add(engine.world, [
      HAND01,
      HAND12,
      HAND23,
      HAND34,
      HAND05,
      HAND56,
      HAND67,
      HAND78,
      HAND59,
      HAND9a,
      HANDab,
      HANDbc,
      HAND9d,
      HANDde,
      HANDef,
      HANDfg,
      HANDdh,
      HANDhi,
      HANDij,
      HANDjk,
      HAND0h,
    ]);

    World.add(engine.world, stack);

    World.add(engine.world, [
      Bodies.rectangle(200, 150, 700, 20, {
        isStatic: true,
        angle: Math.PI * 0.06,
        render: { fillStyle: '#060a19' },
      }),
      Bodies.rectangle(500, 350, 700, 20, {
        isStatic: true,
        angle: -Math.PI * 0.06,
        render: { fillStyle: '#060a19' },
      }),
      Bodies.rectangle(340, 580, 700, 20, {
        isStatic: true,
        angle: Math.PI * 0.04,
        render: { fillStyle: '#060a19' },
      }),
    ]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    Render.lookAt(render, Composite.allBodies(engine.world));

    // wrapping using matter-wrap plugin
    for (let i = 0; i < stack.bodies.length; i += 1) {
      stack.bodies[i].plugin.wrap = {
        min: { x: render.bounds.min.x, y: render.bounds.min.y },
        max: { x: render.bounds.max.x, y: render.bounds.max.y },
      };
    }
  }, []);

  useEffect(() => {
    const onResults = (results: any) => {
      if (results.multiHandLandmarks && results.multiHandedness) {
        // console.log(results.multiHandLandmarks[0]);
        setMarks(results.multiHandLandmarks[0]);
      }
    };

    const hands = new Hands({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.2,
      minTrackingConfidence: 0.2,
    });

    hands.onResults(onResults);

    const camera = new Camera(video.current, {
      onFrame: async () => {
        await hands.send({ image: video.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
  }, []);

  useEffect(() => {
    if (marks) {
      // console.log(marks);
      // console.log(normalize(marks[0], marks[1]));
      if (HAND) {
        // console.log(marks);
        lineUpdate(HAND.HAND01, marks[0], marks[1]);
        lineUpdate(HAND.HAND12, marks[1], marks[2]);
        lineUpdate(HAND.HAND23, marks[2], marks[3]);
        lineUpdate(HAND.HAND34, marks[3], marks[4]);

        lineUpdate(HAND.HAND05, marks[0], marks[5]);
        lineUpdate(HAND.HAND56, marks[5], marks[6]);
        lineUpdate(HAND.HAND67, marks[6], marks[7]);
        lineUpdate(HAND.HAND78, marks[7], marks[8]);

        lineUpdate(HAND.HAND59, marks[5], marks[9]);
        lineUpdate(HAND.HAND9a, marks[9], marks[10]);
        lineUpdate(HAND.HANDab, marks[10], marks[11]);
        lineUpdate(HAND.HANDbc, marks[11], marks[12]);
        lineUpdate(HAND.HAND9d, marks[9], marks[13]);
        lineUpdate(HAND.HANDde, marks[13], marks[14]);
        lineUpdate(HAND.HANDef, marks[14], marks[15]);
        lineUpdate(HAND.HANDfg, marks[15], marks[16]);
        lineUpdate(HAND.HANDdh, marks[13], marks[17]);
        lineUpdate(HAND.HANDhi, marks[17], marks[18]);
        lineUpdate(HAND.HANDij, marks[18], marks[19]);
        lineUpdate(HAND.HANDjk, marks[19], marks[20]);
        lineUpdate(HAND.HAND0h, marks[0], marks[17]);
      }
    }
  }, [marks, HAND]);

  return (
    <>
      <video style={{ display: 'none' }} ref={video} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
        ref={ref}
      >
        <canvas ref={canvas} />
      </div>
    </>
  );
}

export default Hand;
