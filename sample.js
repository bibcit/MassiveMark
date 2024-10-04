const axios = require('axios');
let data = '## This is a header\n\nAnd this is a paragraph';

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://www.bibcit.com/api/mmark/mtoh',
  headers: { 
    'Content-Type': 'text/plain'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
