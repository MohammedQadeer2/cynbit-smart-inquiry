import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export async function submitInquiry(inquiry) {
  const { data } = await api.post('/api/inquiries', inquiry)
  if (!data?.success) {
    throw new Error('The server did not confirm the inquiry was saved.')
  }
  return data
}
