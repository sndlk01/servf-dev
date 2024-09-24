<!-- BlogManagement.vue -->
<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>จัดการบล็อก</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>เพิ่มบล็อก</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="addBlog">
                  <v-text-field v-model="newBlog.title" label="ชื่อบล็อก" required></v-text-field>
                  <v-textarea v-model="newBlog.content" label="เนื้อหา" required></v-textarea>
                  <v-file-input v-model="newBlog.imageFile" label="อัปโหลดรูปภาพ" accept="image/*"
                    prepend-icon="mdi-camera"></v-file-input>
                  <v-text-field v-model="newBlog.link" label="ลิงก์"></v-text-field>
                  <v-btn type="submit" color="primary" block>เพิ่มบล็อก</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title>
                บล็อกทั้งหมด
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
                  hide-details></v-text-field>
              </v-card-title>
              <v-card-text>
                <table class="blog-table">
                  <thead>
                    <tr>
                      <th>ชื่อบล็อก</th>
                      <th>รูปภาพ</th>
                      <th>ลิงก์</th>
                      <th>การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="blog in filteredBlogs" :key="blog.id">
                      <td>{{ blog.title }}</td>
                      <td>
                        <v-img :src="blog.image" max-width="100" max-height="100" contain></v-img>
                      </td>
                      <td>
                        <a :href="blog.link" target="_blank">{{ blog.link }}</a>
                      </td>
                      <td>
                        <v-icon small class="mr-2" @click="editBlog(blog)">
                          mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteBlog(blog)">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Edit Blog Dialog -->
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">แก้ไขบล็อก</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.title" label="ชื่อบล็อก"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.content" label="เนื้อหา"></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input v-model="newBlog.imageFile" label="อัปโหลดรูปภาพ" accept="image/*"
                      prepend-icon="mdi-camera" @change="handleFileChange"></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.link" label="ลิงก์"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEdit">ยกเลิก</v-btn>
              <v-btn color="blue darken-1" text @click="saveEdit">บันทึก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const blogs = ref([])
const search = ref('')
const editDialog = ref(false)
const editedIndex = ref(-1)
const editedItem = reactive({
  id: null,
  title: '',
  content: '',
  imageFile: null,
  link: '',
  createdAt: '',
  updatedAt: ''
})

const newBlog = reactive({
  title: '',
  content: '',
  imageFile: null,
  link: ''
})

// Handle file selection and assign it correctly
const handleFileChange = (file) => {
  editedItem.imageFile = file; // Ensure this refers to editedItem
  console.log('File selected:', file);
}

// Fetch blogs from the database
const fetchBlogs = async () => {
  try {
    const response = await fetch('http://localhost:8000/blogs')
    const data = await response.json()
    blogs.value = data.map(blog => ({
      ...blog,
      image: `http://localhost:8000${blog.imageUrl}`
    }))
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }
}

onMounted(fetchBlogs)

// Filter blogs based on search input
const filteredBlogs = computed(() => {
  return blogs.value.filter(blog =>
    blog.title.toLowerCase().includes(search.value.toLowerCase()) ||
    blog.content.toLowerCase().includes(search.value.toLowerCase())
  )
})

const goBack = () => {
  router.push('/admin')
}

// Function to upload image
const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    return data.imageUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    return ''
  }
}

const addBlog = async () => {
  let formData = new FormData();
  formData.append('title', newBlog.title);
  formData.append('content', newBlog.content);
  formData.append('link', newBlog.link);
  
  if (newBlog.imageFile) {
    formData.append('image', newBlog.imageFile);
  }

  console.log('FormData contents:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await fetch('http://localhost:8000/blogs', {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);
    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to add blog');
    }

    blogs.value.push(responseData);
    
    Object.assign(newBlog, {
      title: '',
      content: '',
      imageFile: null,
      link: ''
    });

    alert('บล็อกถูกเพิ่มเรียบร้อยแล้ว');

  } catch (error) {
    console.error('Error adding blog:', error);
    alert(`เกิดข้อผิดพลาดในการเพิ่มบล็อก: ${error.message}`);
  }
};

// Edit an existing blog
const editBlog = (item) => {
  editedIndex.value = blogs.value.indexOf(item)
  Object.assign(editedItem, item)
  editDialog.value = true
}

// Delete a blog post
const deleteBlog = async (item) => {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบบล็อกนี้?')) {
    try {
      await fetch(`http://localhost:8000/blogs/${item.id}`, {
        method: 'DELETE'
      })
      const index = blogs.value.indexOf(item)
      blogs.value.splice(index, 1)
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }
}

// Close edit dialog and reset fields
const closeEdit = () => {
  editDialog.value = false
  editedIndex.value = -1
  Object.assign(editedItem, {
    id: null,
    title: '',
    content: '',
    imageFile: null,
    link: '',
    createdAt: '',
    updatedAt: ''
  })
}

// Save changes to an edited blog post
const saveEdit = async () => {
  if (editedIndex.value > -1) {
    let imageUrl = blogs.value[editedIndex.value].image;
    if (editedItem.imageFile) {
      imageUrl = await uploadImage(editedItem.imageFile);
    }

    const updatedBlog = {
      ...editedItem,
      image: imageUrl
    }

    try {
      const response = await fetch(`http://localhost:8000/blogs/${updatedBlog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBlog)
      })
      const data = await response.json()
      Object.assign(blogs.value[editedIndex.value], data)
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }
  closeEdit()
}
</script>


<style scoped>
.blog-table {
  width: 100%;
  border-collapse: collapse;
}

.blog-table th,
.blog-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.blog-table th {
  background-color: #f2f2f2;
}

.blog-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.blog-table tr:hover {
  background-color: #f5f5f5;
}
</style>