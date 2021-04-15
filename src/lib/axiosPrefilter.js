import axios from 'axios'

import {API_KEY} from '../../config.js'

axios.defaults.headers.common['Authorization'] = API_KEY // for all requests

const CAMPUS_CODE = 'hr-rfe'

var pullProducts = `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}/products`




// $.ajaxPrefilter(function (settings, _, jqXHR) {
//   jqXHR.setRequestHeader('Authorization', API_KEY);
// });
// //{ key, query, max = 5 }
// var searchYouTube = (options, callback) => {
//   $.get('https://www.googleapis.com/youtube/v4/search', {
//     part: 'snippet',
//     key: options.key,
//     q: options.query,
//     maxResults: options.max,
//     type: 'video',
//     videoEmbeddable: 'true'
//   })
//     .done(({ items }) => {
//       if (callback) {
//         callback(items);
//       }
//     })
//     .fail(({ responseJSON }) => {
//       responseJSON.error.forEach((err) => console.error(err));
//     });
// };

export default pullProducts