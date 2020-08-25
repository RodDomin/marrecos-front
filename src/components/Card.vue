<template>
  <div class="card">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>

<style>
.card {
  /* max-width: 80vw; */
  background-color: rgba(216, 84, 48, 0.7);
  width: fit-content;
  padding: 50px;
  border-radius: 25px;
  max-width: 500px;

  position: relative;
}

@media (max-width: 550px) {
  .card {
    max-width: 80vw !important;
  }
}
</style>
