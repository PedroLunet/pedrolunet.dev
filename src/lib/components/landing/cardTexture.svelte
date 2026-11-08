<script lang="ts">
	import { onMount } from 'svelte';

	type Variant = 'work' | 'about' | 'contact' | 'mural';
	type Rgb = [number, number, number];
	type Palette = { stops: Rgb[]; light: Rgb };
	type Cell = { col: number; row: number; x: number; y: number };

	const PALETTES: Record<Variant, Palette> = {
		work: {
			stops: [
				[8, 10, 34],
				[38, 46, 150],
				[104, 88, 242],
				[208, 198, 255]
			],
			light: [235, 230, 255]
		},
		about: {
			stops: [
				[48, 8, 8],
				[170, 34, 30],
				[255, 104, 76],
				[255, 226, 196]
			],
			light: [255, 244, 224]
		},
		contact: {
			stops: [
				[8, 16, 6],
				[62, 102, 24],
				[158, 216, 66],
				[236, 255, 202]
			],
			light: [250, 255, 232]
		},
		mural: {
			stops: [
				[12, 10, 50],
				[92, 30, 122],
				[222, 72, 102],
				[255, 236, 220]
			],
			light: [255, 236, 220]
		}
	};

	const ACCENT_PALETTE: Palette = {
		stops: [
			[40, 10, 4],
			[126, 42, 10],
			[255, 90, 20],
			[255, 204, 154]
		],
		light: [255, 226, 192]
	};

	let {
		variant,
		accent = false,
		active = true
	}: { variant: Variant; accent?: boolean; active?: boolean } = $props();

	let root: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	let api: { setActive: (value: boolean) => void } | undefined;

	$effect(() => {
		const value = active;
		api?.setActive(value);
	});

	onMount(() => {
		if (!root || !canvas) return;

		const ctx = canvas.getContext('2d')!;
		const host = root.closest('a') ?? root.parentElement ?? root;
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		let reduced = motionQuery.matches;
		let activeNow = active;
		let visible = true;
		let pageVisible = !document.hidden;

		let width = 0;
		let height = 0;
		let dpr = 1;
		let padX = 6;
		let padY = 6;
		let cellW = 12;
		let cellH = 12;
		let cols = 0;
		let rows = 0;
		let cells: Cell[] = [];

		let pointer = { x: 0, y: 0 };
		let target = { x: 0, y: 0 };
		let motion = 0;
		let hovered = false;
		let animClock = 0.6;
		let driftClock = 0;

		let frame = 0;
		let last = 0;

		function clamp(min: number, value: number, max: number) {
			return Math.max(min, Math.min(max, value));
		}

		function rgba(color: Rgb, alpha: number) {
			return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
		}

		function mix(a: Rgb, b: Rgb, amount: number): Rgb {
			return [
				Math.round(a[0] + (b[0] - a[0]) * amount),
				Math.round(a[1] + (b[1] - a[1]) * amount),
				Math.round(a[2] + (b[2] - a[2]) * amount)
			];
		}

		function gradientColor(stops: Rgb[], t: number): Rgb {
			const clamped = clamp(0, t, 1);
			const scaled = clamped * (stops.length - 1);
			const index = Math.min(stops.length - 2, Math.floor(scaled));
			return mix(stops[index], stops[index + 1], scaled - index);
		}

		function layout() {
			const rect = root.getBoundingClientRect();
			if (rect.width < 1 || rect.height < 1) return false;

			width = rect.width;
			height = rect.height;
			dpr = Math.min(2, window.devicePixelRatio || 1);

			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			padX = Math.max(4, width * 0.03);
			padY = Math.max(4, height * 0.035);

			const innerWidth = width - padX * 2;
			const innerHeight = height - padY * 2;

			if (variant === 'work') {
				cols = 18;
				rows = 14;
			} else if (variant === 'about') {
				cols = 15;
				rows = 16;
			} else if (variant === 'contact') {
				cols = 18;
				rows = 15;
			} else {
				cols = 18;
				rows = 14;
			}

			cells = [];
			if (cols && rows) {
				cellW = innerWidth / cols;
				cellH = innerHeight / rows;

				for (let row = 0; row < rows; row++) {
					for (let col = 0; col < cols; col++) {
						cells.push({
							col,
							row,
							x: padX + (col + 0.5) * cellW,
							y: padY + (row + 0.5) * cellH
						});
					}
				}
			}

			return true;
		}

		function drawGrid(stops: Rgb[]) {
			ctx.strokeStyle = rgba(gradientColor(stops, 0.5), 0.05);
			ctx.lineWidth = 1;
			ctx.beginPath();

			for (let col = 0; col <= cols; col++) {
				const x = padX + col * cellW;
				ctx.moveTo(x, padY);
				ctx.lineTo(x, height - padY);
			}

			for (let row = 0; row <= rows; row++) {
				const y = padY + row * cellH;
				ctx.moveTo(padX, y);
				ctx.lineTo(width - padX, y);
			}

			ctx.stroke();
		}

		function draw() {
			if (!width || !height) return;

			if (reduced) {
				pointer.x = width / 2;
				pointer.y = height / 2;
			}

			ctx.clearRect(0, 0, width, height);

			const palette = accent ? ACCENT_PALETTE : PALETTES[variant];
			const stops = palette.stops;
			const light = palette.light;
			const sigma = Math.min(width, height) * 0.3;
			const sigma2 = 2 * sigma * sigma;
			const motionValue = reduced ? 0.62 : motion;
			const clock = animClock;

			const lensAt = (x: number, y: number) => {
				const dx = pointer.x - x;
				const dy = pointer.y - y;
				return Math.exp(-(dx * dx + dy * dy) / sigma2) * motionValue;
			};

			if (variant === 'work') {
				// Horizontal lines of identical pills, brightness wave travelling across.
				drawGrid(stops);

				const w = cellW * 0.44;
				const h = cellH * 0.6;

				for (const cell of cells) {
					const wave = 0.5 + 0.5 * Math.sin(cell.x * 0.055 + cell.y * 0.02 - clock * 2.2);
					const lens = lensAt(cell.x, cell.y);
					const t = clamp(0, 0.16 + wave * 0.22 + lens * 0.6, 1);
					const color = mix(gradientColor(stops, t), light, lens * 0.85);
					const alpha = clamp(0, 0.4 + wave * 0.3 + lens * 0.3, 1);

					ctx.fillStyle = rgba(color, alpha);
					ctx.fillRect(cell.x - w / 2, cell.y - h / 2, w, h);
				}
			} else if (variant === 'about') {
				// Rows of horizontal dashes swept by a rotating spiral.
				drawGrid(stops);

				const cx = width / 2;
				const cy = height * 0.45;
				const w = cellW * 0.72;
				const h = Math.min(3, cellH * 0.35);

				for (const cell of cells) {
					const dx = cell.x - cx;
					const dy = cell.y - cy;
					const angle = Math.atan2(dy, dx);
					const radius = Math.hypot(dx, dy);
					const arm = 0.5 + 0.5 * Math.sin(angle * 2 + radius * 0.06 - clock * 0.9);
					const v = arm * arm;
					const lens = lensAt(cell.x, cell.y);
					const t = clamp(0, v * 0.85 + lens * 0.5, 1);
					const color = mix(gradientColor(stops, t), light, lens * 0.85);
					const alpha = clamp(0, 0.3 + v * 0.6 + lens * 0.3, 1);

					ctx.fillStyle = rgba(color, alpha);
					ctx.fillRect(cell.x - w / 2, cell.y - h / 2, w, h);
				}
			} else if (variant === 'contact') {
				// Sound wave: vertical bars with wandering centre and length, bright tips.
				drawGrid(stops);

				const innerHeight = height - padY * 2;
				const w = cellW * 0.5;

				for (let col = 0; col < cols; col++) {
					const x = padX + (col + 0.5) * cellW;
					const centre = padY + innerHeight * (0.5 + 0.14 * Math.sin(col * 0.45 + clock * 1.2));
					const half =
						innerHeight *
						clamp(
							0.1,
							0.3 +
								0.18 * Math.sin(col * 0.7 - clock * 1.9) +
								0.12 * Math.sin(col * 1.7 + clock * 2.7) +
								0.07 * Math.sin(col * 3.1 - clock * 1.3),
							0.5
						);
					const top = centre - half;
					const bottom = centre + half;

					for (let row = 0; row < rows; row++) {
						const y = padY + (row + 0.5) * cellH;
						if (y < top || y > bottom) continue;

						const tip = 1 - Math.min(y - top, bottom - y) / Math.max(1, half);
						const lens = lensAt(x, y);
						const t = clamp(0, 0.3 + tip * 0.45 + lens * 0.55, 1);
						const color = mix(
							gradientColor(stops, t),
							light,
							Math.max(lens * 0.85, tip > 0.75 ? 0.4 : 0)
						);
						const alpha = clamp(0, 0.5 + tip * 0.4 + lens * 0.3, 1);

						ctx.fillStyle = rgba(color, alpha);
						ctx.fillRect(x - w / 2, y - cellH * 0.31, w, cellH * 0.62);
					}
				}
			} else {
				// Mural: vertical rectangles coloured by soft radial waves.
				const w = cellW * 0.7;
				const h = cellH * 0.8;
				const cx =
					width *
					(0.5 + 0.3 * Math.sin(driftClock * 0.52 + 4.9) + 0.06 * Math.sin(driftClock * 1.6 + 1.1));
				const cy =
					height *
					(0.34 +
						0.16 * Math.sin(driftClock * 0.4 + 4.9 * 1.4 + 1.2) +
						0.04 * Math.sin(driftClock * 1.2));

				for (const cell of cells) {
					const distance = Math.hypot(cell.x - cx, cell.y - cy);
					const wave = 0.5 + 0.5 * Math.sin(distance * 0.126 - clock * 1.8);
					const lens = lensAt(cell.x, cell.y);
					const t = clamp(0, 0.18 + wave * 0.22 + lens * 0.5, 1);
					const color = mix(gradientColor(stops, t), light, lens * 0.8);
					const alpha = clamp(0, 0.42 + wave * 0.12 + lens * 0.28, 1);

					ctx.fillStyle = rgba(color, alpha);
					ctx.fillRect(cell.x - w / 2, cell.y - h / 2, w, h);
				}
			}
		}

		function wake() {
			if (!activeNow || !visible || !pageVisible || reduced) return;
			if (!frame) {
				last = 0;
				frame = requestAnimationFrame(tick);
			}
		}

		function tick(now: number) {
			frame = 0;
			if (!activeNow || !visible || !pageVisible || reduced) return;

			if (last && now - last < 1000 / 60) {
				frame = requestAnimationFrame(tick);
				return;
			}

			const dt = Math.min(last ? (now - last) / 1000 : 1 / 60, 1 / 20);
			last = now;

			const phase =
				variant === 'work' ? 0 : variant === 'about' ? 1.7 : variant === 'contact' ? 3.3 : 4.9;

			driftClock += dt * 0.55;

			if (!hovered) {
				target.x =
					width *
					(0.5 +
						0.3 * Math.sin(driftClock * 0.52 + phase) +
						0.06 * Math.sin(driftClock * 1.6 + 1.1));
				target.y =
					height *
					(0.34 +
						0.16 * Math.sin(driftClock * 0.4 + phase * 1.4 + 1.2) +
						0.04 * Math.sin(driftClock * 1.2));
			}

			animClock += dt;

			const pointerK = 1 - Math.exp(-dt * (hovered ? 10 : 6));
			pointer.x += (target.x - pointer.x) * pointerK;
			pointer.y += (target.y - pointer.y) * pointerK;

			motion += (0.62 - motion) * (1 - Math.exp(-dt * 6));

			draw();
			frame = requestAnimationFrame(tick);
		}

		function showAt(x: number, y: number) {
			if (reduced) return;

			const rect = canvas.getBoundingClientRect();
			target.x = x - rect.left;
			target.y = Math.min(height * 0.62, Math.max(0, y - rect.top));
			hovered = true;
			wake();
		}

		function handlePointerEnter(event: PointerEvent) {
			if (event.pointerType === 'touch') return;
			showAt(event.clientX, event.clientY);
		}

		function handlePointerMove(event: PointerEvent) {
			if (event.pointerType === 'touch') return;
			showAt(event.clientX, event.clientY);
		}

		function handleLeave(event?: Event) {
			if (event instanceof PointerEvent && event.pointerType === 'touch') return;
			hovered = false;
			wake();
		}

		function handleFocus() {
			if (reduced) return;
			target.x = width / 2;
			target.y = height / 2;
			hovered = true;
			wake();
		}

		function resize() {
			if (!layout()) return;
			pointer = { x: width / 2, y: height / 2 };
			target = { x: width / 2, y: height / 2 };

			if (reduced) {
				motion = 0.62;
				draw();
				return;
			}

			draw();
			wake();
		}

		function setActive(value: boolean) {
			activeNow = value;

			if (!value) {
				cancelAnimationFrame(frame);
				frame = 0;
				hovered = false;
				motion = 0;
				draw();
				return;
			}

			pointer = { x: width / 2, y: height / 2 };
			target = { x: width / 2, y: height / 2 };
			hovered = false;
			motion = reduced ? 0.62 : 0;
			draw();

			if (!reduced) wake();
		}

		function handleMotionChange(event: MediaQueryListEvent) {
			reduced = event.matches;

			if (reduced) {
				cancelAnimationFrame(frame);
				frame = 0;
				hovered = false;
				motion = 0.62;
				draw();
			} else {
				wake();
			}
		}

		function handleVisibility() {
			pageVisible = !document.hidden;

			if (!pageVisible) {
				cancelAnimationFrame(frame);
				frame = 0;
				return;
			}

			wake();
		}

		const resizeObserver = new ResizeObserver(resize);
		const intersectionObserver = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;

				if (visible) {
					wake();
				} else {
					cancelAnimationFrame(frame);
					frame = 0;
				}
			},
			{ threshold: 0.01 }
		);

		host.addEventListener('pointerenter', handlePointerEnter);
		host.addEventListener('pointermove', handlePointerMove, { passive: true });
		host.addEventListener('pointerleave', handleLeave);
		host.addEventListener('pointercancel', handleLeave);
		host.addEventListener('focusin', handleFocus);
		host.addEventListener('focusout', handleLeave);
		document.addEventListener('visibilitychange', handleVisibility);
		motionQuery.addEventListener('change', handleMotionChange);

		resizeObserver.observe(root);
		intersectionObserver.observe(root);

		resize();
		setActive(activeNow);

		api = { setActive };

		return () => {
			cancelAnimationFrame(frame);
			host.removeEventListener('pointerenter', handlePointerEnter);
			host.removeEventListener('pointermove', handlePointerMove);
			host.removeEventListener('pointerleave', handleLeave);
			host.removeEventListener('pointercancel', handleLeave);
			host.removeEventListener('focusin', handleFocus);
			host.removeEventListener('focusout', handleLeave);
			document.removeEventListener('visibilitychange', handleVisibility);
			motionQuery.removeEventListener('change', handleMotionChange);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
		};
	});
</script>

<div bind:this={root} class="texture-field pointer-events-none absolute inset-0" aria-hidden="true">
	<canvas bind:this={canvas} class="h-full w-full"></canvas>
</div>

<style>
	.texture-field {
		-webkit-mask-image: linear-gradient(
			to bottom,
			black 0%,
			black 38%,
			rgb(0 0 0 / 0.6) 54%,
			transparent 69%
		);
		mask-image: linear-gradient(
			to bottom,
			black 0%,
			black 38%,
			rgb(0 0 0 / 0.6) 54%,
			transparent 69%
		);
	}
</style>
