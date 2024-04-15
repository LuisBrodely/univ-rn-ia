
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import axiosInstanceRN from '../api/axiosInstanceRN';
import { Button, Chip } from '@nextui-org/react';
import useProductStore from '../store/store';

export const CamaraComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = React.useState<string>('');
  const [photo, setPhoto] = React.useState<string>('');
  const classes = ['aceite', 'arroz', 'caja_de_leche', 'catsup', 'cloro', 'flan', 'frijol', 'huevos', 'jamon', 'mayonesa', 'pan_integral'];

  const { setProductClass, productClass, product } = useProductStore();


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

  useEffect(() => {  
    if (photo) {
      console.log(photo)
      uploadPhoto();
    }
  }, [photo]);

    const uploadPhoto = async () => {
      try {
        const formData = new FormData();
        formData.append('image', dataURItoBlob(photo), 'image.png');
    
        const response = await axiosInstanceRN.post('/images/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        const productClass = response.data.data;
        setProductClass(productClass);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
    
    const dataURItoBlob = (dataURI: string): Blob => {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: mimeString });
    };
  

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(videoRef.current, 0, 0, 64, 64);
      setPhoto(canvasRef.current.toDataURL('image/png'));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-5">
        <Chip color="success" size="lg" className='ml-2' variant="dot">Producto detectado {label}</Chip>
      </div>
      <video ref={videoRef} autoPlay />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="64" height="64" />
      <Button color="secondary" onClick={takePhoto} variant="flat" fullWidth className='mt-4'>
        Tomar foto
      </Button>
      {photo && productClass && 
        <div className='mt-6 flex gap-5 justify-center items-center'>
          <img src={photo} alt="Captured" className='w-56'/>
          <div>
            <h2 className="font-bold text-5xl mb-3">{productClass}</h2>
            <Chip color="secondary" size="sm" className="w-80" variant="dot">{product.description}</Chip>
            <h3 className="mt-3 text-sm text-slate-300">{product.details}</h3>
          </div>
        </div>
      }
    </div>
  );


};
