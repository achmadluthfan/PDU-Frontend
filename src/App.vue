<template>
  <div class="flex gap-x-16 bg-[#F9FAFE] pt-8 pb-16">
    <div>
      <Sidebar />
    </div>
    <div class="w-[80%] flex flex-col gap-y-8">
      <ImageAnalyzer />
      <RecentActivity />
      <LineChart />
    </div>
  </div>
</template>

<script>
import LineChart from './views/Report.vue'
import Sidebar from './views/Sidebar.vue'
import RecentActivity from './views/RecentActivity.vue'
import ImageAnalyzer from './views/ImageAnalyzer.vue'

export default {
  components: {
    Sidebar,
    LineChart,
    RecentActivity,
    ImageAnalyzer
  }
}
</script>
