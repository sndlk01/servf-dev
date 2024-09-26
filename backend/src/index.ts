const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); 
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
const prisma = new PrismaClient();

const initializeAdminUser = async () => {
  const existingAdmin = await prisma.login.findUnique({
    where: { username: 'admin' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin1234', 10); 
    await prisma.login.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        user: {
          create: {
            fname: 'Admin',
            lname: 'User',
            email: 'admin@example.com',
          },
        },
      },
    });
  }
};

initializeAdminUser();

// Login route
app.post('/login', async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const userLogin = await prisma.login.findUnique({
      where: { username },
    });

    if (!userLogin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, userLogin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: userLogin });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Create a new Review
app.post('/reviews', async (req: any, res: any) => {
  const { name, review } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: { name, review },
    });
    res.json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a Review by ID
app.put('/reviews/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const { name, review } = req.body;

  try {
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { name, review },
    });
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});


// Get all Reviews
app.get('/reviews', async (req: any, res: any) => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get a Review by ID
app.get('/reviews/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});


app.delete('/reviews/:id', async (req: any, res: any) => {
  const { id } = req.params;
  console.log(`Attempting to delete review with id: ${id}`);
  try {
    const deletedReview = await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    console.log('Review deleted:', deletedReview); 
    res.json({ message: 'Review deleted successfully', deletedReview });
  } catch (error) {
    console.error('Error deleting review:', error);
    // res.status(500).json({ error: 'Failed to delete review', details: error.message });
  }
});

const UPLOAD_DIR = 'uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, UPLOAD_DIR);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// สร้าง route 
app.use(`/${UPLOAD_DIR}`, express.static(path.join(__dirname, UPLOAD_DIR)));

// ฟังก์ชันสำหรับแปลง file path เป็น URL
function getImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  const filename = path.basename(imagePath);
  return `/${UPLOAD_DIR}/${filename}`;
}

// ฟังก์ชันสำหรับบันทึก path ของรูปภาพ
function saveImagePath(file: Express.Multer.File | undefined): string | null {
  if (!file) {
    console.log('No file received in saveImagePath');
    return null;
  }
  console.log('Saving image path:', path.join(UPLOAD_DIR, file.filename));
  return path.join(UPLOAD_DIR, file.filename);
}

// สร้าง Blog พร้อมอัพโหลดรูปภาพ
app.post('/blogs', upload.single('image'), async (req: any, res: any) => {
  console.log('Received request body:', req.body);
  console.log('Received file:', req.file);
  try {
    if (!req.file) {
      console.log('No file uploaded');
    }

    const { title, content, link } = req.body;
    const imagePath = req.file ? saveImagePath(req.file) : null;

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        link,
        image: imagePath
      },
    });

    res.json({
      ...newBlog,
      imageUrl: getImageUrl(newBlog.image)
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    // res.status(500).json({ error: 'Failed to create blog', details: error.message });
  }
});

// อัพเดต Blog อัพโหลดรูปภาพใหม่ 
app.put('/blogs/:id', upload.single('image'), async (req: any, res: any) => {
  const { id } = req.params;
  const { title, content, link } = req.body;
  const newImagePath = saveImagePath(req.file);

  try {
    const existingBlog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
    if (existingBlog?.image && newImagePath) {
      const oldImagePath = path.join(__dirname, existingBlog.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        link,
        ...(newImagePath && { image: newImagePath })
      },
    });
    res.json({
      ...updatedBlog,
      imageUrl: getImageUrl(updatedBlog.image)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Get a Blog by ID
app.get('/blogs/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({
      ...blog,
      imageUrl: getImageUrl(blog.image)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Get all Blogs
app.get('/blogs', async (req: any, res: any) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.json(blogs.map((blog: any) => ({
      ...blog,
      imageUrl: getImageUrl(blog.image)
    })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Delete a Blog
app.delete('/blogs/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
    if (blog?.image) {
      const imagePath = path.join(__dirname, blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await prisma.blog.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
