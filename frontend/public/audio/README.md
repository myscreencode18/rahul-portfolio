# Audio Assets

Place the following audio files in this directory:

| File                  | Description                            | Recommended Duration |
|-----------------------|----------------------------------------|----------------------|
| ambient-hum.mp3       | Low-frequency ambient drone/hum        | 30–60s loop          |
| hover-click.mp3       | Short UI click sound                   | 0.1–0.2s             |
| select.mp3            | Slightly longer selection confirm      | 0.2–0.3s             |
| boot-sequence.mp3     | System boot atmospheric sound          | 3–5s                 |

## Sources (royalty-free)
- https://freesound.org (search "ambient drone", "UI click")
- https://pixabay.com/sound-effects/
- https://zapsplat.com

## Format
- Use MP3 for broad browser support
- Keep file sizes small: ambient < 500KB, UI sounds < 50KB
- Normalize to -14 LUFS for consistent volume

All audio is muted by default — users must opt in via the sound toggle.
