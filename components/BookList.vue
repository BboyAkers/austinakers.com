<script setup>
// const { data: bookList } = useAsyncData('bookList', () => {
//   return queryContent('learn', 'programming-books').find()
// })
const { data: bookList } = useAsyncData('bookList', () => fetchContentNavigation('learn', 'programming-books"'))

</script>

<template>
  <div class="px-10 py-4 text-white">
    <!-- <div v-for="book in bookList" :key="book._path" class="py-4">
      <NuxtLink :to="book._path"><h3 class="text-3xl hover:underline">{{book._dir}}</h3></NuxtLink>
    </div> -->
    <pre>{{ bookList }}</pre>
  </div>
</template>
