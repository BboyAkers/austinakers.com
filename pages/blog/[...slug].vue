<script setup>

const { path } = useRoute();

const { data: blogPost } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({_path: path}).findOne();
});

</script>

<template>
  <main>
  <div class="relative px-4 lg:px-8 py-16">
    <div class="mx-auto max-w-prose text-lg text-center">
      <NuxtLink to="/"><p class="inline-block text-white"><span>&#8592;</span> Return to Homepage</p></NuxtLink>
      <h1 class="mt-2 block text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl">
        {{blogPost.title}}
      </h1>
      <p class="mt-4 text-xl leading-8 text-gray-400">{{ blogPost.subtitle }}</p>
      <p class="mb-8 text-xl leading-8 text-gray-400">{{ blogPost.description }}</p>
    </div>
    <div class="mx-auto max-w-prose text-lg content-doc text-white">
      <ContentDoc />
    </div>
    <div class="text-center text-xl mt-8">
    <NuxtLink to="/"><p class="inline-block text-white"><span>&#8592;</span> Return to Homepage</p></NuxtLink>
    </div>
  </div>                                                                    
  </main>
</template>
