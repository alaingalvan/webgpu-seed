![Cover Art](https://alain.xyz/blog/raw-webgpu/assets/cover.jpg)

# 🔺 WebGPU Seed

[![License][license-img]][license-url]
[![Unit Tests][travis-img]][travis-url]
[![Dependency Status][david-img]][david-url]
[![devDependency Status][david-dev-img]][david-dev-url]

A WebGPU repo you can use to get started with your own renderer.

- [🔳 Codepen Example](https://codepen.io/alaingalvan/pen/GRgvLGw)

- [💬 Blog Post](https://alain.xyz/blog/raw-webgpu)

> Visit the [`typegen` branch](https://github.com/alaingalvan/webgpu-seed/tree/typegen) for type generation, but otherwise you should use [`@types/webgpu`](https://www.npmjs.com/package/@webgpu/types).

## Setup

First install:

- [Git](https://git-scm.com/)

- [Node.js](https://nodejs.org/en/)

- A Text Editor such as [Visual Studio Code](https://code.visualstudio.com/).

Then type the following in any terminal your such as [VS Code's Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

```bash
# 🐑 Clone the repo
git clone https://github.com/alaingalvan/webgpu-seed

# 💿 go inside the folder
cd webgpu-seed

# 🔨 Start installing dependencies, building, and running at localhost:8080
npm start
```

> Refer to [this blog post on designing web libraries and apps](https://alain.xyz/blog/designing-a-web-app) for more details on Node.js, packages, etc.

## Project Layout

As your project becomes more complex, you'll want to separate files and organize your application to something more akin to a game or renderer, check out this post on [game engine architecture](https://alain.xyz/blog/game-engine-architecture) and this one on [real time renderer architecture](https://alain.xyz/blog/realtime-renderer-architectures) for more details.

```bash
├─ 📂 node_modules/   # 👶 Dependencies
│  ├─ 📁 gl-matrix      # ➕ Linear Algebra
│  └─ 📁 ...            # 🕚 Other Dependencies (TypeScript, Webpack, etc.)
├─ 📂 src/            # 🌟 Source Files
│  ├─ 📄 index.html     #  📇 Main HTML file
│  └─ 📄 renderer.ts    # 🔺 Triangle Renderer
├─ 📄 .gitignore      # 👁️ Ignore certain files in git repo
├─ 📄 package.json    # 📦 Node Package File
├─ 📄 license.md      # ⚖️ Your License (Unlicense)
└─ 📃readme.md        # 📖 Read Me!
```


[license-img]: https://img.shields.io/:license-unlicense-blue.svg?style=flat-square
[license-url]: https://unlicense.org/
[david-url]: https://david-dm.org/alaingalvan/webgpu-seed
[david-img]: https://david-dm.org/alaingalvan/webgpu-seed/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/alaingalvan/webgpu-seed#info=devDependencies
[david-dev-img]: https://david-dm.org/alaingalvan/webgpu-seed/dev-status.svg?style=flat-square
[travis-img]: https://img.shields.io/travis/alaingalvan/webgpu-seed.svg?style=flat-square
[travis-url]:https://travis-ci.org/alaingalvan/webgpu-seed
