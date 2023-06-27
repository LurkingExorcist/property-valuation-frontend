import * as _ from 'lodash';

import { Star } from './Star';
import { Resolution } from './types';

const { pow } = Math;

export class StarsRenderer {
  private ctx: CanvasRenderingContext2D;
  private starsCount: number;
  private maxDistanse: number;

  private stars: Star[] = [];
  private animationFrame: number | null = null;

  private timestamp = new Date();
  private deltaT = 0;

  constructor(options: { canvas: HTMLCanvasElement }) {
    const ctx = options.canvas.getContext('2d');
    if (_.isNil(ctx)) throw new Error('Canvas is not found');

    this.ctx = ctx;
    this.ctx.fillStyle = 'white';

    const { width, height } = this.getResolution();

    this.starsCount = Math.floor(
      pow(pow(width, 2) + pow(height, 2), 1 / 2) / 16
    );
    this.maxDistanse = pow(pow(width, 2) + pow(height, 2), 1 / 2) / 16;
  }

  getResolution(): Resolution {
    return {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height,
    };
  }

  getCtx() {
    return this.ctx;
  }

  init() {
    const { width, height } = this.getResolution();
    this.stars = [];

    for (let i = 0; i < this.starsCount; i++) {
      const x = _.random(0, width);
      const y = _.random(0, height);
      this.stars.push(new Star(x, y));
    }

    this.animationFrame = requestAnimationFrame(this.moveStars.bind(this));
  }

  destroy() {
    this.stars = [];
    if (!_.isNull(this.animationFrame))
      cancelAnimationFrame(this.animationFrame);
  }

  private moveStars() {
    const { width, height } = this.getResolution();

    this.ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < this.starsCount; i++) {
      for (let j = 0; j < this.starsCount; j++) {
        const distance = this.stars[i].distance(this.stars[j]);
        if (distance < this.maxDistanse) {
          this.drawStarsPath(this.stars[i], this.stars[j], distance);
        }
      }

      this.stars[i].draw(this.getCtx());
      this.stars[i].incrementAngle();
      this.stars[i].move({
        resolution: this.getResolution(),
        deltaT: this.deltaT,
      });
    }

    this.computeDeltaTime();
    requestAnimationFrame(this.moveStars.bind(this));
  }

  private computeDeltaTime() {
    const timestamp = new Date();

    this.deltaT = this.timestamp.getTime() - timestamp.getTime();
    this.timestamp = timestamp;
  }

  private drawStarsPath(star1: Star, star2: Star, distance: number) {
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${
      (this.maxDistanse - distance) / this.maxDistanse / 2
    })`;

    this.ctx.beginPath();
    this.ctx.moveTo(star1.x, star1.y);
    this.ctx.lineTo(star2.x, star2.y);
    this.ctx.stroke();
  }
}
