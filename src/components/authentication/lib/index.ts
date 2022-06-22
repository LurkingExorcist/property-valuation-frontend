import * as _ from 'lodash';

const { pow } = Math;
const DELTA_RADIUS = 0.25;

const l = (a: number, b: number) => b - a;

const getHipothenuse = (star1: Star, star2: Star) =>
  pow(pow(l(star1.x, star2.x), 2) + pow(l(star1.y, star2.y), 2), 1 / 2);

type Resolution = { width: number; height: number };

export class Star {
  x: number;
  y: number;
  angle: number = 2 * Math.PI * Math.random();
  angleSpeed = _.random(128, 512);
  speed = 1;
  angleIteration = _.random(128, 512);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  incrementAngle() {
    this.angleIteration++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  move(resolution: Resolution) {
    const k = Math.sin(this.angleIteration / this.angleSpeed);

    this.x += DELTA_RADIUS * Math.cos(this.angle * k) * this.speed;
    if (this.x < 0) this.x = resolution.width + this.x;
    if (this.x > resolution.width) this.x = this.x - resolution.width;

    this.y += DELTA_RADIUS * Math.sin(this.angle * k) * this.speed;
    if (this.y < 0) this.y = resolution.height + this.y;
    if (this.y > resolution.height) this.y = this.y - resolution.height;
  }
}

export class StarsController {
  private ctx: CanvasRenderingContext2D;
  private starsCount: number;
  private maxDistanse: number;
  private stars: Star[] = [];
  private animationFrame: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (_.isNil(ctx)) throw new Error('Canvas is not found');

    this.ctx = ctx;
    this.ctx.fillStyle = 'white';

    const { width, height } = this.getResolution();

    this.starsCount = Math.floor(
      pow(pow(width, 2) + pow(height, 2), 1 / 2) / 4
    );
    this.maxDistanse = pow(pow(width, 2) + pow(height, 2), 1 / 2) / 24;
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
        const distance = getHipothenuse(this.stars[i], this.stars[j]);
        if (distance < this.maxDistanse) {
          this.stars[i].speed = 1 + (1 - distance / this.maxDistanse) * 2;
          this.stars[j].speed = 1 + (1 - distance / this.maxDistanse) * 2;
          this.drawStarsPath(this.stars[i], this.stars[j], distance);
        }
      }

      this.stars[i].draw(this.getCtx());
      this.stars[i].incrementAngle();
      this.stars[i].move(this.getResolution());
    }

    requestAnimationFrame(this.moveStars.bind(this));
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
