<script lang="ts">
  import ThemeSwitch from './ThemeSwitch.svelte';

  const navItems = [
    { label: 'About', href: '/#about' },
    { label: 'Journey', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Contact', href: '/#contact' }
  ];
</script>

<header class="fixed top-0 left-0 right-0 z-50 border-b border-border/10 bg-background/80 px-6 py-4 backdrop-blur-md transition-all">
  <div class="mx-auto flex max-w-7xl items-center justify-between">
    <a href="/#hero" class="text-xl font-black tracking-tight text-primary">PL.</a>

    <nav class="hidden items-center gap-6 md:flex">
      {#each navItems as item}
        <a 
          href={item.href} 
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <ThemeSwitch />
  </div>
</header>