[[stage(fragment)]]
fn main(inColor: vec3<f32>) -> [[location(0)]] vec4<f32> {
    return vec4<f32>(inColor, 1.0);
}
