import {useRef, useState} from 'react'
import { Director, Publish, View } from '@millicast/sdk';

const tokenGenerator = () => Director.getPublisher({
    token: '621bfca354d2ce378b99bd56cf754d8e1c9c51d6de90de3aa4d0d40b0d3a15d9', 
    streamName: 'demo-stream',
});

const publisher = new Publish('demo-stream', tokenGenerator);

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
    //     streamName: 'demo-stream',
    //     streamAccountId: 'vLasvj',
    //     // Optional: This token is needed if you're subscribing to a secure stream,
    //     // This token should be provided by the publish owner.
    //         subscriberToken: '85681c968c5dc7bef7a131bb82185c24a84bae40bbfa7985b8bacaaff979a5c2',
    //     });

    //     // Create Millicast instance
    //     const millicastView = new View('demo-stream', tokenGenerator,videoRef.current);
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
        {isStreaming && <iframe src="https://viewer.millicast.com?streamId=vLasvj/demo-stream&muted=true&disableSettings=true" allowFullScreen width="640" height="480"></iframe>}
        

    </div>
 )
}

export default Publisher;
