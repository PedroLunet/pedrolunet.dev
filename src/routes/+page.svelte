<script>
  // No JS needed yet
</script>

<section class="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-white">
  <h1 class="text-4xl md:text-6xl font-bold mb-4">Hi, I'm <span class="text-blue-600">[Pedro Lunet]</span></h1>
  <p class="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
    I’m a frontend developer who enjoys building clean and responsive web interfaces using SvelteKit, Tailwind, and modern web tech.
  </p>
  <div class="flex gap-4">
    <a href="/projects" class="bg-blue-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-blue-700 transition">View Projects</a>
    <a href="/contact" class="border border-blue-600 text-blue-600 px-6 py-2 rounded-2xl hover:bg-blue-50 transition">Contact Me</a>
  </div>
</section>

<section class="bg-gray-50 py-20 px-6">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl font-semibold mb-4">About Me</h2>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      I'm currently studying computer engineering and building projects in web and mobile development. I'm passionate about user experience, accessibility, and learning new tools to create meaningful digital products.
    </p>
  </div>
</section>

<section class="bg-white py-20 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-semibold text-center mb-10">Projects</h2>
    <div class="grid md:grid-cols-2 gap-6">
      {#each [1, 2, 3] as project}
        <div class="border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h3 class="text-xl font-bold mb-2">Project Title</h3>
          <p class="text-gray-600 mb-4">Short description of the project. Mention tech stack and what it does.</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-gray-100 text-sm px-3 py-1 rounded-full">SvelteKit</span>
            <span class="bg-gray-100 text-sm px-3 py-1 rounded-full">Tailwind</span>
          </div>
          <div class="flex gap-4">
            <a href="#" class="text-blue-600 hover:underline">GitHub</a>
            <a href="#" class="text-blue-600 hover:underline">Live Demo</a>
          </div>
        </div>
      {/each}
    </div>
    <div class="text-center mt-10">
      <a href="/projects" class="text-blue-600 hover:underline">See all projects →</a>
    </div>
  </div>
</section>

<section class="bg-gray-100 py-20 px-6">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-3xl font-semibold mb-4">Let’s Talk</h2>
    <p class="text-gray-700 text-lg mb-6">
      Want to work together or just say hi? I’d love to hear from you.
    </p>
    <a href="/contact" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl shadow hover:bg-blue-700 transition">
      Contact Me
    </a>
  </div>
</section>
