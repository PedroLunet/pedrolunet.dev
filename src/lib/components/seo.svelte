<script lang="ts">
	import { page } from '$app/state';

	let {
		title = 'Pedro Lunet - Frontend Developer',
		description = 'Frontend Developer based in Porto, creating smooth and meaningful digital experiences.',
		image = 'https://pedrolunet.dev/og-image.png',
		type = 'website'
	} = $props();

	const siteUrl = 'https://pedrolunet.dev';
	const canonicalUrl = $derived(`${siteUrl}${page.url.pathname}`);
	const socialImage = $derived(image.startsWith('http') ? image : `${siteUrl}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="robots" content="index, follow" />

	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={socialImage} />
	<meta property="og:site_name" content="Pedro Lunet" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={socialImage} />
</svelte:head>
