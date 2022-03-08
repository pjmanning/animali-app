<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="text-3xl">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style></style>
