declare type GPUPowerPreference = 'low-power' | 'high-performance';
declare type GPUExtensionName = 'anisotropic-filtering';
declare type GPUTextureDimension = '1d' | '2d' | '3d';
declare type GPUTextureViewDimension =
  | '1d'
  | '2d'
  | '2d-array'
  | 'cube'
  | 'cube-array'
  | '3d';
declare type GPUTextureAspect = 'all' | 'stencil-only' | 'depth-only';
declare type GPUTextureFormat =
  | 'r8unorm'
  | 'r8snorm'
  | 'r8uint'
  | 'r8sint'
  | 'r16uint'
  | 'r16sint'
  | 'r16float'
  | 'rg8unorm'
  | 'rg8snorm'
  | 'rg8uint'
  | 'rg8sint'
  | 'r32uint'
  | 'r32sint'
  | 'r32float'
  | 'rg16uint'
  | 'rg16sint'
  | 'rg16float'
  | 'rgba8unorm'
  | 'rgba8unorm-srgb'
  | 'rgba8snorm'
  | 'rgba8uint'
  | 'rgba8sint'
  | 'bgra8unorm'
  | 'bgra8unorm-srgb'
  | 'rgb10a2unorm'
  | 'rg11b10float'
  | 'rg32uint'
  | 'rg32sint'
  | 'rg32float'
  | 'rgba16uint'
  | 'rgba16sint'
  | 'rgba16float'
  | 'rgba32uint'
  | 'rgba32sint'
  | 'rgba32float'
  | 'depth32float'
  | 'depth24plus'
  | 'depth24plus-stencil8';
declare type GPUTextureComponentType = 'float' | 'sint' | 'uint';
declare type GPUAddressMode = 'clamp-to-edge' | 'repeat' | 'mirror-repeat';
declare type GPUFilterMode = 'nearest' | 'linear';
declare type GPUCompareFunction =
  | 'never'
  | 'less'
  | 'equal'
  | 'less-equal'
  | 'greater'
  | 'not-equal'
  | 'greater-equal'
  | 'always';
declare type GPUBindingType =
  | 'uniform-buffer'
  | 'storage-buffer'
  | 'readonly-storage-buffer'
  | 'sampler'
  | 'sampled-texture'
  | 'storage-texture';
declare type GPUPrimitiveTopology =
  | 'point-list'
  | 'line-list'
  | 'line-strip'
  | 'triangle-list'
  | 'triangle-strip';
declare type GPUFrontFace = 'ccw' | 'cw';
declare type GPUCullMode = 'none' | 'front' | 'back';
declare type GPUBlendFactor =
  | 'zero'
  | 'one'
  | 'src-color'
  | 'one-minus-src-color'
  | 'src-alpha'
  | 'one-minus-src-alpha'
  | 'dst-color'
  | 'one-minus-dst-color'
  | 'dst-alpha'
  | 'one-minus-dst-alpha'
  | 'src-alpha-saturated'
  | 'blend-color'
  | 'one-minus-blend-color';
declare type GPUBlendOperation =
  | 'add'
  | 'subtract'
  | 'reverse-subtract'
  | 'min'
  | 'max';
declare type GPUStencilOperation =
  | 'keep'
  | 'zero'
  | 'replace'
  | 'invert'
  | 'increment-clamp'
  | 'decrement-clamp'
  | 'increment-wrap'
  | 'decrement-wrap';
declare type GPUIndexFormat = 'uint16' | 'uint32';
declare type GPUVertexFormat =
  | 'uchar2'
  | 'uchar4'
  | 'char2'
  | 'char4'
  | 'uchar2norm'
  | 'uchar4norm'
  | 'char2norm'
  | 'char4norm'
  | 'ushort2'
  | 'ushort4'
  | 'short2'
  | 'short4'
  | 'ushort2norm'
  | 'ushort4norm'
  | 'short2norm'
  | 'short4norm'
  | 'half2'
  | 'half4'
  | 'float'
  | 'float2'
  | 'float3'
  | 'float4'
  | 'uint'
  | 'uint2'
  | 'uint3'
  | 'uint4'
  | 'int'
  | 'int2'
  | 'int3'
  | 'int4';
declare type GPUInputStepMode = 'vertex' | 'instance';
declare type GPULoadOp = 'load';
declare type GPUStoreOp = 'store' | 'clear';
declare type GPUErrorFilter = 'none' | 'out-of-memory' | 'validation';
interface GPUColorDict {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface GPUOrigin2DDict {
  x?: number;
  y?: number;
}

interface GPUOrigin3DDict {
  x?: number;
  y?: number;
  z?: number;
}

interface GPUExtent3DDict {
  width: number;
  height: number;
  depth: number;
}

interface GPUObjectDescriptorBase {
  label?: string;
}

interface GPURequestAdapterOptions {
  powerPreference?: GPUPowerPreference;
}

interface GPUDeviceDescriptor extends GPUObjectDescriptorBase {
  extensions?: GPUExtensionName[];
  limits?: GPULimits;
}

interface GPULimits {
  maxBindGroups?: number;
  maxDynamicUniformBuffersPerPipelineLayout?: number;
  maxDynamicStorageBuffersPerPipelineLayout?: number;
  maxSampledTexturesPerShaderStage?: number;
  maxSamplersPerShaderStage?: number;
  maxStorageBuffersPerShaderStage?: number;
  maxStorageTexturesPerShaderStage?: number;
  maxUniformBuffersPerShaderStage?: number;
}

interface GPUBufferDescriptor extends GPUObjectDescriptorBase {
  size: number;
  usage: number;
}

interface GPUTextureDescriptor extends GPUObjectDescriptorBase {
  size: GPUExtent3DDict;
  arrayLayerCount?: number;
  mipLevelCount?: number;
  sampleCount?: number;
  dimension?: GPUTextureDimension;
  format: GPUTextureFormat;
  usage: number;
}

interface GPUTextureViewDescriptor extends GPUObjectDescriptorBase {
  format?: GPUTextureFormat;
  dimension?: GPUTextureViewDimension;
  aspect?: GPUTextureAspect;
  baseMipLevel?: number;
  mipLevelCount?: number;
  baseArrayLayer?: number;
  arrayLayerCount?: number;
}

interface GPUSamplerDescriptor extends GPUObjectDescriptorBase {
  addressModeU?: GPUAddressMode;
  addressModeV?: GPUAddressMode;
  addressModeW?: GPUAddressMode;
  magFilter?: GPUFilterMode;
  minFilter?: GPUFilterMode;
  mipmapFilter?: GPUFilterMode;
  lodMinClamp?: number;
  lodMaxClamp?: number;
  compare?: GPUCompareFunction;
}

interface GPUBindGroupLayoutDescriptor extends GPUObjectDescriptorBase {
  bindings: GPUBindGroupLayoutBinding[];
}

interface GPUBindGroupLayoutBinding {
  binding: number;
  visibility: number;
  type: GPUBindingType;
  textureDimension?: GPUTextureViewDimension;
  textureComponentType?: GPUTextureComponentType;
  multisampled?: boolean;
  hasDynamicOffset?: boolean;
}

interface GPUBindGroupDescriptor extends GPUObjectDescriptorBase {
  layout: GPUBindGroupLayout;
  bindings: GPUBindGroupBinding[];
}

interface GPUBindGroupBinding {
  binding: number;
  resource: GPUBufferBinding;
}

interface GPUBufferBinding {
  buffer: GPUBuffer;
  offset?: number;
  size?: number;
}

interface GPUPipelineLayoutDescriptor extends GPUObjectDescriptorBase {
  bindGroupLayouts: GPUBindGroupLayout[];
}

interface GPUShaderModuleDescriptor extends GPUObjectDescriptorBase {
  code: string;
}

interface GPUPipelineDescriptorBase extends GPUObjectDescriptorBase {
  layout: GPUPipelineLayout;
}

interface GPUProgrammableStageDescriptor {
  module: GPUShaderModule;
  entryPoint: string;
}

interface GPUComputePipelineDescriptor extends GPUPipelineDescriptorBase {
  computeStage: GPUProgrammableStageDescriptor;
}

interface GPURenderPipelineDescriptor extends GPUPipelineDescriptorBase {
  vertexStage: GPUProgrammableStageDescriptor;
  fragmentStage?: GPUProgrammableStageDescriptor;
  primitiveTopology: GPUPrimitiveTopology;
  rasterizationState?: GPURasterizationStateDescriptor;
  colorStates: GPUColorStateDescriptor[];
  depthStencilState?: GPUDepthStencilStateDescriptor;
  vertexState?: GPUVertexStateDescriptor;
  sampleCount?: number;
  sampleMask?: number;
  alphaToCoverageEnabled?: boolean;
}

interface GPURasterizationStateDescriptor {
  frontFace?: GPUFrontFace;
  cullMode?: GPUCullMode;
  depthBias?: number;
  depthBiasSlopeScale?: number;
  depthBiasClamp?: number;
}

interface GPUColorStateDescriptor {
  format: GPUTextureFormat;
  alphaBlend?: GPUBlendDescriptor;
  colorBlend?: GPUBlendDescriptor;
  writeMask?: number;
}

interface GPUBlendDescriptor {
  srcFactor?: GPUBlendFactor;
  dstFactor?: GPUBlendFactor;
  operation?: GPUBlendOperation;
}

interface GPUDepthStencilStateDescriptor {
  format: GPUTextureFormat;
  depthWriteEnabled?: boolean;
  depthCompare?: GPUCompareFunction;
  stencilFront?: GPUStencilStateFaceDescriptor;
  stencilBack?: GPUStencilStateFaceDescriptor;
  stencilReadMask?: number;
  stencilWriteMask?: number;
}

interface GPUStencilStateFaceDescriptor {
  compare?: GPUCompareFunction;
  failOp?: GPUStencilOperation;
  depthFailOp?: GPUStencilOperation;
  passOp?: GPUStencilOperation;
}

interface GPUVertexStateDescriptor {
  indexFormat?: GPUIndexFormat;
  vertexBuffers?: GPUVertexBufferLayoutDescriptor[];
}

interface GPUVertexBufferLayoutDescriptor {
  arrayStride: number;
  stepMode?: GPUInputStepMode;
  attributes: GPUVertexAttributeDescriptor[];
}

interface GPUVertexAttributeDescriptor {
  format: GPUVertexFormat;
  offset: number;
  shaderLocation: number;
}

interface GPUCommandBufferDescriptor extends GPUObjectDescriptorBase {}

interface GPUCommandEncoderDescriptor extends GPUObjectDescriptorBase {}

interface GPUBufferCopyView {
  buffer: GPUBuffer;
  offset?: number;
  rowPitch: number;
  imageHeight: number;
}

interface GPUTextureCopyView {
  texture: GPUTexture;
  mipLevel?: number;
  arrayLayer?: number;
  origin?: GPUOrigin3DDict;
}

interface GPUImageBitmapCopyView {
  imageBitmap: ImageBitmap;
  origin?: GPUOrigin2DDict;
}

interface GPUComputePassDescriptor extends GPUObjectDescriptorBase {}

interface GPURenderPassDescriptor extends GPUObjectDescriptorBase {
  colorAttachments: GPURenderPassColorAttachmentDescriptor[];
  depthStencilAttachment?: GPURenderPassDepthStencilAttachmentDescriptor;
}

interface GPURenderPassColorAttachmentDescriptor {
  attachment: GPUTextureView;
  resolveTarget?: GPUTextureView;
  loadValue: GPULoadOp | GPUColorDict;
  storeOp?: GPUStoreOp;
}

interface GPURenderPassDepthStencilAttachmentDescriptor {
  attachment: GPUTextureView;
  depthLoadValue: GPULoadOp | number;
  depthStoreOp: GPUStoreOp;
  stencilLoadValue: GPULoadOp | number;
  stencilStoreOp: GPUStoreOp;
}

interface GPURenderBundleDescriptor extends GPUObjectDescriptorBase {}

interface GPURenderBundleEncoderDescriptor extends GPUObjectDescriptorBase {
  colorFormats: GPUTextureFormat[];
  depthStencilFormat?: GPUTextureFormat;
  sampleCount?: number;
}

interface GPUFenceDescriptor extends GPUObjectDescriptorBase {
  initialValue?: number;
}

interface GPUSwapChainDescriptor extends GPUObjectDescriptorBase {
  device: GPUDevice;
  format: GPUTextureFormat;
  usage?: number;
}

interface GPUUncapturedErrorEventInit extends EventInit {
  error: GPUValidationError;
}

interface GPUObjectBase {
  label?: string;
}

interface Navigator {
  gpu?: GPU;
}

interface WorkerNavigator {
  gpu?: GPU;
}

interface GPU {
  requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter>;
}

interface GPUAdapter {
  name?: string;
  extensions?: GPUExtensionName;
  requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
}

interface GPUDevice extends EventTarget {
  adapter?: GPUAdapter;
  extensions?: GPUExtensionName;
  limits?: any;
  defaultQueue?: GPUQueue;
  createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
  createBufferMapped(descriptor: GPUBufferDescriptor): any;
  createTexture(descriptor: GPUTextureDescriptor): GPUTexture;
  createSampler(descriptor?: GPUSamplerDescriptor): GPUSampler;
  createBindGroupLayout(
    descriptor: GPUBindGroupLayoutDescriptor
  ): GPUBindGroupLayout;
  createPipelineLayout(
    descriptor: GPUPipelineLayoutDescriptor
  ): GPUPipelineLayout;
  createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;
  createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
  createComputePipeline(
    descriptor: GPUComputePipelineDescriptor
  ): GPUComputePipeline;
  createRenderPipeline(
    descriptor: GPURenderPipelineDescriptor
  ): GPURenderPipeline;
  createCommandEncoder(
    descriptor?: GPUCommandEncoderDescriptor
  ): GPUCommandEncoder;
  createRenderBundleEncoder(
    descriptor: GPURenderBundleEncoderDescriptor
  ): GPURenderBundleEncoder;
}

interface GPUBuffer {
  mapReadAsync(): Promise<ArrayBuffer>;
  mapWriteAsync(): Promise<ArrayBuffer>;
  unmap(): void;
  destroy(): void;
}

interface GPUBufferUsage {
  MAP_READ?: number;
  MAP_WRITE?: number;
  COPY_SRC?: number;
  COPY_DST?: number;
  INDEX?: number;
  VERTEX?: number;
  UNIFORM?: number;
  STORAGE?: number;
  INDIRECT?: number;
}

declare const GPUBufferUsage: GPUBufferUsage;

interface GPUTexture {
  createView(descriptor?: GPUTextureViewDescriptor): GPUTextureView;
  destroy(): void;
}

interface GPUTextureUsage {
  COPY_SRC?: number;
  COPY_DST?: number;
  SAMPLED?: number;
  STORAGE?: number;
  OUTPUT_ATTACHMENT?: number;
}

declare const GPUTextureUsage: GPUTextureUsage;

interface GPUTextureView {}

interface GPUSampler {}

interface GPUBindGroupLayout {}

interface GPUShaderStage {
  VERTEX?: number;
  FRAGMENT?: number;
  COMPUTE?: number;
}

declare const GPUShaderStage: GPUShaderStage;

interface GPUBindGroup {}

interface GPUPipelineLayout {}

interface GPUShaderModule {}

interface GPUComputePipeline {}

interface GPURenderPipeline {}

interface GPUColorWrite {
  RED?: number;
  GREEN?: number;
  BLUE?: number;
  ALPHA?: number;
  ALL?: number;
}

declare const GPUColorWrite: GPUColorWrite;

interface GPUCommandBuffer {}

interface GPUCommandEncoder {
  beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder;
  beginComputePass(
    descriptor?: GPUComputePassDescriptor
  ): GPUComputePassEncoder;
  copyBufferToBuffer(
    source: GPUBuffer,
    sourceOffset: number,
    destination: GPUBuffer,
    destinationOffset: number,
    size: number
  ): void;
  copyBufferToTexture(
    source: GPUBufferCopyView,
    destination: GPUTextureCopyView,
    copySize: GPUExtent3DDict
  ): void;
  copyTextureToBuffer(
    source: GPUTextureCopyView,
    destination: GPUBufferCopyView,
    copySize: GPUExtent3DDict
  ): void;
  copyTextureToTexture(
    source: GPUTextureCopyView,
    destination: GPUTextureCopyView,
    copySize: GPUExtent3DDict
  ): void;
  pushDebugGroup(groupLabel: string): void;
  popDebugGroup(): void;
  insertDebugMarker(markerLabel: string): void;
  finish(descriptor?: GPUCommandBufferDescriptor): GPUCommandBuffer;
}

interface GPUProgrammablePassEncoder {
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsets?: number[]
  ): void;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number
  ): void;
  pushDebugGroup(groupLabel: string): void;
  popDebugGroup(): void;
  insertDebugMarker(markerLabel: string): void;
}

interface GPUComputePassEncoder {
  setPipeline(pipeline: GPUComputePipeline): void;
  dispatch(x: number, y?: number, z?: number): void;
  dispatchIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): void;
  endPass(): void;
}

interface GPURenderEncoderBase {
  setPipeline(pipeline: GPURenderPipeline): void;
  setIndexBuffer(buffer: GPUBuffer, offset?: number): void;
  setVertexBuffer(slot: number, buffer: GPUBuffer, offset?: number): void;
  draw(
    vertexCount: number,
    instanceCount: number,
    firstVertex: number,
    firstInstance: number
  ): void;
  drawIndexed(
    indexCount: number,
    instanceCount: number,
    firstIndex: number,
    baseVertex: number,
    firstInstance: number
  ): void;
  drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): void;
  drawIndexedIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): void;
}

interface GPURenderPassEncoder {
  setViewport(
    x: number,
    y: number,
    width: number,
    height: number,
    minDepth: number,
    maxDepth: number
  ): void;
  setScissorRect(x: number, y: number, width: number, height: number): void;
  setBlendColor(color: GPUColorDict): void;
  setStencilReference(reference: number): void;
  executeBundles(bundles: GPURenderBundle[]): void;
  endPass(): void;
}

interface GPURenderBundle {}

interface GPURenderBundleEncoder {
  finish(descriptor?: GPURenderBundleDescriptor): GPURenderBundle;
}

interface GPUQueue {
  submit(commandBuffers: GPUCommandBuffer[]): void;
  createFence(descriptor?: GPUFenceDescriptor): GPUFence;
  signal(fence: GPUFence, signalValue: number): void;
  copyImageBitmapToTexture(
    source: GPUImageBitmapCopyView,
    destination: GPUTextureCopyView,
    copySize: GPUExtent3DDict
  ): void;
}

interface GPUFence {
  getCompletedValue(): number;
  onCompletion(completionValue: number): Promise<void>;
}

interface GPUCanvasContext {
  configureSwapChain(descriptor: GPUSwapChainDescriptor): GPUSwapChain;
  getSwapChainPreferredFormat(device: GPUDevice): Promise<GPUTextureFormat>;
}

interface GPUSwapChain {
  getCurrentTexture(): GPUTexture;
}

interface GPUDeviceLostInfo {
  message?: string;
}

interface GPUDevice {
  lost?: Promise<GPUDeviceLostInfo>;
}

interface GPUOutOfMemoryError {}

interface GPUValidationError {
  message?: string;
}

interface GPUDevice {
  pushErrorScope(filter: GPUErrorFilter): void;
  popErrorScope(): Promise<GPUValidationError>;
}

interface GPUUncapturedErrorEvent extends Event {
  error?: GPUValidationError;
}

interface GPUDevice {
  onuncapturederror?: any;
}

declare interface GPUDevice extends GPUObjectBase {}
declare interface GPUBuffer extends GPUObjectBase {}
declare interface GPUTexture extends GPUObjectBase {}
declare interface GPUTextureView extends GPUObjectBase {}
declare interface GPUSampler extends GPUObjectBase {}
declare interface GPUBindGroupLayout extends GPUObjectBase {}
declare interface GPUBindGroup extends GPUObjectBase {}
declare interface GPUPipelineLayout extends GPUObjectBase {}
declare interface GPUShaderModule extends GPUObjectBase {}
declare interface GPUComputePipeline extends GPUObjectBase {}
declare interface GPURenderPipeline extends GPUObjectBase {}
declare interface GPUCommandBuffer extends GPUObjectBase {}
declare interface GPUCommandEncoder extends GPUObjectBase {}
declare interface GPUComputePassEncoder extends GPUObjectBase {}
declare interface GPUComputePassEncoder extends GPUProgrammablePassEncoder {}
declare interface GPURenderPassEncoder extends GPUObjectBase {}
declare interface GPURenderPassEncoder extends GPUProgrammablePassEncoder {}
declare interface GPURenderPassEncoder extends GPURenderEncoderBase {}
declare interface GPURenderBundle extends GPUObjectBase {}
declare interface GPURenderBundleEncoder extends GPUObjectBase {}
declare interface GPURenderBundleEncoder extends GPUProgrammablePassEncoder {}
declare interface GPURenderBundleEncoder extends GPURenderEncoderBase {}
declare interface GPUQueue extends GPUObjectBase {}
declare interface GPUFence extends GPUObjectBase {}
declare interface GPUSwapChain extends GPUObjectBase {}
