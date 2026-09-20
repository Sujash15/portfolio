# DarkVeil Component (React Bits)

An open-source, atmospheric WebGL shader component powered by `ogl` that creates an undulating, cinematic veil with customizable noise, scanlines, warp distortion, and hue shifting.

---

## 📦 Installation & Dependencies

```bash
npm install ogl
```

---

## 🚀 Usage in React

```jsx
import DarkVeil from './components/DarkVeil/DarkVeil';
// or: import DarkVeil from './components/DarkVeil';

function App() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <DarkVeil 
        hueShift={30}
        noiseIntensity={0.015}
        scanlineIntensity={0.04}
        speed={0.3}
        warpAmount={0.04}
        resolutionScale={0.75}
      />
    </div>
  );
}

export default App;
```

---

## 🎛️ Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hueShift` | `number` | `0` | Shifts the hue of the entire animation (in degrees). |
| `noiseIntensity` | `number` | `0` | Intensity of the noise / 35mm grain effect. |
| `scanlineIntensity` | `number` | `0` | Intensity of the analog scanline effect. |
| `speed` | `number` | `0.5` | Speed multiplier of the animation. |
| `scanlineFrequency`| `number` | `0` | Frequency / spacing of scanlines. |
| `warpAmount` | `number` | `0` | Amount of fluid warp distortion applied to the veil. |
| `resolutionScale` | `number` | `1` | Scaling factor for the WebGL render buffer. |
| `lightMode` | `boolean` | `false` | Inverts/adapts shader for light backgrounds. |

---

## 🌐 Vanilla JS Integration (Live Portfolio)

The component is also pre-bundled for static HTML/JS sites in `assets/js/darkveil.bundle.js`.

To use in plain HTML:
```html
<!-- Container with relative positioning -->
<div class="darkveil-hero-wrap">
  <canvas id="darkveil-hero-canvas" class="darkveil-canvas"></canvas>
</div>

<!-- Load bundle -->
<script src="assets/js/darkveil.bundle.js"></script>
```

It automatically initializes on `#darkveil-hero-canvas` or can be programmatically initialized:
```javascript
window.initDarkVeil(document.getElementById('myCanvas'), {
  hueShift: 30,
  noiseIntensity: 0.015,
  speed: 0.35
});
```
