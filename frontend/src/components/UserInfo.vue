<template>
  <div>
    <label class="label">
      <span class="label-text text-xl">{{ label }}</span>
    </label>

    <div class="flex">
      <input
        type="text"
        :placeholder="placeholder"
        class="input input-bordered max-w-xs h-14"
        disabled
      />
      <div class="flex flex-col">
        <div class="badge badge-neutral btn-xs m-0.5 w-full">Change</div>
        <div class="badge badge-neutral btn-xs m-0.5 w-full">Delete</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
});
</script>
