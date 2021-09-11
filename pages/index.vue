<template>
  <div>
    <div class="bg-gradient-cover">
      <div class="hero-container">
        <div>
          <logo class="logoList" />
          <h1 class="hero-title title-homepage">Austin Akers</h1>
          <h2 class="subtitle subtitle-homepage text-grey-light">
            UI Engineer | Cellist | Dancer | Author
          </h2>
          <div class="links">
            <a
              href="https://www.linkedin.com/in/austin-akers-b1966765/"
              target="_blank"
              class="btn--green m-1"
            >
              Linkedin
            </a>

            <a
              href="https://github.com/BboyAkers"
              target="_blank"
              class="button--grey m-1"
            >
              GitHub
            </a>
            <a
              href="https://dev.to/bboyakers"
              target="_blank"
              class="button--grey m-1"
            >
              Dev.to
            </a>
            <a
              href="https://twitter.com/tweetmonster999"
              target="_blank"
              class="button--grey m-1"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto">
      <h2 class="card-title">About Me</h2>
      <div class="row">
        <div
          class="
            grid
            sm:grid-cols-1
            md:grid-cols-3
            lg:grid-cols-4
            mx:auto
            gap-4
          "
        >
          <div v-for="work in workHistory" :key="work.id">
            <career-card
              :company-name="work.companyName"
              :company-logo="work.companyLogo"
              :alt-image-text="work.altImageText"
              :job-title="work.jobTitle"
              :date-start="work.dateStart"
              :date-end="work.dateEnd"
              :description="work.description"
              :tech-used="work.techUsed"
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Skills</h2>
              <p class="card-text">
                I have a strong background in front-end development and design.
                I have worked with HTML, CSS, and JavaScript. I have worked with
                Vue.js, Vuex, Vue Router, and Vuex-router. I have worked with
                Node.js, Express, and MongoDB. I have worked with Git, GitHub,
                and Heroku. I have worked with Adobe Photoshop and Illustrator.
                I have worked with Adobe XD and Figma. I have worked with Adobe
                After Effects and Premiere Pro. I have worked with Adobe
                Audition and After Effects. I have worked with Adobe Premiere
                and Audition. I have worked with Adobe After Effects and
                Audition. I have worked with Adobe After Effects and Audition. I
                have worked with Adobe After Effects and Audition. I have worked
                with Adobe After Effects and Audition. I have worked with Adobe
                After Effects and Audition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import CareerCard from '~/components/CareerCard.vue'
import workHistoryData from '~/data/workHistory.json'

export default {
  components: {
    Logo,
    CareerCard,
  },
  data() {
    return {
      workHistory: workHistoryData,
    }
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.hero-container {
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

.hero-title {
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
  .hero-container {
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
