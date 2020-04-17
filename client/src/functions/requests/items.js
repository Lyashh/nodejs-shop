import axios from 'axios'

export const Pagination = (page, limit) => {
    return axios.get(`/products/${page}/${limit}`)
}