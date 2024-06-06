<template>
  <div>
    <button @click="navigateTo('/admin/students')" class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
      Back
    </button>
    <div class="space-y-4">
      <div class="flex items-center">
        <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
      </div>
      <input type="text" id="firstname" name="firstname" autocomplete="given-name" v-model="student.firstname" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
    </div>
    <div class="space-y-4">
      <div class="flex items-center">
        <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
      </div>
      <input type="text" id="lastname" name="lastname" autocomplete="given-name" v-model="student.lastname" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
    </div>
    <div class="space-y-4">
      <div class="flex items-center">
        <label for="course" class="block text-sm font-medium text-gray-700">Course</label>
      </div>
      <input type="text" id="course" name="course" autocomplete="given-name" v-model="student.course" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
    </div>
    <div class="space-y-4">
      <div class="flex items-center">
        <label for="birthday" class="block text-sm font-medium text-gray-700">Birthday</label>
      </div>
      <FormDateField  v-model="student.birthday"  id="birthdate" name="birthdate" placeholder="Birthdate"/>
    </div>
    <div class="space-y-4">
      <div class="flex items-center">
        <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
      </div>
      <input type="text" id="age" name="age" autocomplete="given-name" v-model="student.age" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
    </div>
    <div class="space-y-4">
      <div class="flex items-center">
        <label for="allowance" class="block text-sm font-medium text-gray-700">Allowance</label>
      </div>
      <input type="text" id="allowance" name="allowance" autocomplete="given-name" v-model="student.allowance" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
    </div>
    <div>
      <button @click="submitForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Register</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { studentService } from '@/components/api/admin/StudentService'

const student = ref({
  firstname: '',
  lastname: '',
  course: '',
  birthday: '',
  age: '',
  allowance: '',
})

async function submitForm() {
  try {
    await studentService.addStudents(student.value)
    navigateTo('/admin/students')
    alert('Sucessfuly Saved');
  } catch (error: any) {
    console.error(error)
  }
}
</script>
