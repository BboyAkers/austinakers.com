<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-lighter p-6">
    <div class="flex items-center flex-shrink-0 mr-6">
      <nuxt-link to="/" class="font-semibold text-xl tracking-tight">
        Austin Akers
      </nuxt-link>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-white-lighter border-teal-400 hover:text-white-lighter hover:border-white-lighter"
        @click="isOpen = !isOpen"
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
      <div class="text-sm lg:flex-grow text-white-dark">
        <nuxt-link
          to="/portfolio"
          active-class="text-white-lighter"
          class="block mt-4 lg:inline-block lg:mt-0 mr-4"
        >
          Portfolio
        </nuxt-link>
        <nuxt-link
          to="/contact"
          active-class="text-white-lighter"
          class="block mt-4 lg:inline-block lg:mt-0"
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
