import React from 'react';

const PixelArt = ({palette, pixelData, ratio = 1}) => {
  const height = pixelData.length;
  const width = pixelData[0].length;

  return (
    <div className="pixel-art" style={{
      position: 'relative',
      width: width * ratio,
      height: height * ratio
    }}>
      {
        pixelData.map((row, rowIndex) => {
          return (
            row.map((col, colIndex) => {
              return (palette.hasOwnProperty(col)) ? (
                <div
                  key={''+rowIndex+colIndex}
                  style={{
                    background: palette[col],
                    left: (100*colIndex)/width + '%',
                    top: (100*rowIndex)/height + '%',
                    position: 'absolute',
                    height: (100/height) + '%', 
                    width: (100/width) + '%'
                  }}
                  >
                </div>
              ) : ''
            })
          )
        })
      }
    </div>
  )
}

export default PixelArt;