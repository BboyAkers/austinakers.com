<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      style="background-image: url('https://tailwindcss.com/img/card-left.jpg')"
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
        <p class="text-gray-700 text-base">
          Description of my role
        </p>
      </div>
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
  </div>
</template>

<script>
export default {
  props: {
    companyName: {
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
    techUsed: {
      type: Array,
      required: true
    }
  }
}
</script>
