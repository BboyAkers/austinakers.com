<script setup lang="ts">
useHead({
  title: 'Austin Akers',
  meta: [
    { name: 'Frontend Engineer, Cellist, Muay Thai Fighter, and Author.'}
  ],
})
</script>
<template>
  <main>
  <div class="bg-gradient-cover">
      <div class="main-page-container">
        <div>
          <Logo class="logoList" />
          <h1 class="title title-homepage">Austin Akers</h1>
          <h2 class="subtitle subtitle-homepage text-grey-light">
            UI Engineer | Cellist | Dancer | Author
          </h2>
          <div class="pt-10">
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
              href="https://timeline.austinakers.com/"
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
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
.main-page-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.bg-gradient-cover {
  background: linear-gradient(#388cfa, #388cfa);
  background-size: cover;
  background-position: top;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #ffffff;
  letter-spacing: 1px;
  animation-name: moveInRight;
  animation-duration: 1s;
}
.logoList {
  animation-name: moveInTop;
  animation-duration: 1s;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #ffffff;
  word-spacing: 5px;
  padding-bottom: 15px;
  animation-name: moveInLeft;
  animation-duration: 1s;
}

@media only screen and (max-width: 800px) {
  .main-page-container {
    @apply p-5;
  }
  .title-homepage {
    font-size: 3.25em;
  }
  .subtitle-homepage {
    font-size: 2em;
  }
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
