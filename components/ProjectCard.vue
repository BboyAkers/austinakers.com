<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
    <img
      class="w-full"
      :src="projectScreenshot"
      alt="Sunset in the mountains"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ projectName }}</div>
      <p class="text-gray-700 text-base">
        {{ projectDescription }}
      </p>
    </div>
    <div class="px-6 py-4">
      <a
        :href="demoLink"
        target="_blank"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Demo
      </a>
      <a
        :href="githubLink"
        target="_blank"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Visit Github
      </a>
    </div>
  </div>
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
