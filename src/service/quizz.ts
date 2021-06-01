import axios, { AxiosInstance, AxiosError } from 'axios'

const API_HOST = 'http://localhost:3000'

export const QuizzService = {
  addMessage: (msg): Promise<any> => {
    const apiClient = axios.create({
      baseURL: '',
    })

    return apiClient
      .get(`${API_HOST}/api/quizz`, { params: { 'message': msg }} )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.resolve(error))
  }
}
