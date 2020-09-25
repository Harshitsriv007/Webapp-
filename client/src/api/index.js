
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertQuiz = payload => api.post(`/quiz`, payload)
export const getAllQuizs = () => api.get(`/quizs`)
export const getQuizById = id => api.get(`/quiz/${id}`)

const apis = {
    insertQuiz,
    getAllQuizs,
    getQuizById,
}

export default apis

