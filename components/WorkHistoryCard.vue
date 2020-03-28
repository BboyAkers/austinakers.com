<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex shadow-lg">
    <div
      :style="{ backgroundImage: `url(${companyLogo})` }"
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      title="Woman holding a mug"
    ></div>
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div class="mb-6">
        <div class="text-gray-900 font-bold text-xl mb-2">
          <h3>{{ companyName }} - {{ jobTitle }}</h3>
        </div>
        <p class="text-gray-600">{{ dateStart }} - {{ dateEnd }}</p>
      </div>
      <button
        @click="isOpen = true"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        More Info
      </button>
    </div>
    <modal v-if="isOpen" @close="isOpen = false">
      <div slot="header">
        <h1 class="text-3xl">{{ companyName }}</h1>
        <h2 class="text-xl">{{ jobTitle }}</h2>
        <img :src="companyLogo" style="height: 300px" />
      </div>
      <div slot="body">
        <ul class="list-disc">
          <li
            v-for="jobDescription in detailedDescription"
            :key="jobDescription"
          >
            <p>{{ jobDescription }}</p>
          </li>
        </ul>
        <p class="text-gray-800">Tech Used:</p>
        <div class="flex items-center inline-block">
          <div class="text-sm">
            <span
              v-for="item in techUsed"
              :key="item"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
      <!-- <div slot="footer"></div> -->
    </modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal'
export default {
  components: {
    Modal
  },
  props: {
    companyName: {
      type: String,
      required: true
    },
    companyLogo: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    dateStart: {
      type: String,
      required: true
    },
    dateEnd: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    detailedDescription: {
      type: Array,
      required: true
    },
    techUsed: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    showModal() {
      this.isOpen = true
    }
  }
}
</script>
