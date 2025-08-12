export interface Project {
	id: string;
	name: string;
	description: string;
	technologies: Technology[];
	links: {
		github?: string;
		website?: string;
		demo?: string;
	};
	featured?: boolean;
	status: 'completed' | 'in-progress' | 'archived';
	startDate: string;
	endDate?: string;
}

export interface Technology {
	name: string;
	icon: string; // This can be a URL to an icon or an emoji/symbol
	color: string; // Hex color for the technology
}

// Common technologies for consistency
// Using Devicons CDN for actual tech logos
export const TECHNOLOGIES = {
	// Frontend
	SVELTE: {
		name: 'Svelte',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
		color: '#ff3e00'
	},
	SVELTEKIT: {
		name: 'SvelteKit',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
		color: '#ff3e00'
	},
	REACT: {
		name: 'React',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
		color: '#61dafb'
	},
	NEXTJS: {
		name: 'Next.js',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
		color: '#000000'
	},
	VUE: {
		name: 'Vue.js',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
		color: '#4fc08d'
	},
	TYPESCRIPT: {
		name: 'TypeScript',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
		color: '#3178c6'
	},
	JAVASCRIPT: {
		name: 'JavaScript',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
		color: '#f7df1e'
	},
	HTML: {
		name: 'HTML',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
		color: '#e34f26'
	},
	CSS: {
		name: 'CSS',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
		color: '#1572b6'
	},
	TAILWIND: {
		name: 'Tailwind CSS',
		icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
		color: '#06b6d4'
	},
	WEBGL: {
		name: 'WebGL',
		icon: 'https://upload.wikimedia.org/wikipedia/commons/2/25/WebGL_Logo.svg',
		color: '#990000'
	},

	// Backend
	NODEJS: {
		name: 'Node.js',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
		color: '#339933'
	},
	PYTHON: {
		name: 'Python',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
		color: '#3776ab'
	},
	JAVA: {
		name: 'Java',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
		color: '#ed8b00'
	},
	CSHARP: {
		name: 'C#',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
		color: '#239120'
	},
	C: {
		name: 'C',
		icon: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg',
		color: '#283593'
	},
	CPP: {
		name: 'C++',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
		color: '#00599c'
	},

	PHP: {
		name: 'PHP',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
		color: '#777bb4'
	},

	// Databases
	MYSQL: {
		name: 'MySQL',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
		color: '#4479a1'
	},
	POSTGRESQL: {
		name: 'PostgreSQL',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
		color: '#336791'
	},
	MONGODB: {
		name: 'MongoDB',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
		color: '#47a248'
	},
	SQLITE: {
		name: 'SQLite',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
		color: '#003b57'
	},

	// Tools & Platforms
	DOCKER: {
		name: 'Docker',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
		color: '#2496ed'
	},
	GIT: {
		name: 'Git',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
		color: '#f05032'
	},
	GITHUB: {
		name: 'GitHub',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
		color: '#181717'
	},
	VERCEL: {
		name: 'Vercel',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
		color: '#000000'
	},
	NETLIFY: {
		name: 'Netlify',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
		color: '#00c7b7'
	},

	// Mobile
	FLUTTER: {
		name: 'Flutter',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
		color: '#02569b'
	},
	KOTLIN: {
		name: 'Kotlin',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
		color: '#7f52ff'
	},

	// Design
	FIGMA: {
		name: 'Figma',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
		color: '#f24e1e'
	},

	// Additional popular technologies
	ANGULAR: {
		name: 'Angular',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
		color: '#dd0031'
	},
	VITE: {
		name: 'Vite',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
		color: '#646cff'
	},
	WEBPACK: {
		name: 'Webpack',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
		color: '#8dd6f9'
	},
	SASS: {
		name: 'Sass',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
		color: '#cc6699'
	},
	BOOTSTRAP: {
		name: 'Bootstrap',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
		color: '#7952b3'
	},
	EXPRESS: {
		name: 'Express.js',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
		color: '#000000'
	},
	NESTJS: {
		name: 'NestJS',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
		color: '#e0234e'
	},
	REDIS: {
		name: 'Redis',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
		color: '#dc382d'
	},
	FIREBASE: {
		name: 'Firebase',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
		color: '#ffca28'
	},
	AWS: {
		name: 'AWS',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
		color: '#ff9900'
	},
	AZURE: {
		name: 'Azure',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
		color: '#0078d4'
	},
	GOOGLECLOUD: {
		name: 'Google Cloud',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
		color: '#4285f4'
	}
} as const;

export const projectsData: Project[] = [
	{
		id: 'pedrolunet-dev',
		name: 'PedroLunet.dev',
		description:
			'My personal portfolio website built with SvelteKit and Tailwind CSS. Features a modern design with dark/light theme support and responsive layout.',
		technologies: [TECHNOLOGIES.SVELTEKIT, TECHNOLOGIES.TYPESCRIPT, TECHNOLOGIES.TAILWIND],
		links: {
			github: 'https://github.com/PedroLunet/pedrolunet.dev',
			website: 'https://pedrolunet.dev'
		},
		featured: true,
		status: 'in-progress',
		startDate: '08/2025'
	},
	{
		id: 'dodia-pt',
		name: 'Dodia.pt',
		description:
			'A responsive web application built during my curricular internship at Significa. Developed with Next.js, Tailwind CSS, and Drizzle ORM.',
		technologies: [
			TECHNOLOGIES.NEXTJS,
			TECHNOLOGIES.TYPESCRIPT,
			TECHNOLOGIES.TAILWIND,
			TECHNOLOGIES.POSTGRESQL
		],
		links: {
			website: 'https://dodia.pt'
		},
		featured: true,
		status: 'completed',
		startDate: '02/2025',
		endDate: '06/2025'
	},
	{
		id: 'hyrio',
		name: 'Hyrio',
		description:
			'A comprehensive freelancing website developed in PHP for the LTW (Web Languages and Technologies) course at FEUP.',
		technologies: [
			TECHNOLOGIES.PHP,
			TECHNOLOGIES.JAVASCRIPT,
			TECHNOLOGIES.HTML,
			TECHNOLOGIES.SQLITE,
			TECHNOLOGIES.CSS
		],
		links: {
			website: 'https://hyrio.onrender.com/',
			github: 'https://github.com/PedroLunet/hyrio'
		},
		featured: false,
		status: 'completed',
		startDate: '02/2025',
		endDate: '06/2025'
	},
	{
		id: 'bytekart',
		name: 'ByteKart',
		description:
			'A racing game developed in C for the LCOM (Computer Laboratory) course at FEUP, built on the MINIX operating system.',
		technologies: [TECHNOLOGIES.C],
		links: {
			github: 'https://github.com/PedroLunet/bytekart',
			demo: 'https://uporto.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=06810408-5b1c-434a-b0f9-b2ef01760a52'
		},
		featured: false,
		status: 'completed',
		startDate: '02/2025',
		endDate: '06/2025'
	},
	{
		id: 'pallet-packing-optimization',
		name: 'Pallet Packing Optimization',
		description:
			'A sophisticated pallet packing optimization tool developed in C++ for the Design of Algorithms (DA) course at FEUP. ',
		technologies: [TECHNOLOGIES.CPP],
		links: {
			github: 'https://github.com/PedroLunet/Y2S2-DA-Pallet-Optimizer'
		},
		featured: false,
		status: 'completed',
		startDate: '02/2025',
		endDate: '06/2025'
	},
	{
		id: 'path-planning-tool',
		name: 'Path Planning Tool',
		description:
			'A sophisticated pallet packing optimization tool developed in C++ for the Design of Algorithms (DA) course at FEUP. ',
		technologies: [TECHNOLOGIES.CPP],
		links: {
			github: 'https://github.com/PedroLunet/Y2S2-DA-Path-Planning-Tool'
		},
		featured: false,
		status: 'completed',
		startDate: '02/2025',
		endDate: '06/2025'
	},
	{
		id: 'atari-arilock',
		name: 'Atari Arilock',
		description:
			'This game will take you back to 1982 playing on your Atari 2600 console, helping your hero escape a crashed nuclear submarine which has begun taking on water.',
		technologies: [TECHNOLOGIES.JAVA],
		links: {
			github: 'https://github.com/PedroLunet/Y2S2-DA-AtariArilock'
		},
		featured: false,
		status: 'completed',
		startDate: '09/2023',
		endDate: '12/2023'
	},
	{
		id: 'WEBGL-3D-Game',
		name: 'WebGL 3D Game',
		description:
			'This game will take you back to 1982 playing on your Atari 2600 console, helping your hero escape a crashed nuclear submarine which has begun taking on water.',
		technologies: [TECHNOLOGIES.WEBGL, TECHNOLOGIES.JAVASCRIPT],
		links: {
			github: 'https://github.com/PedroLunet/CG-vercel-deploy',
			website: 'https://cg-host.vercel.app/'
		},
		featured: false,
		status: 'completed',
		startDate: '02/2025',
		endDate: '06/2025'
	},
	{
		id: 'twice-as-nice',
		name: 'Twice as Nice',
		description:
			'Twice as Nice is a second-hand shopping website that dynamically generates PHP pages and uses an SQLite database, structured around two main SQL files. This project was developed for the Web Languages and Technologies course during the 2nd year of the L.EIC program.',
		technologies: [
			TECHNOLOGIES.PHP,
			TECHNOLOGIES.JAVASCRIPT,
			TECHNOLOGIES.HTML,
			TECHNOLOGIES.SQLITE,
			TECHNOLOGIES.CSS
		],
		links: {
			github: 'https://github.com/PedroLunet/twice-as-nice'
		},
		featured: false,
		status: 'completed',
		startDate: '02/2024',
		endDate: '06/2024'
	},
	{
		id: 'fp-python',
		name: 'FP Python Scripts',
		description:
			'Python scripts I made during Programming Fundamentals class i took in the first semester of L.EIC at FEUP.',
		technologies: [TECHNOLOGIES.PYTHON],
		links: {
			github: 'https://github.com/PedroLunet/FP'
		},
		featured: false,
		status: 'completed',
		startDate: '09/2023',
		endDate: '12/2023'
	},
	{
		id: 'marine-choice',
		name: 'Marine Choice',
		description:
			'MarineChoice empowers seafood consumers by offering insights into harmful fishing practices, sustainable recipes, and fostering an eco-conscious community, all aimed at shaping a future where every seafood choice supports healthy oceans.',
		technologies: [TECHNOLOGIES.FLUTTER, TECHNOLOGIES.FIREBASE],
		links: {
			github: 'https://github.com/PedroLunet/MarineChoice'
		},
		featured: false,
		status: 'completed',
		startDate: '02/2024',
		endDate: '06/2024'
	},
	{
		id: 'serial-port-protocol',
		name: 'Serial Port Protocol',
		description:
			'This project focuses on implementing a serial port communication protocol for data exchange between devices.',
		technologies: [TECHNOLOGIES.C],
		links: {
			github: 'https://github.com/PedroLunet/RCOM'
		},
		featured: false,
		status: 'completed',
		startDate: '09/2024',
		endDate: '01/2025'
	},
	{
		id: 'C-Exercises',
		name: 'C Exercises',
		description:
			'C scripts I made during Programming class I took in the first semester of L.EEC at FEUP.',
		technologies: [TECHNOLOGIES.C],
		links: {
			github: 'https://github.com/PedroLunet/C-Exercises'
		},
		featured: false,
		status: 'completed',
		startDate: '09/2022',
		endDate: '12/2022'
	},
	{
		id: 'Cpp-Exercises',
		name: 'C++ Exercises',
		description:
			'C++ scripts I made during Data Structures class I took in the second semester of L.EEC at FEUP.',
		technologies: [TECHNOLOGIES.CPP],
		links: {
			github: 'https://github.com/PedroLunet/Cpp-Exercises'
		},
		featured: false,
		status: 'completed',
		startDate: '02/2023',
		endDate: '06/2023'
	}
];

export const getFeaturedProjects = () => projectsData.filter((project) => project.featured);
export const getCompletedProjects = () =>
	projectsData.filter((project) => project.status === 'completed');
export const getInProgressProjects = () =>
	projectsData.filter((project) => project.status === 'in-progress');
export const getAllProjects = () => projectsData;

// Helper function to parse MM/YYYY date format
const parseProjectDate = (dateString: string): Date => {
	const [month, year] = dateString.split('/');
	// Create date object with year, month (0-indexed), and day 1
	return new Date(parseInt(year), parseInt(month) - 1, 1);
};

// Helper function to sort projects by date (most recent first)
export const sortProjectsByDate = (projects: Project[]) => {
	return projects.sort((a, b) => {
		const aDate = a.endDate ? parseProjectDate(a.endDate) : parseProjectDate(a.startDate);
		const bDate = b.endDate ? parseProjectDate(b.endDate) : parseProjectDate(b.startDate);
		return bDate.getTime() - aDate.getTime();
	});
};

// Helper function to get formatted date range
export const getFormattedProjectDateRange = (project: Project) => {
	if (!project.endDate) {
		return `${project.startDate} - Present`;
	}
	return `${project.startDate} - ${project.endDate}`;
};

// Helper function to get all unique technologies used across projects
export const getAllUsedTechnologies = (): Technology[] => {
	const techMap = new Map<string, Technology>();

	projectsData.forEach((project) => {
		project.technologies.forEach((tech) => {
			techMap.set(tech.name, tech);
		});
	});

	return Array.from(techMap.values());
};
