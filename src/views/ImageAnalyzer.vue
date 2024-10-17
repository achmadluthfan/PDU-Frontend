<template>
  <div class="w-full">
    <div class="w-full">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-red-500">Image Analyzer</h1>
        <button class="text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      <div class="bg-white rounded-[35px] xl:h-80 shadow-lg overflow-hidden">
        <div class="flex flex-col md:flex-row h-full">
          <div class="w-full md:w-[46%] p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <div class="flex flex-col items-center justify-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                UPLOAD
              </button>
              <p class="text-sm text-gray-500 mt-2">JPEG, JPG, PNG | Max 500KB</p>
            </div>
          </div>
          <div class="w-full md:w-[54%] p-6 flex flex-col items-center justify-center">
            <h2 class="text-lg font-semibold mb-4">RESULT</h2>
            <p class="text-gray-500">No information available yet</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageAnalyzer'
}
</script>
