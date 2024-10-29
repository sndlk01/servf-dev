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
                    <v-file-input v-model="editedItem.imageFile" label="อัปโหลดรูปภาพ" accept="image/*"
                      prepend-icon="mdi-camera"></v-file-input>
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
import { ref, reactive, onMounted, computed, watch } from 'vue'

const router = useRouter()
const config = useRuntimeConfig()
const API_URL = `${config.public.apiBase}`

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

watch(() => newBlog.imageFile, (newVal) => {
  if (newVal) {
    console.log('File selected:', newVal.name)
  } else {
    console.log('No file selected')
  }
})

const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_URL}/blogs`)
    const data = await response.json()
    blogs.value = data.map(blog => ({
      ...blog,
      image: `${API_URL}${blog.imageUrl}`
    }))
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }
}

onMounted(fetchBlogs)

const filteredBlogs = computed(() => {
  return blogs.value.filter(blog =>
    blog.title.toLowerCase().includes(search.value.toLowerCase()) ||
    blog.content.toLowerCase().includes(search.value.toLowerCase())
  )
})

const goBack = () => {
  router.push('/admin')
}

// Add a new blog
const addBlog = async () => {
  let formData = new FormData();
  formData.append('title', newBlog.title);
  formData.append('content', newBlog.content);
  formData.append('link', newBlog.link);

  if (Array.isArray(newBlog.imageFile) && newBlog.imageFile.length > 0) {
    const imageFile = newBlog.imageFile[0];
    if (imageFile instanceof File) {
      formData.append('image', imageFile, imageFile.name);
    }
  }

  try {
    const response = await fetch(`${API_URL}/blogs`, { 
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const responseData = await response.json();
      blogs.value.push(responseData);
      Object.assign(newBlog, {
        title: '',
        content: '',
        imageFile: null,
        link: ''
      });
      alert('บล็อกถูกเพิ่มเรียบร้อยแล้ว');
      window.location.reload();
    } else {
      const errorText = await response.text();
      alert(`Failed to add blog: ${errorText}`);
    }
  } catch (error) {
    alert(`Failed to add blog: ${error.message}`);
  }
};


const editBlog = (item) => {
  editedIndex.value = blogs.value.indexOf(item)
  Object.assign(editedItem, item)
  editDialog.value = true
}

const deleteBlog = async (item) => {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบบล็อกนี้?')) {
    try {
      await fetch(`${API_URL}/blogs/${item.id}`, {
        method: 'DELETE'
      })
      const index = blogs.value.indexOf(item)
      blogs.value.splice(index, 1)
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }
}

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
    let formData = new FormData()
    formData.append('title', editedItem.title)
    formData.append('content', editedItem.content)
    formData.append('link', editedItem.link)

    if (Array.isArray(editedItem.imageFile) && editedItem.imageFile.length > 0) {
      const imageFile = editedItem.imageFile[0]; 
      if (imageFile instanceof File) {
        formData.append('image', imageFile, imageFile.name);
        console.log('Image file added:', imageFile.name);
      } else {
        console.log('No valid image file selected');
      }
    } else if (editedItem.imageFile instanceof File) {
      formData.append('image', editedItem.imageFile, editedItem.imageFile.name);
      console.log('Image file added:', editedItem.imageFile.name);
    } else {
      console.log('No file selected for update');
    }

    // Debug: แสดงข้อมูลใน formData
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    try {
      const response = await fetch(`${API_URL}/blogs/${editedItem.id}`, {
        method: 'PUT',
        body: formData
      })

      if (response.ok) {
        const updatedBlog = await response.json()
        Object.assign(blogs.value[editedIndex.value], updatedBlog)
        closeEdit()
        alert('บล็อกถูกอัปเดตเรียบร้อยแล้ว')
        await fetchBlogs() // รีเฟรชข้อมูลบล็อกทั้งหมด
      } else {
        const errorData = await response.json()
        throw new Error(`Failed to update blog: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      alert(`เกิดข้อผิดพลาดในการอัปเดตบล็อก: ${error.message}`)
    }
  }
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