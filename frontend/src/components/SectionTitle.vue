<template>
  <div class="w-full flex justify-center">
    <h2 class="font-bold" :class="size === 'large' ? 'text-4xl' : 'text-2xl'">
      {{ title }}
    </h2>
  </div>
</template>
<script>
export default {
  name: 'SectionTitle',

  props: {
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: 'small',
    },
  },
};
</script>

<style></style>
