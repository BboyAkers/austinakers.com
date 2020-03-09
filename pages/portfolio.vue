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
              :techUsed="work.techUsed"
            />
          </div>
        </div>
      </div>

      <h2 class="text-3xl mb-1">Projects</h2>
      <div class="flex flex-wrap mb-4">
        <div class="sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/4 h-auto">
          <!-- <work-history-card work-history-info="workHistoryInfo" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'
import WorkHistoryCard from '~/components/WorkHistoryCard'
import workHistoryData from '~/data/workHistory.json'
export default {
  components: {
    Navbar,
    WorkHistoryCard
  },
  data() {
    return {
      workHistory: workHistoryData
    }
  }
}
</script>
