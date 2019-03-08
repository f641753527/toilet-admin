import crypto from 'crypto';

export default function getMD5(value) {
  const md5 = crypto.createHash('md5');
  md5.update(value);
  return md5.digest('hex');
}
