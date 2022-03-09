<template>
  <div
    class="fixed inset-x-0 bottom-0 z-10 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
  >
    <!--
    Background overlay, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="fixed inset-0 transition-opacity" @click="closeModal">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>

    <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  -->
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
          <button
            type="button"
            class="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:text-gray-500 focus:outline-none"
            aria-label="Close"
            @click="closeModal"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left">
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-headline"
            >
              Forgot Your Password?
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">
                To reset your password input your email. We will send you a link
                to securely reset your password.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-3 w-full">
          <label for="password_reset_email" class="sr-only">Email</label>
          <div class="relative rounded-md shadow-sm">
            <input
              v-model="email"
              id="password_reset_email"
              :class="`${
                error
                  ? 'focus:shadow-outline-red border-red-300 text-red-900 placeholder-red-300 focus:border-red-300'
                  : ''
              } form-input block w-full sm:text-sm sm:leading-5`"
              placeholder="you@example.com"
            />
            <div
              v-if="error"
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg
                class="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p v-if="error" class="mt-2 text-sm text-red-600" id="email-error">
            {{ error }}
          </p>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              :disabled="isLoading"
              type="button"
              @click="sendPasswordResetEmail"
              :class="`${
                isLoading ? 'cursor-not-allowed opacity-75' : ''
              } bg-animali-700 hover:bg-primary focus:bg-secondary focus:shadow-outline-teal inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium leading-6 text-white shadow-sm transition duration-150 ease-in-out focus:outline-none sm:text-sm sm:leading-5`"
            >
              <svg
                v-if="isLoading"
                class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                viewBox="0 0 24 24"
              >
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Reset Password
            </button>
          </span>
          <span
            class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto"
          >
            <button
              type="button"
              @click="closeModal"
              class="focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium leading-6 text-gray-700 shadow-sm transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const email = ref('')
const error = ref(null)
const isLoading = ref(false)

const sendPasswordResetEmail = () => {}

const closeModal = () => {}

// export default {

//   methods: {
//     closeModal() {
//       this.$emit('closeModal')
//     },

//     sendPasswordResetEmail() {
//       this.error = null
//       this.isLoading = true
//       var actionCodeSettings = {
//         url: 'https://app.animali.life/login?password=reset',
//       }
//       const self = this
//       this.$fireAuth
//         .sendPasswordResetEmail(this.email, actionCodeSettings)
//         .then(function () {
//           // Email sent.
//           console.log('email sent')
//           self.error = null
//           self.isLoading = false
//           self.$emit('closeModal')
//           self.$emit('showNotification', {
//             status: 'success',
//             title: 'Email sent',
//             body: 'Check your email to reset your password',
//           })
//         })
//         .catch(function (error) {
//           // An error happened.
//           if (error.code === 'auth/user-not-found') {
//             self.isLoading = false
//             self.error = error.message
//             console.log(error.message)
//           } else if (error.code === 'auth/invalid-email') {
//             self.isLoading = false
//             self.error = error.message
//             console.log(error.message)
//           }
//         })
//     },
//   },
// }
</script>
