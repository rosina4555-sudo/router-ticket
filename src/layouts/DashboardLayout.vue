<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue'
import DashboardHeader from '../components/dashboard/DashboardHeader.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="flex h-screen bg-ink-navy text-white overflow-hidden">
    <!-- Sidebar -->
    <DashboardSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main content area -->
    <div class="flex flex-col flex-1 min-w-0">
      <DashboardHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="flex-1 overflow-y-auto p-4 sm:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
