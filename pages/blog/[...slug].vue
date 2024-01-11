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
      <NuxtLink to="/"><p class="inline-block text-gray-600"><span>&#8592;</span> Return to Homepage</p></NuxtLink>
      <h1 class="mt-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
        {{blogPost.title}}
      </h1>
      <p class="mt-4 text-xl leading-8 text-gray-500">{{ blogPost.subtitle }}</p>
      <p class="mb-8 text-xl leading-8 text-gray-500">{{ blogPost.description }}</p>
    </div>
    <div class="mx-auto max-w-prose text-lg content-doc">
      <ContentDoc />
    </div>
    <div class="text-center text-xl mt-8">
    <NuxtLink to="/"><p class="inline-block text-gray-600"><span>&#8592;</span> Return to Homepage</p></NuxtLink>
    </div>
  </div>                                                                    
  </main>
</template>

<style scoped>
.content-doc h2 {
  @apply text-2xl py-4;
}

.content-doc pre {
  @apply overflow-x-scroll p-4 my-6 bg-[#f8f8ff];
}

.content-doc p {
  @apply py-1 text-xl;
}

.content-doc hr {
  @apply my-3;
}

.content-doc ul {
  @apply list-disc pl-6 md:pl-8 text-xl;
}

.content-doc ol {
  @apply list-decimal pl-6 md:pl-8 text-xl;
}

.content-doc li a {
  @apply text-blue-600 hover:underline visited:text-purple-600;
}

.content-doc h1, h2, h3, h4, h5, h6 {
  @apply hover:underline visited:text-purple-600;
}
</style>
