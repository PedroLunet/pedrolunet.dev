import { error } from '@sveltejs/kit';
import projects from '$lib/data/projects.json';
import type { PageLoad } from './$types';

type Project = (typeof projects)[number];

/** The subset of a project needed to render a link card to it. */
function teaser({ id, slug, title, image, year, context }: Project) {
	return { id, slug, title, image, year, context };
}

export const load: PageLoad = ({ params }) => {
	const index = projects.findIndex((p) => p.slug === params.slug);

	if (index === -1) {
		error(404, 'Project not found');
	}

	// Neighbours follow the order of the /work index and wrap around, so there
	// is always somewhere to go next.
	const at = (offset: number) => projects[(index + offset + projects.length) % projects.length];

	return {
		project: projects[index],
		prev: projects.length > 1 ? teaser(at(-1)) : null,
		next: projects.length > 1 ? teaser(at(1)) : null
	};
};
