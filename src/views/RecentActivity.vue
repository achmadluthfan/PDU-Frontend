<template>
  <div class="mx-auto w-full">
    <h2 class="text-2xl font-bold text-red-500 mb-4">Recent Activity</h2>
    <div class="rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 text-left">
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(activity, index) in activities" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img class="h-10 w-10 rounded-full" :src="activity.image" :alt="activity.name" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ activity.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ activity.time }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': activity.status === 'Finished',
                  'bg-blue-100 text-blue-800': activity.status === 'In Progress',
                  'bg-yellow-100 text-yellow-800': activity.status === 'Pending'
                }"
              >
                {{ activity.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 text-center">
      <button class="text-blue-600 hover:text-blue-800 font-medium">Show More</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentActivity',
  data() {
    return {
      activities: [
        {
          name: 'Image 7',
          time: '10:30 AM',
          status: 'Finished',
          image: '/placeholder.svg?height=40&width=40'
        },
        {
          name: 'Image 8',
          time: '10:30 AM',
          status: 'In Progress',
          image: '/placeholder.svg?height=40&width=40'
        },
        {
          name: 'Image 9',
          time: '10:30 AM',
          status: 'Pending',
          image: '/placeholder.svg?height=40&width=40'
        },
        {
          name: 'Image 10',
          time: '10:30 AM',
          status: 'Pending',
          image: '/placeholder.svg?height=40&width=40'
        },
        {
          name: 'Image 11',
          time: '10:30 AM',
          status: 'Pending',
          image: '/placeholder.svg?height=40&width=40'
        }
      ]
    }
  }
}
</script>
