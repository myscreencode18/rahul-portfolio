varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;
uniform vec3  uAccent;
uniform float uIntensity;

void main() {
  // Fresnel rim glow
  vec3 viewDir  = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);

  // Mouse proximity glow
  vec2 mouseNorm = uMouse / uResolution;
  float mDist    = length(vUv - mouseNorm);
  float mGlow    = smoothstep(0.5, 0.0, mDist) * 0.4;

  // Pulse
  float pulse = 0.5 + 0.5 * sin(uTime * 1.2);

  // Grid wireframe feel
  vec2  grid = fract(vUv * 8.0);
  float wire = step(0.96, max(grid.x, grid.y)) * 0.15;

  vec3  col   = uAccent * (fresnel * 0.6 + mGlow + wire + pulse * 0.05);
  float alpha = fresnel * 0.7 + mGlow * 0.5 + wire;

  gl_FragColor = vec4(col, clamp(alpha * uIntensity, 0.0, 0.85));
}
