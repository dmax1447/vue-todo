<template>
  <div class="controls">
    <div class="controls__wrapper">
      <router-link to="/new" tag="button" class="btn btn-sm btn-primary mr-1"
        >New task
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    sortOrder: null,
    sortDirection: null
  }),

  methods: {
    addTask() {},
    clearFinished() {}
  }
};
</script>

<style lang="scss">
.controls {
  &__wrapper {
    display: flex;
  }
}
</style>
