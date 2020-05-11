<template>
  <article>
    <div class="rounded overflow-hidden shadow-lg">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            :src="companyLogo"
            :alt="altImageText"
            class="rounded-lg md:w-56"
          />
        </div>
        <div class="mt-4 md:mt-0 md:ml-6 p-4">
          <div
            class="uppercase tracking-wide text-sm text-indigo-600 font-bold"
          >
            {{ companyName }}
          </div>
          <p
            class="block mt-1 text-lg leading-tight font-semibold text-gray-900"
          >
            {{ jobTitle }}
          </p>
          <p class="mt-2 text-gray-600">{{ dateStart }} - {{ dateEnd }}</p>
          <p class="mb-6">{{ detailedDescription[0] }}</p>
          <button @click="isOpen = true" type="button" class="button--green">
            More Info
          </button>
        </div>
      </div>
      <modal v-if="isOpen" @close="isOpen = false">
        <div slot="header">
          <h1 class="text-3xl">{{ companyName }}</h1>
          <h2 class="text-xl">{{ jobTitle }}</h2>
          <img :src="companyLogo" style="height: 300px;" />
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
  </article>
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
    altImageText: {
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
