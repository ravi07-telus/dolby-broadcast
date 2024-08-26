import {useRef, useState} from 'react'
import { Director, Publish, View } from '@millicast/sdk';

const stName = process.env.REACT_APP_STREAM_NAME;
const accountId = process.env.REACT_APP_ACCOUNT_ID
const tokenGenerator = () => Director.getPublisher({
    token: process.env.REACT_APP_PUBLISHER_TOKEN, 
    streamName: stName,
});

const publisher = new Publish(stName, tokenGenerator);

const  Publisher = ()=>{
    const [streamName, setStreamName] = useState('');
    const [isStreaming,setIsStreaming]  = useState(false);
    const videoRef = useRef(null)

    const startStream = async ()=>{
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        // publisher
        // Publishing Options
        const publishOptions = {
            mediaStream: mediaStream,
        };

        // Start publishing a stream
        try {
            await publisher.connect(publishOptions);
            setIsStreaming(true);
            // viewStream()
        } catch (e) {
            console.error('Connection failed, handle error', e);
        }
    }


    // const viewStream = ()=>{
    //     // Create callback to generate a new token
    //     const tokenGenerator = ()  => Director.getSubscriber({
    //     streamName: stName,
    //     streamAccountId: process.env.REACT_APP_ACCOUNT_ID,
    //     // Optional: This token is needed if you're subscribing to a secure stream,
    //     // This token should be provided by the publish owner.
    //         subscriberToken: process.env.REACT_APP_SUBSCRIBER_TOKEN,
    //     });

    //     // Create Millicast instance
    //     const millicastView = new View(stName, tokenGenerator,videoRef.current);
    //     millicastView.connect();
    // }

    const stopStream = ()=>{
        publisher.stop()
        setIsStreaming(false);
    }

    return (
    <div>
        Broadcast
        <br />
        {/* <br />
        <input name={'streamName'} value={streamNamewi} placeholder='Enter Stream name' onChange={(e)=> setStreamName(e.target.value)}/> */}
        <button onClick={startStream}> Start Streaming</button>
        <button onClick={stopStream}> Stop Streaming</button>
        {/* <video ref={videoRef} autoPlay controls style={{width:'50%'}}></video> */}
        {isStreaming && <iframe src={`https://viewer.millicast.com?streamId=${accountId}/${stName}&muted=true&disableSettings=true`} allowFullScreen width="640" height="480"></iframe>}
        

    </div>
 )
}

export default Publisher;
