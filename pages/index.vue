<template>
  <div class="bg-gradient-cover">
    <div class="container">
      <div>
        <logo class="logoList" />
        <h1 class="title title-homepage">Austin Akers</h1>
        <h2 class="subtitle subtitle-homepage text-grey-light">
          UI Engineer | Cellist | Dancer | Author
        </h2>
        <div class="links">
          <nuxt-link to="/portfolio" class="btn--green m-1">
            View Portfolio
          </nuxt-link>
          <a
            href="https://github.com/BboyAkers"
            target="_blank"
            class="button--grey m-1"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.bg-gradient-cover {
  background: linear-gradient(#247ba0, #247ba0);
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

.links {
  padding-top: 15px;
}

@media only screen and (max-width: 800px) {
  .container {
    padding: 20px;
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
