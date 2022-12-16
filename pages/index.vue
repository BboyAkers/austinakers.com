<script setup lang="ts">
useHead({
  title: 'Austin Akers',
  meta: [
    { name: 'Frontend Engineer, Cellist, Muay Thai Fighter, and Author.'}
  ],
})
</script>
<template>
  <div class="bg-gradient-cover">
      <div class="main-page-container">
        <div>
          <Logo class="logoList" />
          <h1 class="title title-homepage">Austin Akers</h1>
          <h2 class="subtitle subtitle-homepage text-grey-light">
            UI Engineer | Cellist | Dancer | Author
          </h2>
          <div class="website-links">
            <a
              href="https://www.linkedin.com/in/austin-akers-b1966765/"
              target="_blank"
              class="btn button--blue m-1"
            >
              View LinkedIn
            </a>
            <a
              href="https://github.com/BboyAkers"
              target="_blank"
              class="btn button--grey m-1"
            >
              GitHub
            </a>
            <a
              href="https://timeline.austinakers.com/"
              target="_blank"
              class="btn button--green m-1"
            >
              View Timeline
            </a>
          </div>
        </div>
      </div>
    </div>
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
  margin: 0;
}
.btn {
  font-weight: 500;
  display: inline-block;
  border-radius: 4px;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green {
  color: #fff;
  background-color: #54b4a4;
  border: 1px solid #54b4a4;
}
.button--green:hover {
  color: #fff;
  background-color: #4ca193;
  border: 1px solid #4ca193;
}
.button--grey {
  color: #fff;
  background-color: #50514f;
  border: 1px solid #50514f;
}
.button--grey:hover {
  color: #fff;
  background-color: #393a38;
}
.button--blue {
  color: #fff;
  background-color: #0274b3;
  border: 1px solid #0274b3;
}
.button--blue:hover {
  color: #fff;
  background-color: #00679e;
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
.website {
  padding-top: 15px;
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
