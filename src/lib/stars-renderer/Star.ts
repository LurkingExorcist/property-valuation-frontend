import * as _ from 'lodash';

import { Resolution } from './types';

export class Star {
  x: number;
  y: number;
  angle: number = 2 * Math.PI * Math.random();
  angleSpeed = _.random(128, 512);
  speed = 1 / 32;
  angleIteration = _.random(128, 512);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  incrementAngle() {
    this.angleIteration++;
  }

  distance(star: Star) {
    return Math.hypot(this.x - star.x, this.y - star.y);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  move(options: { deltaT: number; resolution: Resolution }) {
    const k = Math.sin(this.angleIteration / this.angleSpeed);

    this.x += Math.cos(this.angle * k) * this.speed * options.deltaT;
    if (this.x < 0) this.x = options.resolution.width + this.x;
    if (this.x > options.resolution.width)
      this.x = this.x - options.resolution.width;

    this.y += Math.sin(this.angle * k) * this.speed * options.deltaT;
    if (this.y < 0) this.y = options.resolution.height + this.y;
    if (this.y > options.resolution.height)
      this.y = this.y - options.resolution.height;
  }
}
