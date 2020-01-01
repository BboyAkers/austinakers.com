<template>
  <div>
    <navbar />
    <div class="p-6">
      <h2 class="text-3xl mb-1">Work History</h2>
      <div class="flex flex-wrap mb-4">
        <div class="sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/4 h-auto">
          <work-history-card />
        </div>
      </div>

      <!-- Two columns -->
      <div class="flex mb-4">
        <div class="w-1/2 bg-gray-400 h-12"></div>
        <div class="w-1/2 bg-gray-500 h-12"></div>
      </div>

      <!-- Three columns -->
      <div class="flex mb-4">
        <div class="w-1/3 bg-gray-400 h-12"></div>
        <div class="w-1/3 bg-gray-500 h-12"></div>
        <div class="w-1/3 bg-gray-400 h-12"></div>
      </div>

      <!-- Four columns -->
      <div class="flex mb-4">
        <div class="w-1/4 bg-gray-500 h-12"></div>
        <div class="w-1/4 bg-gray-400 h-12"></div>
        <div class="w-1/4 bg-gray-500 h-12"></div>
        <div class="w-1/4 bg-gray-400 h-12"></div>
      </div>

      <!-- Five columns -->
      <div class="flex mb-4">
        <div class="w-1/5 bg-gray-500 h-12"></div>
        <div class="w-1/5 bg-gray-400 h-12"></div>
        <div class="w-1/5 bg-gray-500 h-12"></div>
        <div class="w-1/5 bg-gray-400 h-12"></div>
        <div class="w-1/5 bg-gray-500 h-12"></div>
      </div>

      <!-- Six columns -->
      <div class="flex">
        <div class="w-1/6 bg-gray-400 h-12"></div>
        <div class="w-1/6 bg-gray-500 h-12"></div>
        <div class="w-1/6 bg-gray-400 h-12"></div>
        <div class="w-1/6 bg-gray-500 h-12"></div>
        <div class="w-1/6 bg-gray-400 h-12"></div>
        <div class="w-1/6 bg-gray-500 h-12"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'
import WorkHistoryCard from '~/components/WorkHistoryCard'
export default {
  components: {
    Navbar,
    WorkHistoryCard
  }
}
</script>
