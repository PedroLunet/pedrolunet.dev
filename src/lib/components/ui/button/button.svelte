<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import CheckIcon from '@lucide/svelte/icons/check';

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow-xs',
				defaultWithHover: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive shadow-xs focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white',
				destructiveWithHover:
					'bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white',
				outline:
					'bg-background shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input border',
				outlineWithHover:
					'bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border',
				secondary: 'bg-secondary text-secondary-foreground shadow-xs',
				secondaryWithHover:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: 'hover:text-accent-foreground dark:hover:bg-accent/50',
				ghostWithHover: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-11 px-6 py-4 has-[>svg]:px-3',
				sm: 'h-10 gap-1.5 rounded-2xl px-5 has-[>svg]:px-2.5',
				lg: 'h-12 rounded-2xl px-8 has-[>svg]:px-4',
				icon: 'size-11'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			loading?: boolean;
			success?: boolean;
			hoverIcon?: any;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		loading = false,
		success = false,
		hoverIcon = undefined,
		children,
		...restProps
	}: ButtonProps = $props();

	let isHovered = $state(false);

	const mickeyEarBg = $derived(() => {
		if (loading || success) return 'bg-primary';
		if (!hoverIcon) return '';
		if (variant === 'default') return 'bg-primary';
		if (variant === 'destructive') return 'bg-destructive';
		if (variant === 'outline' || variant === 'ghost') return 'bg-accent';
		if (variant === 'secondary') return 'bg-secondary';
		return 'bg-primary';
	});

	const effectiveVariant = $derived(() => {
		if (!hoverIcon) {
			// Add 'WithHover' suffix for buttons without hoverIcon
			if (variant === 'default') return 'defaultWithHover';
			if (variant === 'destructive') return 'destructiveWithHover';
			if (variant === 'outline') return 'outlineWithHover';
			if (variant === 'secondary') return 'secondaryWithHover';
			if (variant === 'ghost') return 'ghostWithHover';
		}
		return variant;
	});
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(
			buttonVariants({ variant: effectiveVariant(), size }),
			(loading || success || hoverIcon) && 'relative',
			className
		)}
		href={disabled || loading || success ? undefined : href}
		aria-disabled={disabled || loading || success}
		role={disabled || loading || success ? 'link' : undefined}
		tabindex={disabled || loading || success ? -1 : undefined}
		onmouseenter={() => (isHovered = true)}
		onmouseleave={() => (isHovered = false)}
		{...restProps}
	>
		{@render children?.()}
		{#if loading || success || hoverIcon}
			<span
				class={cn(
					'absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full',
					mickeyEarBg()
				)}
				class:animate-in={loading || success}
				class:zoom-in-50={loading || success}
				class:fade-in={loading || success}
				class:bubble-pop={hoverIcon && isHovered && !loading && !success}
				class:bubble-hide={hoverIcon && !isHovered && !loading && !success}
			>
				{#if loading}
					<span class="icon-morph inline-block">
						<Spinner class="size-4 text-primary-foreground" />
					</span>
				{:else if success}
					<span class="icon-morph inline-block">
						<CheckIcon class="size-3.5 text-primary-foreground" stroke-width="3" />
					</span>
				{:else if hoverIcon}
					{@const Icon = hoverIcon}
					<span class="icon-morph inline-block">
						<Icon class="size-3.5 text-primary-foreground" stroke-width="2.5" />
					</span>
				{/if}
			</span>
		{/if}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(
			buttonVariants({ variant, size }),
			(loading || success || hoverIcon) && 'relative',
			className
		)}
		{type}
		disabled={disabled || loading || success}
		onmouseenter={() => (isHovered = true)}
		onmouseleave={() => (isHovered = false)}
		{...restProps}
	>
		{@render children?.()}
		{#if loading || success || hoverIcon}
			<span
				class={cn(
					'absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full',
					mickeyEarBg()
				)}
				class:animate-in={loading || success}
				class:zoom-in-50={loading || success}
				class:fade-in={loading || success}
				class:bubble-pop={hoverIcon && isHovered && !loading && !success}
				class:bubble-hide={hoverIcon && !isHovered && !loading && !success}
			>
				{#if loading}
					<span class="icon-morph inline-block">
						<Spinner class="size-4 text-primary-foreground" />
					</span>
				{:else if success}
					<span class="icon-morph inline-block">
						<CheckIcon class="size-3.5 text-primary-foreground" stroke-width="3" />
					</span>
				{:else if hoverIcon}
					{@const Icon = hoverIcon}
					<span class="icon-morph inline-block">
						<Icon class="size-3.5 text-primary-foreground" stroke-width="2.5" />
					</span>
				{/if}
			</span>
		{/if}
	</button>
{/if}

<style>
	.icon-morph {
		animation: iconMorph 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes iconMorph {
		from {
			transform: rotate(90deg) scale(0);
			opacity: 0;
		}
		to {
			transform: rotate(0deg) scale(1);
			opacity: 1;
		}
	}

	.bubble-pop {
		animation: bubblePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.bubble-hide {
		animation: bubbleHide 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
	}

	@keyframes bubblePop {
		0% {
			transform: scale(0) translate(-50%, 50%);
			opacity: 0;
		}
		50% {
			transform: scale(1.1) translate(0, 0);
		}
		100% {
			transform: scale(1) translate(0, 0);
			opacity: 1;
		}
	}

	@keyframes bubbleHide {
		0% {
			transform: scale(1) translate(0, 0);
			opacity: 1;
		}
		100% {
			transform: scale(0) translate(-50%, 50%);
			opacity: 0;
		}
	}
</style>
