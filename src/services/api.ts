import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://doctor-care-spring.herokuapp.com/pacients',
})
