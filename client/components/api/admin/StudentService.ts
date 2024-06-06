import BaseAPIService from '~/components/api/BaseAPIService'

class StudentService extends BaseAPIService {
    async getStudents(params: object): Promise<any> {
        return await this.request(`/students`, 'GET', params)
    }
     async getStudent(id: number): Promise<any> {
        return await this.request(`/students/${id}`, 'GET')
    }
    async addStudents(params: object): Promise<any> {
        return await this.request(`/students`, 'POST', params)
    }
    async deleteStudent(id: number): Promise<any> { 
        return await this.request(`/students/${id}`, 'DELETE') 
    }
    async updateStudent(id: number, params: object): Promise<any> {
        return await this.request(`/students/${id}`, 'PUT', params)
    }
}

export const studentService = new StudentService()