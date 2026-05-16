import fs from 'fs';
import { extractImages } from 'unpdf';
import sharp from 'sharp';

async function main() {
  const pdfBuffer = fs.readFileSync("Emmanuel D'Rozario Portfolio.pdf");
  
  try {
    const uint8Array = new Uint8Array(pdfBuffer.buffer, pdfBuffer.byteOffset, pdfBuffer.byteLength);
    const images = await extractImages(uint8Array, 1);
    
    // We expect 1 image at least
    if (images.length > 0) {
      const img = images[0]; // Take the first image
      
      // Usually unpdf returns { data, width, height, channels } 
      // If the data is raw, we use sharp to convert it to a JPG
      await sharp(Buffer.from(img.data), {
        raw: {
          width: img.width,
          height: img.height,
          channels: img.channels || 3 // Default to 3 if not present
        }
      })
      .jpeg()
      .toFile('src/assets/prottoy-photo.jpg');

      console.log('Image successfully extracted and saved to src/assets/prottoy-photo.jpg');
    }
  } catch (err) {
    console.error("Extraction failed:", err);
  }
}

main();
