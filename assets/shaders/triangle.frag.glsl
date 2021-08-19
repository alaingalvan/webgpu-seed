#version 450

// Varying
layout (location = 0) in vec3 inColor;

// Return Output
layout (location = 0) out vec4 outFragColor;

void main()
{
  outFragColor = vec4(inColor, 1.0);
}