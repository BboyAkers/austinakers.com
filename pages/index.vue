<script setup lang="ts">
useHead({
  title: 'Austin Akers',
  meta: [
    { name: 'Senior Frontend Engineer, Dancer Cellist, Muay Thai Fighter, and Author.'}
  ],
})
</script>
<template>
  <main>
  <div class="relative top bg-cover bg-gradient-cover">
      <div class="p-5 md:p-0 flex min-h-9/10 mx-auto justify-center items-center text-center">
        <div>
          <Logo class="logoList-animation" />
          <h1 class="block pt-4 text-5xl md:text-8xl font-light text-white tracking-wide title-animation">Austin Akers</h1>
          <h2 class="text-3xl md:text-4xl font-light py-4 text-white [word-spacing:0.25rem] subtitle-animation hover:no-underline">
            Senior Software Engineer | Cellist | Dancer | Author
          </h2>
          <div class="pt-4 md:pt-8">
            <a
              href="https://www.linkedin.com/in/austin-akers-b1966765/"
              target="_blank"
              class="px-8 py-3 mx-1 rounded font-medium bg-blue-light text-white hover:bg-blue-dark inline-block"
            >
              View LinkedIn
            </a>
            <a
              href="https://github.com/BboyAkers"
              target="_blank"
              class="px-8 py-3 mx-1 rounded font-medium bg-grey-light text-white hover:bg-grey-dark inline-block"
            >
              GitHub
            </a>
            <a
              href="https://www.polywork.com/austinakers"
              target="_blank"
              class="px-8 py-3 mx-1 mt-4 md:mt-0 rounded font-medium bg-green-light text-white hover:bg-green-dark inline-block"
            >
              View Timeline
            </a>
          </div>
        </div>
      </div>
    </div>
    <section>
      <BlogPostList />
    </section>
    </main>
</template>


<style scoped>

.bg-gradient-cover {
  background: linear-gradient(#004ca3, #004ca3);
  clip-path: polygon(0 0, 100% 0, 100% 70vh, 0 100%);
}
.title-animation {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  animation-name: moveInRight;
  animation-duration: 1s;
}
.logoList-animation {
  animation-name: moveInTop;
  animation-duration: 1s;
}
.subtitle-animation {
  animation-name: moveInLeft;
  animation-duration: 1s;
}

@keyframes moveInTop {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
