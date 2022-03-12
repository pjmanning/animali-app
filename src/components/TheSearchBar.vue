<template>
  <div class="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
    <!-- <TheMobileSidebar
            :isSidebarOpen="isSidebarOpen"
            @close="isSidebarOpen = false"
        /> -->
    <button
      class="px-4 text-gray-500 border-r border-gray-200 focus:bg-gray-100 focus:text-gray-600 focus:outline-none md:hidden"
      aria-label="Open sidebar"
      @click="isSidebarOpen = true"
    >
      <svg
        class="w-6 h-6"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    </button>
    <div class="flex justify-between flex-1 px-6">
      <div
        class="relative inset-y-0 left-0 flex items-center ml-0 pointer-events-none md:absolute md:ml-6"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
      </div>
      <!-- <AutoSuggest
        ref="navbarSearch"
        :autoFocus="showFullSearch"
        :data="searchData"
        search_key="name"
        background-overlay
        class="w-full"
        inputClasses="block w-full h-full ml-2 md:ml-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
        placeholder="Search for animals..."
        @input="hnd_search_query_update"
        @selected="selected"
        @closeSearchbar="showFullSearch = false"
      >
        <template v-slot:group="{ group_name }">
          <p class="font-semibold text-primary">{{ group_name }}</p>
        </template>

        <template v-slot:Animals="{ suggestion }">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                :src="suggestion.profile_pic"
                :alt="suggestion.name"
                class="w-8 h-8 mr-3 rounded-full"
              />
              <div class="mt-1 leading-none">
                <p>{{ suggestion.name }}</p>
                <small>{{ suggestion.id }}</small>
              </div>
            </div>
            <small>{{ suggestion.status }}</small>
          </div>
        </template>

        <template v-slot:noResult="{ group_name }">
          <div class="flex items-center">
            <span>No results found.</span>
          </div>
        </template>
      </AutoSuggest> -->
      <div class="flex items-center flex-shrink-0 ml-4 md:ml-6">
        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
            <button
              class="flex items-center max-w-xs text-sm rounded-full focus:shadow-outline focus:outline-none"
              id="user-menu"
              aria-label="User menu"
              aria-haspopup="true"
              @click="isAvatarMenuOpen = !isAvatarMenuOpen"
              v-on-click-outside="hideAvatarMenu"
            >
              <!-- <img
                v-if="activeUserInfo.imageLogo !== ''"
                class="w-8 h-8 rounded-full"
                :src="activeUserInfo.imageLogo"
                :alt="activeUserInfo.name"
              />
              <img
                v-else
                class="w-8 h-8 rounded-full"
                src="@/static/icon.png"
                alt="logo"
              /> -->
              <img
                class="w-8 h-8 rounded-full"
                src="@/assets/images/logo.svg"
                alt="logo"
              />
            </button>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"
              v-show="isAvatarMenuOpen"
            >
              <div
                class="py-1 bg-white rounded-md shadow-xs"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <!-- <a
                  v-if="activeUserInfo.isPublic"
                  :href="`https://animali.life/programs/${activeUserInfo.programSlug}/${activeUserInfo.programId}`"
                  target="_blank"
                  class="flex items-center justify-between px-4 py-2 text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100"
                  role="menuitem"
                >
                  Program Page
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-4"
                  >
                    <path
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a> -->
                <nuxt-link
                  to="/settings"
                  id="settings-dropdown"
                  class="block px-4 py-2 text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100"
                  role="menuitem"
                  >Settings</nuxt-link
                >
                <div
                  class="block px-4 py-2 text-sm text-gray-700 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100"
                  role="menuitem"
                  @click="handleLogout"
                >
                  Sign out
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import getUser from '@/composables/getUser'
import { vOnClickOutside } from '@vueuse/components'

const showFullSearch = ref(false)
const isSidebarOpen = ref(false)

// User
const { user } = getUser()

const handleLogout = () => {
  signOut(auth)
}

// Dropdown menu
const isAvatarMenuOpen = ref(false)

const hideAvatarMenu = () => {
  isAvatarMenuOpen.value = false
}
</script>

<!-- <script>
import ClickOutside from 'vue-click-outside'
import AutoSuggest from '@/components/AutoSuggest.vue'
import TheMobileSidebar from '@/components/TheMobileSidebar'

export default {
    components: {
        AutoSuggest,
        TheMobileSidebar
    },

    directives: {
        ClickOutside
    },

    data() {
        return {
            showFullSearch: false,
            isSidebarOpen: false,
            isAvatarMenuOpen: false
        }
    },

    watch: {
        '$route.path': function() {
            this.isSidebarOpen = false
            this.isAvatarMenuOpen = false
        }
    },

    computed: {
        activeUserInfo() {
            return this.$store.state.user
        },

        searchData() {
            const data = {
                Animals: {
                    key: 'name',
                    data: this.$store.state.animals
                }
            }
            return data
        }
    },

    methods: {
        hideAvatarMenu() {
            this.isAvatarMenuOpen = false
        },

        async logout() {
            try {
                await this.$store.dispatch('logout')
                // this.$router.push('/login')
            } catch (e) {
                console.log(e.message)
            }
        },

        selected(item) {
            if (item.Animals)
                this.$router.push(`/animal/view/${item.Animals.id}`)
            this.showFullSearch = false
        },

        hnd_search_query_update(query) {
            // Show overlay if any character is entered
            this.$store.commit('TOGGLE_CONTENT_OVERLAY', !!query)
        }
    },

    mounted() {
        // prevent click outside event with popupItem.
        this.popupItem = this.$el
    }
}
</script> -->
