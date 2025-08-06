export interface TimelineItem {
	id: string;
	type: 'experience' | 'education';
	title: string;
	organization: string;
	description: string;
	startDate: string;
	endDate: string;
	current?: boolean;
	link?: {
		url: string;
		text: string;
	};
}

export const timelineData: TimelineItem[] = [
	{
		id: 'summer-internship-2025',
		type: 'experience',
		title: 'Summer Internship – Frontend Developer',
		organization: 'Significa',
		description:
			'Working on internal projects using Svelte and SvelteKit, deepening knowledge of Reactive UI Development and modern frontend architecture. Focused on maintainable code, routing, and component-driven design.',
		startDate: '07/2025',
		endDate: '08/2025'
	},
	{
		id: 'f1-schools-judge-2025',
		type: 'experience',
		title: 'Engineering Judge – F1 In Schools 2025',
		organization: 'F1 In Schools Regional Final',
		description:
			'Integrated the engineering judging panel for the F1 In Schools Regional Final, evaluating technical designs and engineering solutions.',
		startDate: '03/2025',
		endDate: '03/2025'
	},
	{
		id: 'curricular-internship-2025',
		type: 'experience',
		title: 'Curricular Internship – Full Stack Developer',
		organization: 'Significa',
		description:
			'Developed a responsive and performant web application using Next.js, Tailwind CSS, and Drizzle ORM for Dodia.pt.',
		startDate: '02/2025',
		endDate: '06/2025',
		link: {
			url: 'https://dodia.pt',
			text: 'Dodia.pt'
		}
	},
	{
		id: 'informatics-engineering-feup',
		type: 'education',
		title: 'Informatics and Computing Engineering',
		organization: 'Faculty of Engineering, University of Porto (FEUP)',
		description:
			"Currently enrolled in the 3rd and final year of the Bachelor's degree. Focused on frontend development, web technologies, and modern software engineering practices.",
		startDate: '09/2023',
		endDate: 'Present',
		current: true
	},
	{
		id: 'electrical-engineering-feup',
		type: 'education',
		title: 'Electrical and Computer Engineering',
		organization: 'Faculty of Engineering, University of Porto (FEUP)',
		description:
			"Completed the first year of the Bachelor's degree before transferring to Informatics and Computing Engineering.",
		startDate: '09/2022',
		endDate: '07/2023'
	}
];

export const getExperienceItems = () => timelineData.filter((item) => item.type === 'experience');
export const getEducationItems = () => timelineData.filter((item) => item.type === 'education');
export const getAllTimelineItems = () => timelineData;

// Helper function to sort items by date (most recent first)
export const sortTimelineByDate = (items: TimelineItem[]) => {
	return items.sort((a, b) => {
		// Handle "Present" dates
		const aEndDate = a.endDate === 'Present' ? new Date() : new Date(a.endDate);
		const bEndDate = b.endDate === 'Present' ? new Date() : new Date(b.endDate);

		return bEndDate.getTime() - aEndDate.getTime();
	});
};
