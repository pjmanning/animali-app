<!-- <script setup></script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <TheSidebar @presentNotification="presentNotification" />
      </div>
    </div>

    <div class="flex flex-col flex-1 w-0 overflow-hidden">
      <TheSearchBar />

      <main
        class="relative z-0 flex-1 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <RouterView />
      </main>
    </div>
  </div>
</template> -->

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="fixed inset-0 z-40 flex md:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  type="button"
                  class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex items-center flex-shrink-0 px-4">
              <img
                class="w-auto h-8"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div class="flex-1 h-0 mt-5 overflow-y-auto">
              <nav class="px-2 space-y-1">
                <RouterLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.link"
                  :class="[
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                      'mr-4 h-6 w-6 flex-shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </RouterLink>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <!-- <div class="flex flex-col flex-1 min-h-0 bg-gray-800"> -->
      <div class="flex flex-col flex-grow pt-2 pb-4 overflow-y-auto bg-animali-900">
        <RouterLink to="/" id="logo" class="flex items-center flex-shrink-0 h-16 px-4 bg-primary">
          <img src="@/assets/images/logo.svg" class="w-auto h-8 mr-4" alt="Animali" />
          <h1 class="text-4xl font-medium font-national text-primary">Animali</h1>
        </RouterLink>
        <div class="flex flex-col flex-1 overflow-y-auto">
          <nav class="flex-1 px-2 py-4 space-y-1">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.link"
              :class="[
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                  'mr-3 h-6 w-6 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:pl-64">
      <div class="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt2Icon class="w-6 h-6" aria-hidden="true" />
        </button>
        <div class="flex justify-between flex-1 px-4">
          <div class="flex flex-1">
            <form class="flex w-full md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <SearchIcon class="w-5 h-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form>
          </div>
          <div class="flex items-center ml-4 md:ml-6">
            <button
              type="button"
              class="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="w-6 h-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem>
                    <RouterLink
                      to="/settings"
                      class="block px-4 py-2 text-sm text-gray-700 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </RouterLink>
                  </MenuItem>
                  <MenuItem>
                    <div
                      class="block px-4 py-2 text-sm text-gray-700 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100"
                      role="menuitem"
                      @click="handleLogout"
                    >
                      Sign out
                    </div>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="flex-1">
        <div class="py-6">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
            <RouterView />
            <!-- Replace with your content -->
            <!-- <div class="py-4">
              <div class="border-4 border-gray-200 border-dashed rounded-lg h-96" />
            </div> -->
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import {
  BellIcon,
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  PlusIcon,
} from '@heroicons/vue/outline'
import { SearchIcon } from '@heroicons/vue/solid'

const navigation = [
  { name: 'Dashboard', link: '/', icon: HomeIcon, current: true },
  { name: 'Animals', link: '/animals', icon: UsersIcon, current: false },
  { name: 'Map', link: '/map', icon: FolderIcon, current: false },
  { name: 'Add Encounter', link: '/add-encounter', icon: PlusIcon, current: false },
  { name: 'Settings', link: '/settings', icon: InboxIcon, current: false },
]

const sidebarOpen = ref(false)

/////////// User /////////////
const { user } = getUser()
const router = useRouter()

const handleLogout = () => {
  signOut(auth)
}

watchEffect(() => {
  if (!user.value) {
    console.log('no user')
    router.replace('/login')
  }
})
</script>
