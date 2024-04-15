
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

export const CamaraComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = React.useState<string>('');
  const [photo, setPhoto] = React.useState<string>('');
  const classes = ['aceite', 'arroz', 'caja_de_leche', 'catsup', 'cloro', 'flan', 'frijol', 'huevos', 'jamon', 'mayonesa', 'pan_integral'];

  useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel('./src/assets/model_despensa_js/model.json');
      return model;
    };

    const runPrediction = async (model: tf.LayersModel) => {
      if (videoRef.current) {
        const image = tf.browser.fromPixels(videoRef.current);
        const resizedImage = tf.image.resizeBilinear(image, [64, 64]);
        const grayImage = resizedImage.mean(2).expandDims(2); 
        const reshapedImage = grayImage.reshape([1, 64, 64, 1]);
        const prediction = model.predict(reshapedImage) as tf.Tensor<tf.Rank>; 
        const labelIndex = prediction.argMax(-1).dataSync()[0];
        const labelName = classes[labelIndex];
        setLabel(labelName);
      }
    };

    loadModel().then(model => {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
            setInterval(() => runPrediction(model), 1000);
          })
          .catch(function (error) {
            console.log("Something went wrong!: "+error);
          });
      }
    });
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(videoRef.current, 0, 0, 64, 64);
      setPhoto(canvasRef.current.toDataURL('image/png'));
    }
  };

  return (
    <div className='flex justify-center items-center flex-col'>
      <video ref={videoRef} autoPlay />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="64" height="64" />
      <button onClick={takePhoto}>Take Photo</button>
      <h1 className="font-bold text-xl my-4">Product: {label}</h1>
      {photo && <img src={photo} alt="Captured" />}
    </div>
  );


};
