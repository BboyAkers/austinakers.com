<script setup>
const { data: blogPostList } = useAsyncData('blogPostList', () => {
  return queryContent('/blog').find()
})

</script>

<template>
  <div>
    <div v-for="blogPost in blogPostList" :key="blogPost._path">
      <a :href="blogPost._path"><h1>{{blogPost.title}}</h1></a>
      <p>{{ blogPost.description }}</p>
      <p>{{ blogPost.tags }}</p>
    </div>
  </div>
</template>