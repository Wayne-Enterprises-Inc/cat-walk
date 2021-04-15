import axios from 'axios'

import { API_KEY } from '../../config.js'

axios.defaults.headers.common['Authorization'] = API_KEY // for all requests

const CAMPUS_CODE = 'hr-rfe'

var requests = {
  pullProducts: `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}/products`,
  pullReviews: `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}/reviews`,
  pullCart: `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}/cart`
}

export default requests;