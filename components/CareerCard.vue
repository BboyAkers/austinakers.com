<template>
  <!-- Create By Joker Banny -->
  <div
    class="
      w-80
      bg-white
      rounded-xl
      shadow-lg
      overflow-hidden
      hover:shadow-2xl
      transform
      hover:scale-105
      duration-500
    "
  >
    <img class="w-full" :src="companyLogo" :alt="altImageText" />
    <div class="text-center relative py-6">
      <h2
        class="
          mb-1
          text-2xl
          font-sans font-semibold
          text-gray-700
          hover:text-gray-900
          cursor-pointer
        "
      >
        {{ companyName }}
      </h2>
      <span class="text-lg text-gray-700 hover:text-gray-900">
        {{ jobTitle }}
      </span>
      <p class="text-lg text-gray-700 hover:text-gray-900">
        {{ dateStart }} - {{ dateEnd }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CareerCard',
  props: {
    companyName: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    altImageText: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    dateStart: {
      type: String,
      required: true,
    },
    dateEnd: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techUsed: {
      type: Array,
      required: true,
    },
  },
})
</script>
