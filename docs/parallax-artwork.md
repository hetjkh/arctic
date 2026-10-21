# Parallax artwork

Route: `/parallax`

Generated with the built-in image generation tool from `public/paraalz effect.png`. The original is unchanged. Generated transparent alpha is preserved in the WebP assets in `public/parallax/`. The new library plate intentionally omits the sculptures. Regenerated artwork varies from the source; the page includes the original-image comparison.

The subject output was framed larger than requested; its full canvas is rendered at 64% size, positioned 18% from the left and 25% from the top to align with the surrounding characters. The desk paints behind the laptop, but moves at the closest depth. All layers share a slightly overscanned 16:9 canvas to prevent exposed edges during movement.

Depth multipliers: library 0.2, characters 0.5, subject 0.85, desk 1.2. Adjust these in `app/parallax/parallax-experience.tsx`. Input is eased with a time-based animation loop that stops when settled. Pointer leave, touch release/cancel, and blur return to center. Arrow keys move the focused scene; Escape/Home center it. Reduced motion disables all interactive movement.

## Final successful prompts

### library.webp

Use case: stylized-concept. Create a photorealistic empty Renaissance study interior for a website parallax background plate, landscape 16:9. Warm dark wooden bookshelves at both sides filled with old brown leather books, three tall blue diamond leaded windows at the center, rich dark burgundy curtains framing the windows, small brass astronomical instruments on shelves, lower wooden cabinets and warm brown floor. Frontal camera, warm amber light with blue daylight through windows, cinematic realism. The room is completely empty of people. No statues or sculptures, no figures or drawings of people, no foreground desk, no laptop, no text. Full opaque image, edge to edge. Layout intended to sit behind a separate group portrait layer.

### characters.webp

Use case: background-extraction. Edit target: provided group portrait. Asset type: transparent PNG layer for a parallax scene. Keep ONLY the eight fully clothed adult male historical characters around the edges and behind the central woman. Preserve their exact original faces, humorous surprised expressions, Renaissance clothing, original sizes and original screen positions within the full 16:9 canvas. Remove the central woman, her phone, her laptop, the desk and all desk objects, the entire library, windows, curtains and all statues. Everything except the eight fully clothed men must be genuinely transparent alpha, including central opening where woman was and above all heads. Reconstruct small portions of the men's clothing that were occluded by the woman, so they have clean complete silhouettes. The men form a U shaped group around an empty transparent central opening: 3 at left, two rear center, 3 at right. Keep the same wide canvas composition and warm photorealistic lighting. No background color, no checkerboard baked into pixels, no floor, no shadows floating in transparent areas. This output is only the men as one transparent cutout layer, not a new scene.

### subject.webp

Use case: background-extraction. Edit target: supplied portrait. Create one genuinely transparent PNG cutout of ONLY the central adult blonde woman wearing her white hoodie, holding her phone, with her other hand supporting her chin, AND the open dark laptop in front of her. Preserve her face, hair, pose, clothing, phone, laptop and warm photographic light extremely closely. Preserve exact original placement and scale within full landscape 16:9 canvas: hair starts at approximately x44% y31%, whole woman spans x32% to65%, laptop spans x38% to62%, laptop bottom at87% canvas height. Everything else must be transparent alpha. Remove ALL men, ALL background architecture, ALL sculptures, ALL desk and desk props. Keep her complete hair silhouette and sleeves. Do not fill background, do not bake checkerboard. No new objects, no text. This is a registration-aligned foreground subject layer for compositing over separate background and surrounding people.

### desk.webp

Use case: background-extraction. Edit target: supplied image. Asset type: closest foreground transparent layer for parallax compositing. Keep ONLY the wooden desk surface and the objects resting on it: antique leather books in both bottom corners, scattered cream parchment sketches and papers, brass armillary sphere at far left, small brass globe at left, brass inkwell near center left, little brass hourglass at right, stacked old books at right, brass pencil holder at far right. Remove ALL people, phone, laptop, library, architecture, sculptures. Reconstruct the tabletop and papers naturally where laptop and people hid them. Preserve original wide 16:9 framing and original positions of desk objects. Desk surface is confined to bottom 20% of the full canvas, starting at y80%, with only the tall left brass sphere and far right pencil holder protruding upward to y60%. Top 60% of canvas MUST be completely transparent. Desk fills full canvas width at bottom. All space above desk silhouette genuinely transparent alpha. Photorealistic, warm amber lighting. No background, no baked checkerboard, no text, no additional props. Do not zoom into the desk; retain reference camera and object sizes.

