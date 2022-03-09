<script setup>
var timeout

const showNotification = ref(false)
const notificationTitle = ref('')
const notificationBody = ref('')
const notificationStatus = ref('')

const closeNotification = () => {
  showNotification.value = false
  clearTimeout(timeout)
}
</script>

<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <Notification
      class="z-50"
      v-if="showNotification"
      :status="notificationStatus"
      :title="notificationTitle"
      :body="notificationBody"
      @close="closeNotification"
    />
  </transition>
  <RouterView />
</template>
