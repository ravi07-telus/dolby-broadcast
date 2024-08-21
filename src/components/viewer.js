// src/components/MillicastViewer.js
import React, { useEffect, useRef } from 'react';
import { Director, View } from '@millicast/sdk';

const MillicastViewer = ({ streamName }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let viewer;

    // Create callback to generate a new token
    const tokenGenerator = ()  => Director.getSubscriber({
        streamName,
        streamAccountId: 'vLasvj',
        // Optional: This token is needed if you're subscribing to a secure stream,
        // This token should be provided by the publish owner.
        subscriberToken: 'd01ee8e99104fa332bf0bae23429c81cff202fa49ecf694419d4ef7d23af90fe',
    });

    const startViewing = async () => {
      viewer = new View(streamName, tokenGenerator,videoRef.current);

      try {
        const stream = await viewer.connect();
        console.log("Streamin is : ",stream);
      } catch (err) {
        console.error('Error connecting to steam:', err);
      }
    };

    startViewing();

    return () => {
      if (viewer) {
        viewer.stop();
      }
    };
  }, [streamName]);

  return <video ref={videoRef} autoPlay controls style={{ width: '50%' }} />;
};

export default MillicastViewer;
