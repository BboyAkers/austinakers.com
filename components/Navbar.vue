<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <nuxt-link to="/" class="font-semibold text-xl tracking-tight">
        Austin Akers
      </nuxt-link>
    </div>
    <div class="block lg:hidden">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="w-full flex-grow lg:flex lg:items-center lg:w-auto"
    >
      <div class="text-sm lg:flex-grow">
        <nuxt-link
          to="/portfolio"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Portfolio
        </nuxt-link>
        <nuxt-link
          to="/contact"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
        >
          Contact Me
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
