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
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
		color: '#06b6d4'
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
	}
	// Add more projects here...
	// You can add examples like:
	// - University projects
	// - Side projects
	// - Open source contributions
	// - Hackathon projects
	// etc.
];

export const getFeaturedProjects = () => projectsData.filter((project) => project.featured);
export const getCompletedProjects = () =>
	projectsData.filter((project) => project.status === 'completed');
export const getInProgressProjects = () =>
	projectsData.filter((project) => project.status === 'in-progress');
export const getAllProjects = () => projectsData;

// Helper function to sort projects by date (most recent first)
export const sortProjectsByDate = (projects: Project[]) => {
	return projects.sort((a, b) => {
		const aDate = a.endDate ? new Date(a.endDate) : new Date(a.startDate);
		const bDate = b.endDate ? new Date(b.endDate) : new Date(b.startDate);
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
