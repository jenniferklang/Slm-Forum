<template>
  <div>
    <label class="label">
      <span class="label-text text-xl">{{ label }}</span>
    </label>
    <input
      type="text"
      :placeholder="placeholder"
      class="input input-bordered w-full max-w-xs h-14"
    />
    <div class="badge badge-neutral btn-xs m-0.5">Change</div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    label: String,
    placeholder: String,
  },
};
</script>
