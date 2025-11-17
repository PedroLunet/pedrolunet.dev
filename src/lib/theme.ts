//ALWAYS UPDATE COLRS IN app.css TOO

export const lightTheme = {
	'--background': 'rgba(252, 240, 244, 1)',
	'--foreground': 'oklch(0.141 0.005 285.823)',
	'--card': 'oklch(1 0 0)',
	'--card-foreground': 'oklch(0.141 0.005 285.823)',
	'--popover': 'oklch(1 0 0)',
	'--popover-foreground': 'oklch(0.141 0.005 285.823)',
	'--primary': 'rgba(137, 97, 89, 1)',
	'--primary-foreground': 'oklch(0.98 0.016 73.684)',
	'--secondary': 'oklch(0.967 0.001 286.375)',
	'--secondary-foreground': 'oklch(0.21 0.006 285.885)',
	'--muted': 'oklch(0.967 0.001 286.375)',
	'--muted-foreground': 'oklch(0.552 0.016 285.938)',
	'--accent': 'oklch(0.967 0.001 286.375)',
	'--accent-foreground': 'oklch(0.21 0.006 285.885)',
	'--border': 'oklch(0.92 0.004 286.32)',
	'--input': 'oklch(0.92 0.004 286.32)'
} as const;

export const darkTheme = {
	'--background': 'rgba(137, 97, 89, 1)',
	'--foreground': 'oklch(0.985 0 0)',
	'--card': 'oklch(0.21 0.006 285.885)',
	'--card-foreground': 'oklch(0.985 0 0)',
	'--popover': 'oklch(0.21 0.006 285.885)',
	'--popover-foreground': 'oklch(0.985 0 0)',
	'--primary': 'rgba(252, 240, 244, 1)',
	'--primary-foreground': 'oklch(0.98 0.016 73.684)',
	'--secondary': 'oklch(0.274 0.006 286.033)',
	'--secondary-foreground': 'oklch(0.985 0 0)',
	'--muted': 'oklch(0.274 0.006 286.033)',
	'--muted-foreground': 'oklch(0.705 0.015 286.067)',
	'--accent': 'oklch(0.274 0.006 286.033)',
	'--accent-foreground': 'oklch(0.985 0 0)',
	'--border': 'oklch(1 0 0 / 10%)',
	'--input': 'oklch(1 0 0 / 15%)'
} as const;
