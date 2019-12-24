/// <reference path="../node_modules/@webgpu/types/index.d.ts" />

// 📈 Position Vertex Buffer Data
const positions = new Float32Array([ 
    1.0, -1.0, 0.0, 
    -1.0, -1.0, 0.0, 
    0.0, 1.0, 0.0
]);

// 🎨 Color Vertex Buffer Data
const colors = new Float32Array([ 
    1.0, 0.0, 0.0, // 🔴
    0.0, 1.0, 0.0, // 🟢 
    0.0, 0.0, 1.0  // 🔵
]);

// 🗄️ Index Buffer Data
const indices = new Uint16Array([ 0, 1, 2, 1, 2, 3 ]);

class Renderer {
    canvas: HTMLCanvasElement;

    // ⚙️ API Data Structures
    adapter: GPUAdapter;
    device: GPUDevice;
    queue: GPUQueue;

    // 🎞️ Frame Backings
    swapchain: GPUSwapChain;
    colorTexture: GPUTexture;
    colorTextureView: GPUTextureView;
    depthTexture: GPUTexture;
    depthTextureView: GPUTextureView;

    // 🔺 Resources
    positionBuffer: GPUBuffer;
    colorBuffer: GPUBuffer;
    indexBuffer: GPUBuffer;
    vertModule: GPUShaderModule;
    fragModule: GPUShaderModule;
    pipeline: GPURenderPipeline;

    commandEncoder: GPUCommandEncoder;
    passEncoder: GPURenderPassEncoder;

    constructor(canvas) {
        this.canvas = canvas;
    }

    // 🏎️ Start the rendering engine
    async start() {
        if (await this.initializeAPI()) {
            this.resizeBackings();
            await this.initializeResources();
            this.render();
        }
    }

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
            this.device.onuncapturederror = (e) => console.error(e);

            // 📦 Queue
            this.queue = this.device.defaultQueue;
        } catch (e) {
            console.error(e);
            return false;
        }

        return true;
    }

    // 🍱 Initialize resources to render triangle (buffers, shaders, pipeline)
    async initializeResources() {
        // 🔺 Buffers
        let mapBuffers = (arr: Float32Array | Uint16Array, usage: number) => {
            var desc = { size: arr.byteLength, usage };
            let [ buffer, bufferMapped ] = this.device.createBufferMapped(desc);
            const writeArray =
                usage === GPUBufferUsage.INDEX ? new Uint16Array(bufferMapped) : new Float32Array(bufferMapped);
            writeArray.set(arr);
            buffer.unmap();
            return buffer;
        };

        this.positionBuffer = mapBuffers(positions, GPUBufferUsage.VERTEX);
        this.colorBuffer = mapBuffers(colors, GPUBufferUsage.VERTEX);
        this.indexBuffer = mapBuffers(indices, GPUBufferUsage.INDEX);

        // 🖍️ Shaders
        var loadShader = (shaderPath: string) =>
            fetch(new Request(shaderPath), { method: 'GET', mode: 'cors' }).then((res) =>
                res.arrayBuffer().then((arr) => new Uint32Array(arr))
            );

        const vsmDesc: any = { code: await loadShader('triangle.vert.spv') };
        this.vertModule = this.device.createShaderModule(vsmDesc);

        const fsmDesc: any = { code: await loadShader('triangle.frag.spv') };
        this.fragModule = this.device.createShaderModule(fsmDesc);

        // 🔣 Input Assembly
        const positionAttribDesc: GPUVertexAttributeDescriptor = {
            shaderLocation: 0, // [[attribute(0)]]
            offset: 0,
            format: 'float3'
        };
        const colorAttribDesc: GPUVertexAttributeDescriptor = {
            shaderLocation: 1, // [[attribute(1)]]
            offset: 0,
            format: 'float3'
        };
        const positionBufferDesc: GPUVertexBufferLayoutDescriptor = {
            attributes: [ positionAttribDesc ],
            arrayStride: 4 * 3, // sizeof(float) * 3
            stepMode: 'vertex'
        };
        const colorBufferDesc: GPUVertexBufferLayoutDescriptor = {
            attributes: [ colorAttribDesc ],
            arrayStride: 4 * 3, // sizeof(float) * 3
            stepMode: 'vertex'
        };

        const vertexState: GPUVertexStateDescriptor = {
            indexFormat: 'uint16',
            vertexBuffers: [ positionBufferDesc, colorBufferDesc ]
        };

        // ⚗️ Graphics Pipeline
        const depthStencilState: GPUDepthStencilStateDescriptor = {
            depthWriteEnabled: true,
            depthCompare: 'less',
            format: 'depth24plus-stencil8'
        };

        const pipelineLayoutDesc = { bindGroupLayouts: [] };
        const layout = this.device.createPipelineLayout(pipelineLayoutDesc);
        const vertexStage = {
            module: this.vertModule,
            entryPoint: 'main'
        };
        const fragmentStage = {
            module: this.fragModule,
            entryPoint: 'main'
        };
        const colorState: GPUColorStateDescriptor = {
            format: 'bgra8unorm',
            alphaBlend: {
                srcFactor: 'src-alpha',
                dstFactor: 'one-minus-src-alpha',
                operation: 'add'
            },
            colorBlend: {
                srcFactor: 'src-alpha',
                dstFactor: 'one-minus-src-alpha',
                operation: 'add'
            },
            writeMask: GPUColorWrite.ALL
        };

        const rasterizationState: GPURasterizationStateDescriptor = {
            frontFace: 'cw',
            cullMode: 'none'
        };

        const pipelineDesc: GPURenderPipelineDescriptor = {
            layout,

            vertexStage,
            fragmentStage,

            primitiveTopology: 'triangle-list',
            colorStates: [ colorState ],
            depthStencilState,
            vertexState,
            rasterizationState
        };
        this.pipeline = this.device.createRenderPipeline(pipelineDesc);
    }

    // ↙️ Resize swapchain, frame buffer attachments
    resizeBackings() {
        // ⛓️ Swapchain
        if (!this.swapchain) {
            const context: GPUCanvasContext = this.canvas.getContext('gpupresent') as any;
            const swapChainDesc: GPUSwapChainDescriptor = {
                device: this.device,
                format: 'bgra8unorm',
                usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC
            };
            this.swapchain = context.configureSwapChain(swapChainDesc);
        }

        // 🤔 Depth Backing
        const depthSize = {
            width: this.canvas.width,
            height: this.canvas.height,
            depth: 1
        };

        const depthTextureDesc: GPUTextureDescriptor = {
            size: depthSize,
            arrayLayerCount: 1,
            mipLevelCount: 1,
            sampleCount: 1,
            dimension: '2d',
            format: 'depth24plus-stencil8',
            usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC
        };

        this.depthTexture = this.device.createTexture(depthTextureDesc);
        this.depthTextureView = this.depthTexture.createView();
    }

    // ✍️ Write commands to send to the GPU
    encodeCommands() {
        let colorAttachment: GPURenderPassColorAttachmentDescriptor = {
            attachment: this.colorTextureView,
            loadValue: { r: 0, g: 0, b: 0, a: 1 },
            storeOp: 'store'
        };

        const depthAttachment: GPURenderPassDepthStencilAttachmentDescriptor = {
            attachment: this.depthTextureView,
            depthLoadValue: 1,
            depthStoreOp: 'store',
            stencilLoadValue: 'load',
            stencilStoreOp: 'store'
        };

        const renderPassDesc: GPURenderPassDescriptor = {
            colorAttachments: [ colorAttachment ],
            depthStencilAttachment: depthAttachment
        };

        this.commandEncoder = this.device.createCommandEncoder();

        // 🖌️ Encode drawing commands
        this.passEncoder = this.commandEncoder.beginRenderPass(renderPassDesc);
        this.passEncoder.setPipeline(this.pipeline);
        this.passEncoder.setViewport(0, 0, this.canvas.width, this.canvas.height, 0, 1);
        this.passEncoder.setScissorRect(0, 0, this.canvas.width, this.canvas.height);
        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);
        this.passEncoder.setIndexBuffer(this.indexBuffer);
        this.passEncoder.drawIndexed(3, 1, 0, 0, 0);
        this.passEncoder.endPass();

        this.queue.submit([ this.commandEncoder.finish() ]);
    }

    render = () => {
        // ⏭ Acquire next image from swapchain
        this.colorTexture = this.swapchain.getCurrentTexture();
        this.colorTextureView = this.colorTexture.createView();

        // 📦 Write and submit commands to queue
        this.encodeCommands();

        // ➿ Refresh canvas
        requestAnimationFrame(this.render);
    };
}
