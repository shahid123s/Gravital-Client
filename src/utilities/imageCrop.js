
// export default async function getCroppedImg(imageSrc, crop) {
//     const image = await createImage(imageSrc);
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
  
//     // Set the size of the canvas to the size of the cropped area
//     canvas.width = crop.width;
//     canvas.height = crop.height;
  
//     // Draw the cropped image onto the canvas
//     ctx.drawImage(
//       image,
//       crop.x,
//       crop.y,
//       crop.width,
//       crop.height,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );
  
//     return new Promise((resolve, reject) => {
//       canvas.toBlob((blob) => {
//         if (!blob) {
//           console.error('Canvas is empty');
//           return;
//         }
//         resolve(blob); // Return the cropped image as a Blob
//       }, 'image/jpeg');
//     });
//   }
  
//   // Helper function to create an Image object from a URL
//   function createImage(url) {
//     return new Promise((resolve, reject) => {
//       const image = new Image();
//       image.src = url;
//       image.onload = () => resolve(image);
//       image.onerror = reject;
//     });
//   }



const setCanvasPreview = (image, canvas, crop) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }

  const pixelRatio = window.devicePixelRatio || 1;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  if (!crop || crop.width <= 0 || crop.height <= 0) {
    throw new Error('Invalid crop dimensions');
  }

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};

export default setCanvasPreview;