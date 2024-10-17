import Chart from 'chart.js/auto'
import { Ref } from 'vue'

interface DataPoint {
  date: string
  time: string
  percentage: number
}

export const updateChart = (chartRef: Ref<HTMLCanvasElement>, filteredData: DataPoint[]) => {
  // Ubah label dan data chart berdasarkan filteredData
  const labels = filteredData.map((point) => point.time)
  const data = filteredData.map((point) => point.percentage)
  const chartInstance = chartRef.value ? Chart.getChart(chartRef.value) : null // Ambil instance chart yang sudah ada
  if (chartRef.value) {
    const chartInstance = Chart.getChart(chartRef.value) // Ambil instance chart yang sudah ada
    if (chartInstance) {
      chartInstance.data.labels = labels
      chartInstance.data.datasets[0].data = data
      chartInstance.update()
    }
  }
}

export const clearSort = (
  fromDate: any,
  fromTime: any,
  toDate: any,
  toTime: any,
  dataPoints: any,
  isSortMenuVisible: any,
  chartRef: any
) => {
  // console.log(dataPoints.value)
  fromDate.value = dataPoints.reduce((latest, point) => {
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
