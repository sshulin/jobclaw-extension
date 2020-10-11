import React, { useState, useEffect } from 'react';
import PixelArt from '../core/pixel-art';

const PixelAnimation = ({palette, pixelDataList, ratio = 1}) => {

  const [animationState, setAnimationState] = useState(0);
  const [datetime, setDatetime] = useState(0);

  const setNextStage = () => {
    if(animationState < pixelDataList.length - 1) {
      setAnimationState(animationState + 1);
    } else {
      setAnimationState(0);
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setNextStage();
    }, 500);
    return () => {
      clearInterval(interval)
    };
  }, [animationState])

  return (            
    <PixelArt
      palette={palette}
      pixelData={pixelDataList[animationState]}
      ratio={ratio}
    />
  )
}

export default PixelAnimation;