<script setup>

const { path } = useRoute();

const { data: blogPost } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({_path: path}).findOne();
});

</script>

<template>
  <main>
  <div class="relative px-4 sm:px-6 lg:px-8 py-16">
    <div class="mx-auto max-w-prose text-lg">
      <h1>
        <!-- <span class="block text-center text-lg font-semibold text-indigo-600">Introducing</span> -->
        <span class="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">{{blogPost.title}}</span>
      </h1>
      <p class="mt-8 text-xl leading-8 text-gray-500 text-center">{{ blogPost.description }}</p>
    </div>
    <div class="mx-auto max-w-prose text-lg">
      <ContentDoc />
    </div>
  </div>
    
  </main>
</template>