import React, { useEffect, useRef } from 'react';
import {
  Engine,
  Render,
  World,
  Composites,
  Common,
  Bodies,
  Vector,
  Constraint,
  Mouse,
  MouseConstraint,
  Bounds,
} from 'matter-js';

import { D, O, uCircleTest, uTest } from './title';

const WIDTH_C = innerWidth;
const HEIGHT_C = innerHeight;

const Main = () => {
  const ref = useRef({} as HTMLDivElement);
  const canvas = useRef({} as HTMLCanvasElement);

  useEffect(() => {
    // create an engine
    const engine = Engine.create({
      enableSleeping: true,
    });

    // create a renderer
    const render = Render.create({
      element: ref.current,
      canvas: canvas.current,
      engine,
      options: {
        background: 'transparent',
        wireframes: false,
        width: WIDTH_C,
        height: HEIGHT_C,
        hasBounds: true,
      },
    });

    // create two boxes and a ground
    // add bodies
    const stack = Composites.stack(5, 5, 14, 9, 0, -3, (x: any, y: any) =>
      Bodies.circle(x, y, Math.floor(Common.random(10, 20)), {
        // isStatic: true,
        friction: 0.00001,
        restitution: 0.5,
        density: 0.001,
        render: {
          fillStyle: Math.floor(Common.random(0, 10))
            ? 'rgba(0,0,0,0.2)'
            : 'rgba(250,230,128,0.6)',
        },
      }),
    );
    World.add(engine.world, stack);

    World.add(engine.world, D(100, 150));

    // ? x: 200, y:
    const ut = uTest(200, 150);
    const uct = uCircleTest(200, 150);
    const c = Constraint.create({
      bodyA: ut,
      pointA: Vector.create(0, 0),
      bodyB: uct,
      pointB: Vector.create(0, 0),
      // stiffness: 1,
      render: {
        visible: false,
      },
    });
    World.add(engine.world, ut);
    World.add(engine.world, uct);
    World.add(engine.world, c);

    // ? / x: 350, y: 200
    World.add(engine.world, O(300, 150));

    World.add(engine.world, [
      Bodies.rectangle(400 + 10, 300 / 2, 400, 20, {
        isStatic: true,
        angle: 1.5708,
        render: { fillStyle: '#FFF' },
      }),
      Bodies.rectangle(-10, 300 / 2, 400, 20, {
        isStatic: true,
        angle: 1.5708,
        render: { fillStyle: '#FFF' },
      }),
      Bodies.rectangle(400 / 2, 300 + 10, 400, 20, {
        isStatic: true,
        render: { fillStyle: '#060a19' },
      }),
      Bodies.rectangle(400 / 2, -10, 400, 20, {
        isStatic: true,
        render: { fillStyle: '#060a19' },
      }),
    ]);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
    });
    World.add(engine.world, mouseConstraint);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    Bounds.translate(render.bounds, Vector.create(0, 0));

    render.bounds.max.x = 400;
    render.bounds.max.y = 300;
    render.bounds.min.x = 0;
    render.bounds.min.y = 0;

    // update mouse
    Mouse.setScale(mouse, Vector.create(400 / innerWidth, 300 / innerHeight));
    Mouse.setOffset(mouse, render.bounds.min);

    // console.log(render.bounds);
  }, []);
  return (
    <>
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
};

export default Main;
