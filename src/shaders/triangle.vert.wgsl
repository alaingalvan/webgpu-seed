struct VSOut {
    @builtin(position) Position: vec4f,
    @location(0) color: vec3f,
 };

@vertex
fn main(@location(0) inPos: vec3f,
        @location(1) inColor: vec3f) -> VSOut {
    var vsOut: VSOut;
    vsOut.Position = vec4f(inPos, 1);
    vsOut.color = inColor;
    return vsOut;
}
