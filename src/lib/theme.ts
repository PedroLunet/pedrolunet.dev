//ALWAYS UPDATE COLORS IN app.css TOO

export const lightTheme = {
	'--background': 'rgba(252, 240, 244, 1)',
	'--foreground': 'oklch(0.25 0.04 27)',
	'--card': 'oklch(0.99 0.003 27)',
	'--card-foreground': 'oklch(0.25 0.04 27)',
	'--popover': 'oklch(0.99 0.003 27)',
	'--popover-foreground': 'oklch(0.25 0.04 27)',
	'--primary': 'rgba(137, 97, 89, 1)',
	'--primary-foreground': 'oklch(0.98 0.01 350)',
	'--secondary': 'oklch(0.92 0.02 27)',
	'--secondary-foreground': 'oklch(0.25 0.04 27)',
	'--muted': 'oklch(0.92 0.02 27)',
	'--muted-foreground': 'oklch(0.50 0.04 27)',
	'--accent': 'oklch(0.90 0.03 27)',
	'--accent-foreground': 'oklch(0.25 0.04 27)',
	'--border': 'oklch(0.88 0.03 27)',
	'--input': 'oklch(0.88 0.03 27)'
} as const;

export const darkTheme = {
	'--background': 'rgba(137, 97, 89, 1)',
	'--foreground': 'oklch(0.99 0 0)',  /* Updated to crisp white */
	'--card': 'oklch(0.35 0.04 27)',
	'--card-foreground': 'oklch(0.99 0 0)', /* Updated to crisp white */
	'--popover': 'oklch(0.35 0.04 27)',
	'--popover-foreground': 'oklch(0.99 0 0)', /* Updated to crisp white */
	'--primary': 'rgba(252, 240, 244, 1)',
	'--primary-foreground': 'oklch(0.25 0.04 27)', /* Kept dark text for light button */
	'--secondary': 'oklch(0.45 0.05 27)',
	'--secondary-foreground': 'oklch(0.99 0 0)', /* Updated to crisp white */
	'--muted': 'oklch(0.45 0.05 27)',
	'--muted-foreground': 'oklch(0.85 0 0)', /* Slightly dimmer grey-white */
	'--accent': 'oklch(0.45 0.05 27)',
	'--accent-foreground': 'oklch(0.99 0 0)', /* Updated to crisp white */
	'--border': 'oklch(0.99 0 0 / 0.2)',
	'--input': 'oklch(0.99 0 0 / 0.2)'
} as const;