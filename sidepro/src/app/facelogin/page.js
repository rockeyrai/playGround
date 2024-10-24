'use client'
import React, { useEffect, useRef } from 'react'

const FaceRecognition = () => {
  const videoRef = useRef(null); // Create a ref for the video element

  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Use the ref to set the video source
        }
      } catch (error) {
        console.error('Error accessing camera: ', error);
      }
    };

     Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
      faceapi.nets.ageGenderNet.loadFromUri('./models'),
      faceapi.nets.faceExpressionNet.loadFromUri('./models'),
  ])

    startVideoStream();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <canvas className='absolute'></canvas>
      <div>
        <video ref={videoRef} className='h-[500px] w-[500px]' autoPlay></video> {/* Use the ref in the video element */}
      </div>
    </div>
  );
}

export default FaceRecognition;
