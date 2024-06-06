<template>
  <div>
    <button @click="navigateTo('/admin/students')" class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
      Back
    </button>
    <div v-if="state.isLoading" class="text-center py-4">Loading...</div>
    <div v-if="state.error" class="text-center py-4 text-red-500">{{ state.error }}</div>
    <div v-if="!state.isLoading && !state.error">
      <div class="space-y-4">
        <div class="flex items-center">
          <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
        </div>
        <input type="text" id="firstname" name="firstname" autocomplete="given-name" v-model="state.student.firstname" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <div class="space-y-4">
        <div class="flex items-center">
          <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
        </div>
        <input type="text" id="lastname" name="lastname" autocomplete="given-name" v-model="state.student.lastname" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <div class="space-y-4">
        <div class="flex items-center">
          <label for="course" class="block text-sm font-medium text-gray-700">Course</label>
        </div>
        <input type="text" id="course" name="course" autocomplete="given-name" v-model="state.student.course" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <div class="space-y-4">
        <div class="flex items-center">
          <label for="birthday" class="block text-sm font-medium text-gray-700">Birthday</label>
        </div>
        <FormDateField v-model="state.student.birthday" id="birthdate" name="birthdate" placeholder="Birthdate" />
      </div>
      <div class="space-y-4">
        <div class="flex items-center">
          <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
        </div>
        <input type="text" id="age" name="age" autocomplete="given-name" v-model="state.student.age" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <div class="space-y-4">
        <div class="flex items-center">
          <label for="allowance" class="block text-sm font-medium text-gray-700">Allowance</label>
        </div>
        <input type="text" id="allowance" name="allowance" autocomplete="given-name" v-model="state.student.allowance" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>
      <div>
        <button @click="updateForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Update</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { studentService } from '@/components/api/admin/StudentService'

const route = useRoute()
const router = useRouter()

const state = ref({
  student: {
    firstname: '',
    lastname: '',
    course: '',
    birthday: '',
    age: '',
    allowance: '',
  },
  isLoading: false,
  error: null,
})

async function fetchStudent(studentId: number) {
  state.value.isLoading = true
  state.value.error = null
  try {
    const response = await studentService.getStudent(studentId)
    state.value.student = response
  } catch (error: any) {
    state.value.error = error.message
  }
  state.value.isLoading = false
}

async function updateForm() {
  try {
    const studentId = route.params.id
    await studentService.updateStudent(parseInt(studentId), state.value.student)
    router.push('/admin/students')
    alert('Successfully Saved')
  } catch (error: any) {
    console.error(error)
  }
}

onMounted(() => {
  const studentId = route.params.id
  if (studentId) {
    fetchStudent(studentId)
  }
})
</script>
