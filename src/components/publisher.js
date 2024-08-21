import {useState} from 'react'
import { Director, Publish } from '@millicast/sdk';
import { createStream } from '../Apis';
import MillicastViewer from './viewer';

const tokenGenerator = () => Director.getPublisher({
    token: '621bfca354d2ce378b99bd56cf754d8e1c9c51d6de90de3aa4d0d40b0d3a15d9', 
    streamName: 'demo-stream',
});

const publisher = new Publish('demo-stream', tokenGenerator);

const  Publisher = ()=>{
    const [streamName, setStreamName] = useState('');
    const [isStreaming,setIsStreaming]  = useState(false);

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
        } catch (e) {
            console.error('Connection failed, handle error', e);
        }
    }

    return (
    <div>
        Broadcast
        <br />
        {/* <br />
        <input name={'streamName'} value={streamName} placeholder='Enter Stream name' onChange={(e)=> setStreamName(e.target.value)}/> */}
        <button onClick={startStream}> Start Streaming</button>
        <button onClick={()=> createStream('stream-name1')}>Create Stream</button>
        {isStreaming && <MillicastViewer streamName={'demo-stream'}/>}
    </div>
 )
}

export default Publisher;
