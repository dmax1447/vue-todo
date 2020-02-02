<template>
  <div class="controls">
    <div class="controls__wrapper">
      <button
        type="button"
        class="btn btn-primary btn-sm mr-1"
        @click="addTask"
      >
        Добавить задачу
      </button>
      <button
        type="button"
        class="btn btn-warning btn-sm mr-1"
        @click="clearFinished"
      >
        Очистить завершенные
      </button>
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
