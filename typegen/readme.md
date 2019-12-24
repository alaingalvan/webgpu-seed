# 🔺 WebGPU Types

[![License][license-img]][license-url]
[![Unit Tests][travis-img]][travis-url]
[![devDependency Status][david-dev-img]][david-dev-url]

```bash
npm i -D https://github.com/alaingalvan/webgpu-types.git
```

An automatically generated TypeScript definition file for WebGPU.

## Usage

```ts
// 🌟 Initialize WebGPU
async initializeAPI(): Promise<boolean> {
    try {
        // 🏭 Entry to WebGPU
        const entry: GPU = navigator.gpu;
        if (!entry) {
            return false;
        }

        // 🔌 Physical Device Adapter
        this.adapter = await entry.requestAdapter();

        // 💻 Logical Device
        this.device = await this.adapter.requestDevice();

        // 📦 Queue
        this.queue = this.device.defaultQueue;
    } catch (e) {
        console.error(e);
        return false;
    }

    return true;
}
```

Visit the [WebGPU Specification](https://gpuweb.github.io/gpuweb/) for more information on WebGPU as well as samples.

## Alternatives

- [@webgpu/types](https://github.com/gpuweb/types) - Used in [BabylonJS](https://github.com/BabylonJS/Babylon.js/blob/WebGPU/src/Engines/webgpuEngine.ts), [WebGPU Test Suite](https://github.com/gpuweb/cts).

## Development

Be sure to have:

- [Git](https://git-scm.com/downloads)

- Any terminal such as [VS Code's Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)

And type the following in any folder:

```bash
# 🐑 Clone the repo
git clone https://github.com/alaingalvan/webgpu-types.git --recurse-submodules

# 💿 go inside the folder
cd webgpu-types

# 👯 If you forget to `recurse-submodules` you can always run:
git submodule update --init

# 🔨 Build your type definition
npm start
```

[license-img]: http://img.shields.io/:license-unlicense-blue.svg?style=flat-square
[license-url]: https://unlicense.org/
[david-dev-url]: https://david-dm.org/alaingalvan/webgpu-types#info=devDependencies
[david-dev-img]: https://david-dm.org/alaingalvan/webgpu-types/dev-status.svg?style=flat-square
[travis-img]: https://img.shields.io/travis/alaingalvan/webgpu-types.svg?style=flat-square
[travis-url]:https://travis-ci.org/alaingalvan/webgpu-types
[codecov-img]:https://img.shields.io/codecov/c/github/alaingalvan/webgpu-types.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/alaingalvan/webgpu-types
[npm-img]: https://img.shields.io/npm/v/webgpu-types.svg?style=flat-square
[npm-url]: http://npm.im/webgpu-types
[npm-download-img]: https://img.shields.io/npm/dm/webgpu-types.svg?style=flat-square