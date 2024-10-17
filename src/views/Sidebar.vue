<template>
  <div class="bg-gray-100 z-10 flex items-center justify-center">
    <div class="bg-white w-64 rounded-3xl shadow-lg px-6 py-12">
      <div class="space-y-8 flex flex-col items-center">
        <img src="../../public/pdu_logo.png" alt="" />
        <div class="p-4 cursor-pointer" @click="selectItem('analyzer')">
          <img
            :class="selectedItem === 'analyzer' ? 'drop-shadow-md' : ''"
            class="mx-auto w-16 mb-4"
            src="../../public/image_analyzer_icon.png"
            alt=""
          />
          <span :class="selectedItem === 'analyzer' ? 'text-blue-500  font-semibold' : ''"
            >Image Analyzer</span
          >
        </div>
        <div class="p-4 cursor-pointer" @click="selectItem('realtime')">
          <img
            :class="selectedItem === 'realtime' ? 'drop-shadow-md' : ''"
            class="mx-auto w-16 mb-4"
            src="../../public/real_time_icon.png"
            alt=""
          />
          <span :class="selectedItem === 'realtime' ? 'text-blue-500 font-semibold' : ''"
            >Real-time Precision</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      selectedItem: null
    }
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item
    }
  }
}
</script>
