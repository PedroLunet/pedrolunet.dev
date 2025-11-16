// Prerender this page to static HTML to avoid bundling heavy dependencies
// (GSAP, animations) into the Cloudflare Worker
// This keeps the Worker under the 3 MiB free tier limit
export const prerender = true;
