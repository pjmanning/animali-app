<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex w-64 flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <!-- <TheSidebar @presentNotification="presentNotification" /> -->
      </div>
    </div>

    <!-- Search bar and main area -->
    <div class="flex w-0 flex-1 flex-col overflow-hidden">
      <TheSearchBar />

      <main
        class="relative z-0 flex-1 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <RouterView />
      </main>
    </div>
  </div>
</template>
