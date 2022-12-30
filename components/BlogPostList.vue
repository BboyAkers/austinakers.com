<script setup>
const { data: blogPostList } = useAsyncData('blogPostList', () => {
  return queryContent('/blog').sort({ date: -1 }).find()
})

</script>

<template>
  <div class="px-10 py-4">
    <div v-for="blogPost in blogPostList" :key="blogPost._path" class="py-4">
      <NuxtLink :to="blogPost._path"><h3 class="text-3xl">{{blogPost.title}}</h3></NuxtLink>
      <p class="leading-8 text-gray-500">{{ blogPost.description }}</p>
    </div>
  </div>
</template>