// const axios = require('axios');
import axios from 'axios';

export const createStream = async (streamName)=>{
    const data = {
        subscribeRequiresAuth: false,
        record: false,
        clip: false,
        multisource: true,
        enableThumbnails: false,
        displaySrtPassphrase: false,
        lowLatencyRtmp: true,
        streams: [{isRegex: true, streamName}],
        label: streamName
      }
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const res = await axios.post(proxyUrl+'https://api.millicast.com/api/publish_token',data,{
        headers:{
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer 5ccc30dcd621a370754ab6df2e49cf2db334a8bb97afbaff3416baeab70d1ab9'
        }
    })
    console.log("Response is : ",res)
}