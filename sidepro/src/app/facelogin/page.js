'use client';
import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js'; // Import the face-api.js library

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const run = async () => {
    // Load the models
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
      faceapi.nets.ageGenderNet.loadFromUri('./models'),
      faceapi.nets.faceExpressionNet.loadFromUri('./models'),
    ]);

    // Access the video stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    // Set up the canvas
    const canvas = canvasRef.current;
    canvas.width = 500; // Set canvas width
    canvas.height = 500; // Set canvas height

    // Start the detection loop after metadata is loaded
    videoRef.current.addEventListener('loadedmetadata', startDetection);
  };

  const startDetection = () => {
    const canvas = canvasRef.current;
    const faceMatcher = createFaceMatcher(); // Ensure this is called in the right scope

    setInterval(async () => {
      if (videoRef.current && videoRef.current.videoWidth && videoRef.current.videoHeight) {
        const faceAIData = await faceapi.detectAllFaces(videoRef.current)
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withAgeAndGender()
          .withFaceExpressions();

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        const resizedFaceData = faceapi.resizeResults(faceAIData, videoRef.current);
        faceapi.draw.drawDetections(canvas, resizedFaceData);
        // faceapi.draw.drawFaceLandmarks(canvas, resizedFaceData);
        faceapi.draw.drawFaceExpressions(canvas, resizedFaceData);

        drawFaceData(resizedFaceData, canvas, faceMatcher);
      }
    }, 500);
  };

  const createFaceMatcher = async () => {
    const refFace = await faceapi.fetchImage('https://www.facebook.com/photo.php?fbid=2327738390734835&set=pb.100004960894048.-2207520000&type=3');
    const refFaceAiData = await faceapi.detectAllFaces(refFace).withFaceLandmarks().withFaceDescriptors();
    return new faceapi.FaceMatcher(refFaceAiData);
  };

  const drawFaceData = (faceAIData, canvas, faceMatcher) => {
    faceAIData.forEach(face => {
      const { age, gender, genderProbability, detection, descriptor } = face;
      const genderText = `${gender} - ${Math.round(genderProbability * 100) / 100}`; // Use backticks for template literals
      const ageText = `${Math.round(age)} years`; // Use backticks for template literals
      const textField = new faceapi.draw.DrawTextField([genderText, ageText], face.detection.box.topRight);
      textField.draw(canvas);
  
      if (faceMatcher) {
        const label = faceMatcher.findBestMatch(descriptor).toString();
        const options = label.includes("unknown") ? { label: "Unknown subject..." } : { label: "Rockey" };
        const drawBox = new faceapi.draw.DrawBox(detection.box, options);
        drawBox.draw(canvas);
      }
    });
  };

  useEffect(() => {
    run(); // Start the video and face detection
  }, []); // Run once on mount

  return (
    <div>
      <canvas ref={canvasRef} className='absolute' />
      <div>
      <video ref={videoRef}  autoPlay width={500} height={375} />
      </div>
    </div>
  );
}

export default FaceRecognition;

