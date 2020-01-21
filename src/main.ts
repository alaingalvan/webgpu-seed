import Renderer from './renderer';

const canvas = document.getElementById('gfx') as HTMLCanvasElement;
canvas.width = canvas.height = 640;
const renderer = new Renderer(canvas);
renderer.start();
