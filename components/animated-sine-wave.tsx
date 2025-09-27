import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnnimateSineWave = () => {
  const [phase, setPhase] = useState(0);
  const amplitude = 50;
  const frequency = 0.05; 

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setPhase(prevPhase => prevPhase + 0.2); 
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  const generateSineWavePath = () => {
    let pathData = '';
    const numPoints = 100; 
    const width = 300; 
    const height = 200; 

    for (let i = 0; i <= numPoints; i++) {
      const x = (i / numPoints) * width;
      const y = height / 2 + amplitude * Math.sin(frequency * x + phase);

      if (i === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        pathData += `L ${x} ${y}`;
      }
    }
    return pathData;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={300} height={200}>
        <Path d={generateSineWavePath()} stroke="blue" strokeWidth={2} fill="none" />
      </Svg>
    </View>
  );
};

export default AnnimateSineWave;