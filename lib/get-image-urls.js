import fs from 'fs';

export default function getImageUrls() {
  return fs.readdirSync(__dirname+'/../assets/images');
}
