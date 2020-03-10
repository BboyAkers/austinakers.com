<template>
  <div>
    <navbar />
    <div class="p-6">
      <h2 class="text-3xl mb-1">Work History</h2>
      <div>
        <div class="flex flex-wrap mb-4">
          <div
            v-for="work in workHistory"
            v-bind:key="work.id"
            class="sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/4 h-auto p-1"
          >
            <work-history-card
              :companyName="work.companyName"
              :jobTitle="work.jobTitle"
              :dateStart="work.dateStart"
              :dateEnd="work.dateEnd"
              :description="work.description"
              :techUsed="work.techUsed"
            />
          </div>
        </div>
      </div>
      <button
        @click="isOpen = true"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Modal
      </button>

      <h2 class="text-3xl mb-1">Projects</h2>
      <div class="flex flex-wrap mb-4">
        <div class="sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/4 h-auto mt-4">
          <project-card />
        </div>
      </div>
    </div>
    <modal v-if="isOpen" @close="isOpen = false"></modal>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'
import WorkHistoryCard from '~/components/WorkHistoryCard'
import ProjectCard from '~/components/ProjectCard'
import workHistoryData from '~/data/workHistory.json'
import Modal from '~/components/Modal'
export default {
  components: {
    Navbar,
    WorkHistoryCard,
    ProjectCard,
    Modal
  },
  data() {
    return {
      workHistory: workHistoryData,
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
