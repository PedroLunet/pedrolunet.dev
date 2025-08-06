<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import type { TimelineItem } from '$lib/data/timeline';

	export let item: TimelineItem;

	$: isExperience = item.type === 'experience';
	$: borderColor = isExperience ? 'border-l-primary/50' : 'border-l-muted';
	$: dotColor = item.current
		? 'bg-green-500 animate-pulse'
		: isExperience
			? 'bg-primary'
			: 'bg-muted-foreground';
	$: dotSize = item.current ? 'h-2.5 w-2.5' : 'h-2 w-2';
	$: dateColor = isExperience ? 'text-primary' : 'text-muted-foreground';
</script>

<Card class="border-l-4 {borderColor}">
	<CardContent class="pt-6">
		<div class="flex items-start justify-between">
			<div>
				<div class="mb-2 flex items-center gap-2">
					<div class="{dotSize} rounded-full {dotColor}"></div>
					<h4 class="text-text text-lg font-semibold">
						{item.title}
					</h4>
				</div>
				<p class="mb-2 font-medium text-muted-foreground">{item.organization}</p>
				<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
					{#if item.link}
						{@html item.description.replace(
							item.link.text,
							`<a href="${item.link.url}" target="_blank" class="text-primary hover:underline">${item.link.text}</a>`
						)}
					{:else}
						{item.description}
					{/if}
				</p>
			</div>
			<span class="text-sm font-medium whitespace-nowrap {dateColor}">
				{item.startDate}{#if item.endDate}
					- {item.endDate}{/if}
			</span>
		</div>
	</CardContent>
</Card>
