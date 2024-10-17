<template>
  <div class="p-6 relative">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-red-500">Report</h1>
      <div class="space-x-4">
        <button
          @click="exportToCSV"
          class="px-4 py-2 text-[#0671E0] bg-[#EAEAEA] rounded transition duration-300"
        >
          Export as CSV
        </button>
        <button
          class="px-4 py-2 text-[#0671E0] bg-[#EAEAEA] rounded transition duration-300"
          @click="toggleSortMenu"
        >
          Sort
        </button>
        <div
          v-if="isSortMenuVisible"
          class="absolute right-0 mt-2 w-[50%] bg-white rounded-lg shadow-lg border"
        >
          <h3 class="font-semibold mb-2">From</h3>
          <div class="mb-4 flex gap-x-6">
            <input
              type="date"
              v-model="fromDate"
              class="w-full px-2 py-1 text-[#7D7D7D] focus:outline-none rounded-lg bg-[#D7E7F7]"
            />
            <input
              type="time"
              v-model="fromTime"
              class="w-full px-2 py-1 text-[#7D7D7D] focus:outline-none rounded-lg bg-[#D7E7F7]"
            />
          </div>
          <h3 class="font-semibold mb-2">To</h3>
          <div class="mb-4 flex gap-x-6">
            <input
              type="date"
              v-model="toDate"
              class="w-full px-2 py-1 text-[#7D7D7D] focus:outline-none rounded-lg bg-[#D7E7F7]"
            />
            <input
              type="time"
              v-model="toTime"
              class="w-full px-2 py-1 text-[#7D7D7D] focus:outline-none rounded-lg bg-[#D7E7F7]"
            />
          </div>
          <div class="">
            <button class="px-4 py-2 mr-3 text-[#0671E0] bg-[#EAEAEA] rounded" @click="clearSort">
              Clear
            </button>
            <button class="px-4 py-2 text-[#0671E0] bg-[#EAEAEA] rounded ]" @click="applySort">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="p-6 rounded-[35px] bg-white shadow-lg">
      <h2 class="text-xl font-semibold mb-4">{{ displayedDate }}</h2>
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
// import { updateChart, clearSort } from '@/lib/chart/utils'
import { updateChart } from '@/lib/chart/utils'

const dataPoints = ref([
  { date: '2024-10-08', time: '00:00', percentage: 10 },
  { date: '2024-10-08', time: '00:30', percentage: 40 },
  { date: '2024-10-08', time: '01:15', percentage: 70 },
  { date: '2024-10-08', time: '01:45', percentage: 20 },
  { date: '2024-10-08', time: '02:10', percentage: 80 },
  { date: '2024-10-08', time: '03:00', percentage: 30 },
  { date: '2024-10-08', time: '03:45', percentage: 90 },
  { date: '2024-10-08', time: '04:30', percentage: 50 },
  { date: '2024-10-08', time: '05:00', percentage: 40 },
  { date: '2024-10-08', time: '05:20', percentage: 60 },
  { date: '2024-10-08', time: '06:00', percentage: 20 },
  { date: '2024-10-08', time: '06:30', percentage: 80 },
  { date: '2024-10-08', time: '07:10', percentage: 10 },
  { date: '2024-10-08', time: '07:45', percentage: 70 },
  { date: '2024-10-08', time: '08:15', percentage: 90 },
  { date: '2024-10-08', time: '09:00', percentage: 30 },
  { date: '2024-10-08', time: '09:30', percentage: 60 },
  { date: '2024-10-08', time: '10:10', percentage: 50 },
  { date: '2024-10-08', time: '10:45', percentage: 40 },
  { date: '2024-10-08', time: '11:00', percentage: 80 },
  { date: '2024-10-08', time: '11:30', percentage: 20 },
  { date: '2024-10-08', time: '12:10', percentage: 90 },
  { date: '2024-10-08', time: '12:45', percentage: 30 },
  { date: '2024-10-08', time: '13:15', percentage: 50 },
  { date: '2024-10-08', time: '14:00', percentage: 40 },
  { date: '2024-10-08', time: '14:30', percentage: 60 },
  { date: '2024-10-08', time: '15:15', percentage: 70 },
  { date: '2024-10-08', time: '15:45', percentage: 10 },
  { date: '2024-10-08', time: '16:10', percentage: 30 },
  { date: '2024-10-08', time: '17:00', percentage: 90 },
  { date: '2024-10-08', time: '17:30', percentage: 20 },
  { date: '2024-10-08', time: '18:10', percentage: 80 },
  { date: '2024-10-08', time: '18:45', percentage: 50 },
  { date: '2024-10-08', time: '19:15', percentage: 40 },
  { date: '2024-10-08', time: '20:00', percentage: 60 },
  { date: '2024-10-08', time: '20:30', percentage: 10 },
  { date: '2024-10-08', time: '21:10', percentage: 30 },
  { date: '2024-10-08', time: '21:45', percentage: 70 },
  { date: '2024-10-08', time: '22:30', percentage: 20 },
  { date: '2024-10-08', time: '23:15', percentage: 90 },
  { date: '2024-10-08', time: '23:59', percentage: 40 },

  { date: '2024-10-09', time: '00:30', percentage: 60 },
  { date: '2024-10-09', time: '01:00', percentage: 20 },
  { date: '2024-10-09', time: '01:45', percentage: 90 },
  { date: '2024-10-09', time: '02:10', percentage: 50 },
  { date: '2024-10-09', time: '03:00', percentage: 40 },
  { date: '2024-10-09', time: '03:45', percentage: 80 },
  { date: '2024-10-09', time: '04:30', percentage: 30 },
  { date: '2024-10-09', time: '05:15', percentage: 70 },
  { date: '2024-10-09', time: '06:00', percentage: 60 },
  { date: '2024-10-09', time: '06:45', percentage: 10 },
  { date: '2024-10-09', time: '07:10', percentage: 90 },
  { date: '2024-10-09', time: '08:00', percentage: 20 },
  { date: '2024-10-09', time: '08:30', percentage: 50 },
  { date: '2024-10-09', time: '09:15', percentage: 40 },
  { date: '2024-10-09', time: '10:00', percentage: 80 },
  { date: '2024-10-09', time: '10:30', percentage: 30 },
  { date: '2024-10-09', time: '11:10', percentage: 60 },
  { date: '2024-10-09', time: '12:00', percentage: 70 },
  { date: '2024-10-09', time: '12:45', percentage: 10 },
  { date: '2024-10-09', time: '13:30', percentage: 90 },
  { date: '2024-10-09', time: '14:10', percentage: 50 },
  { date: '2024-10-09', time: '15:00', percentage: 40 },
  { date: '2024-10-09', time: '15:45', percentage: 80 },
  { date: '2024-10-09', time: '16:30', percentage: 20 },
  { date: '2024-10-09', time: '17:15', percentage: 30 },
  { date: '2024-10-09', time: '18:00', percentage: 60 },
  { date: '2024-10-09', time: '18:45', percentage: 70 },
  { date: '2024-10-09', time: '19:30', percentage: 10 },
  { date: '2024-10-09', time: '20:10', percentage: 30 },
  { date: '2024-10-09', time: '21:00', percentage: 50 },
  { date: '2024-10-09', time: '21:45', percentage: 80 },
  { date: '2024-10-09', time: '22:30', percentage: 90 }
])

const chartRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d')
    if (ctx) {
      // Extract labels (date + time) and percentages
      const latestDate = dataPoints.value.reduce((latest, point) => {
        return new Date(point.date) > new Date(latest) ? point.date : latest
      }, dataPoints.value[0].date)

      // Filter dataPoints untuk hanya menyertakan data pada tanggal terbaru
      const filteredDataPoints = dataPoints.value.filter((point) => point.date === latestDate)

      // Ambil label (time) dan persentase dari data yang sudah difilter
      const labels = filteredDataPoints.map((point) => ` ${point.time}`)
      const percentages = filteredDataPoints.map((point) => point.percentage)

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels, // X axis labels (combined date and time)
          datasets: [
            {
              label: 'Percentage',
              data: percentages, // Y axis data (percentage values)
              borderColor: '#7987FF',
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#7987FF'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
                callback: function (value) {
                  return value + '%'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
    }
  }
})

const isSortMenuVisible = ref(false)
const now = new Date()

const fromDate = ref(now.toISOString().split('T')[0]) // Mendapatkan tanggal dalam format YYYY-MM-DD
const fromTime = ref('00:00')
const toDate = ref(fromDate.value)
const toTime = ref('23:59')

// Toggle the sort menu visibility
const toggleSortMenu = () => {
  isSortMenuVisible.value = !isSortMenuVisible.value
}

const applySort = () => {
  // Gabungkan tanggal dan waktu pengguna menjadi objek Date
  const fromDateTime = new Date(`${fromDate.value}T${fromTime.value}`)
  const toDateTime = new Date(`${toDate.value}T${toTime.value}`)

  // Filter dataPoints berdasarkan range dari fromDateTime sampai toDateTime
  const filteredData = dataPoints.value.filter((point) => {
    const pointDateTime = new Date(`${point.date}T${point.time}`)
    return pointDateTime >= fromDateTime && pointDateTime <= toDateTime
  })

  // Setelah filter, tutup menu sort
  isSortMenuVisible.value = false

  // Update chart
  updateChart(chartRef, filteredData)
}

// Clear the sort inputs
const clearSort = () => {
  fromDate.value = dataPoints.value.reduce((latest, point) => {
    return new Date(point.date) > new Date(latest) ? point.date : latest
  }, dataPoints.value[0].date)
  fromTime.value = '00:00'
  toDate.value = fromDate.value
  toTime.value = '23:59'

  isSortMenuVisible.value = false
  updateChart(
    chartRef,
    dataPoints.value.filter((point) => point.date === fromDate.value)
  )
}

const displayedDate = computed(() => {
  const dateOptions = {
    weekday: 'long' as const,
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const
  }
  const defaultDateTime = dataPoints.value.reduce((latest, point) => {
    return new Date(point.date) > new Date(latest) ? point.date : latest
  }, dataPoints.value[0].date)
  const fromDateTime = new Date(`${fromDate.value}T${fromTime.value}`)
  const toDateTime = new Date(`${toDate.value}T${toTime.value}`)

  // If both dates are the same, display that date
  if (fromDate.value === toDate.value) {
    return new Date(defaultDateTime).toLocaleDateString('en-US', dateOptions)
  } else {
    return `${fromDateTime.toLocaleDateString('en-US', dateOptions)} - ${toDateTime.toLocaleDateString('en-US', dateOptions)}`
  }
})

const exportToCSV = () => {
  const csvContent = generateCSV(
    dataPoints.value.map((dp) => ({ date: dp.date, value: dp.percentage }))
  )
  downloadCSV(csvContent, 'data.csv')
}

const generateCSV = (data: Array<{ date: string; value: number }>) => {
  const headers = ['Date', 'Percentage']
  const rows = data.map((dp) => [dp.date, dp.value])
  const csv = [headers, ...rows]
    .map((row) => row.join(';')) // Join each row by commas
    .join('\n') // Separate rows by new lines

  return csv
}

const downloadCSV = (csvContent: string, fileName: string) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', fileName)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return {
    dataPoints,
    displayedDate,
    exportToCSV
  }
}
</script>

<style scoped></style>
