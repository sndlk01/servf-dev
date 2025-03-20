import * as ohash from 'ohash';

// เพิ่มฟังก์ชัน diff ที่หายไป
export const diff = (a, b) => {
  const result = {};
  for (const key in b) {
    if (a[key] !== b[key]) {
      result[key] = b[key];
    }
  }
  return result;
};

// ส่งออกทุกอย่างจาก ohash
export * from 'ohash';