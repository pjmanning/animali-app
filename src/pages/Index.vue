<template>
  <div>Initial dashboard route</div>
  User is: {{ user }}
</template>

<script setup>
import { auth } from '@/firebase/config'
const user = auth.currentUser
</script>

<route lang="yaml">
meta:
  requiresAuth: auth
</route>
