<template>
    <div>
        <NuxtLayout name="admin">
            <Head>
                <Title>Students - {{ runtimeConfig.public.appName }}</Title>
            </Head>

            <div>
                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                <div class="table-responsive">
                    <Table :columnHeaders="state.columnHeaders" :data="state.students" :isLoading="state.isTableLoading"
                        :sortData="state.sortData" @sort="sort">
                        <template #body
                            v-if="!(state.isTableLoading || (state.students?.data && state.students?.data.length === 0))">
                            <tr v-for="(student, index) in state.students?.data" :key="index">
                                <td>
                                    <span class="truncate">{{ student.firstname + " " + student.lastname }}</span>
                                </td>
                                <td>
                                    <span>{{ student.course }}</span>
                                </td>
                                <td>
                                    <span>{{ student.birthday }}</span>
                                </td>
                                <td>
                                    <span>{{ student.age }}</span>
                                </td>
                                <td>
                                    <span>{{ student.allowance }}</span>
                                </td>
                                <td>
                                    <button class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" @click="editStudents(student.id)">Edit</button>
                                    <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2" @click="deleteStudent(student.id, index)">Delete</button>
                                </td>
                            </tr>
                        </template>
                    </Table>
                </div>
                <Pagination :data="state.students" @previous="previous" @next="next" />
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { studentService } from '@/components/api/admin/StudentService'

const runtimeConfig = useRuntimeConfig()
let currentTablePage = 1

const state = reactive({
    columnHeaders: [
        { name: 'Name', sorter: true, key: 'name' },
        { name: 'Course' },
        { name: 'Birthdate' },
        { name: 'Age' },
        { name: 'Allowance' },
        { name: '' },
    ],
    error: null,
    isTableLoading: false,
    sortData: {
        sortField: 'id',
        sortOrder: 'ascend',
    },
    students: [],
})

onMounted(() => {
    fetchStudents()
})

async function fetchStudents() {
    state.isTableLoading = true
    state.error = null
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        }
        const response = await studentService.getStudents(params)
        state.students = response
    } catch (error: any) {
        state.error = error
    }
    state.isTableLoading = false
}

function previous() {
    currentTablePage--
    fetchStudents()
}

function next() {
    currentTablePage++
    fetchStudents()
}

function sort(sortingData: any) {
    currentTablePage = 1
    state.sortData = {
        sortField: sortingData.column,
        sortOrder: sortingData.sort,
    }
    fetchStudents()
}

function handleFilter(value: any) {
    currentTablePage = 1
    state.dataFilter = value
    fetchStudents()
}

function editStudents(id: number) {
    fetchStudents()
    navigateTo(`/admin/students/edit?id=${id}`)
}

async function deleteStudent(id: number, index: number) {
  try {
    await studentService.deleteStudent(id)
    fetchStudents()
  } catch (error: any) {
    state.error = error
  }
}
</script>