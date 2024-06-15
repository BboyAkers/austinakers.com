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
    <div class="relative top bg-cover bg-gradient-cover-left">
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
      <h2 class="text-4xl text-white pl-10 underline underline-offset-4">Articles:</h2>
      <BlogPostList />
    </section>
    <section>
      <div class="text-white pl-10 py-4">
        <h2 class="text-4xl text-white underline underline-offset-4 pb-4">Some Fun Stuff:</h2>
        <ul class="text-xl py-4 [&>li]:pb-2">
          <li>Evry Health - 
            <a href="https://evryhealth.com/" target="_blank" class="underline">link</a>
          </li>
          <li>MetaMask Documentation (contributor) - 
            <a href="https://docs.metamask.io/" target="_blank" class="pr-2 underline">link</a> 
            <a href="https://github.com/MetaMask/metamask-docs" target="_blank" class="underline">code</a>
          </li>
          <li>Password Generator - 
            <a href="https://passwordgenerator.austinakers.com/" target="_blank" class="pr-2 underline">link</a> 
            <a href="https://github.com/BboyAkers/JavaScript_Projects/tree/master/password-generator" target="_blank" class="underline">code</a>
          </li>
          <li>Card Details - 
            <a href="https://carddetails.austinakers.com/" target="_blank" class="pr-2 underline">link</a> 
            <a href="https://github.com/BboyAkers/JavaScript_Projects/tree/master/credit-card-details-form" target="_blank" class="underline">code</a>
          </li>
          <li>Github User Search - 
            <a href="https://githubsearch.austinakers.com/" target="_blank" class="pr-2 underline">link</a> 
            <a href="https://github.com/BboyAkers/JavaScript_Projects/tree/master/GithubUserSearch" target="_blank" class="underline">code</a>
          </li>
          <li>Solar System - 
            <a href="https://solarsystem.austinakers.com/" target="_blank" class="pr-2 underline">link</a> 
            <a href="https://github.com/BboyAkers/Solar-System" target="_blank" class="underline">code</a>
          </li>
          <li>Sign Up Form - 
            <a href="https://signupform.austinakers.com/" target="_blank" class="pr-2 underline">link</a> 
            <a href="https://github.com/BboyAkers/JavaScript_Projects/tree/master/sign-up-form" target="_blank" class="underline">code</a>
          </li>
          <li>Skilled E-Learning Landing Page - 
            <a href="https://skilledpage.austinakers.com/" target="_blank" class="pr-2 underline">link</a> 
            <a href="https://github.com/BboyAkers/JavaScript_Projects/tree/master/skilled-elearning-landing-page" target="_blank" class="underline">code</a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>


<style scoped>

.bg-gradient-cover-left {
  background: linear-gradient(#004ca3, #004ca3);
  clip-path: polygon(0 0, 100% 0, 100% 70vh, 0 100%);
}
.bg-gradient-cover-right {
  background: linear-gradient(#004ca3, #004ca3);
  clip-path: polygon(0 0, 100% 0, 100% 100% , 0 70vh);
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
