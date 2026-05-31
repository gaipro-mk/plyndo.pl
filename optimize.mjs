import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = path.join(process.cwd(), 'public');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

async function processImages() {
  const files = getAllFiles(directoryPath);
  const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png)$/i));

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const newFile = file.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    
    console.log(`Optimizing ${file} -> ${newFile}`);
    try {
      await sharp(file)
        .webp({ quality: 80, effort: 6 })
        .toFile(newFile);
      
      // Delete original file
      fs.unlinkSync(file);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  console.log('All images optimized.');
}

processImages();
