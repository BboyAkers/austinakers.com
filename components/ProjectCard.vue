<template>
  <article>
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto">
      <img :src="projectScreenshot" :alt="altImageText" class="w-full" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ projectName }}</div>
        <p class="text-gray-700 text-base">
          {{ projectDescription }}
        </p>
      </div>
      <div class="px-6 py-4">
        <a
          :href="demoLink"
          v-show="demoLink.length > 0"
          target="_blank"
          class="btn--green"
        >
          Demo
        </a>
        <a
          :href="githubLink"
          v-show="githubLink.length > 0"
          target="_blank"
          class="button--grey"
        >
          Visit Github
        </a>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    projectName: {
      type: String,
      required: true
    },
    projectScreenshot: {
      type: String,
      required: true
    },
    altImageText: {
      type: String,
      required: true
    },
    projectDescription: {
      type: String,
      required: true
    },
    githubLink: {
      type: String,
      required: true
    },
    demoLink: {
      type: String,
      required: true
    }
  }
}
</script>
