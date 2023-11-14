<template>
  <main>
    <h1 class="text-3xl">Hello World!</h1>

    <button class="btn btn-accent">Button</button>

    <div class="w-96">
      <div class="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" checked="checked" />
        <div class="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div class="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div class="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" />
        <div class="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div class="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div class="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" />
        <div class="collapse-title text-xl font-medium">
          Click to open this one and close others
        </div>
        <div class="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'App',

  data: () => ({}),

  watch: {},

  methods: {},

  components: {},
};
</script>
