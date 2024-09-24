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
              <v-data-table :headers="headers" :items="blogs" :search="search" :items-per-page="5">
                <template v-slot:item.image="{ item }">
                  <v-img :src="item.image" max-width="100" max-height="100" contain></v-img>
                </template>
                <template v-slot:item.link="{ item }">
                  <a :href="item.link" target="_blank">{{ item.link }}</a>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editBlog(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteBlog(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
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
                    <v-file-input v-model="editedItem.imageFile" label="อัปโหลดรูปภาพใหม่" accept="image/*"
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const headers = [
  { title: 'ชื่อบล็อก', align: 'start', key: 'title' },
  { title: 'รูปภาพ', key: 'image' },
  { title: 'ลิงก์', key: 'link' },
  { title: 'วันที่สร้าง', key: 'createdAt' },
  { title: 'วันที่แก้ไขล่าสุด', key: 'updatedAt' },
  { title: 'การจัดการ', key: 'actions', sortable: false }
]

const blogs = ref([
  {
    id: 1,
    title: 'บล็อกแรกของเรา',
    content: 'เนื้อหาบล็อกแรก...',
    image: 'https://picsum.photos/200',
    link: 'https://example.com/blog1',
    createdAt: '2024-09-20',
    updatedAt: '2024-09-21'
  },
  {
    id: 2,
    title: 'เคล็ดลับการท่องเที่ยว',
    content: 'เนื้อหาเกี่ยวกับการท่องเที่ยว...',
    image: 'https://picsum.photos/201',
    link: 'https://example.com/blog2',
    createdAt: '2024-09-22',
    updatedAt: '2024-09-22'
  }
])

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

const goBack = () => {
  router.push('/admin') // Assuming '/' is the path to your dashboard
}

const uploadImage = async (file) => {
  // This is a mock function. In a real application, you would send the file to your server.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulating a random image URL returned from the server
      resolve(`https://picsum.photos/${Math.floor(Math.random() * 1000)}`)
    }, 1000)
  })
}

const addBlog = async () => {
  let imageUrl = ''
  if (newBlog.imageFile) {
    imageUrl = await uploadImage(newBlog.imageFile)
  }

  const blog = {
    id: blogs.value.length + 1,
    title: newBlog.title,
    content: newBlog.content,
    image: imageUrl,
    link: newBlog.link,
    createdAt: new Date().toISOString().substr(0, 10),
    updatedAt: new Date().toISOString().substr(0, 10)
  }
  blogs.value.push(blog)
  // Reset the form
  Object.assign(newBlog, {
    title: '',
    content: '',
    imageFile: null,
    link: ''
  })
}

const editBlog = (item) => {
  editedIndex.value = blogs.value.indexOf(item)
  editedItem.id = item.id
  editedItem.title = item.title
  editedItem.content = item.content
  editedItem.imageFile = null // Reset file input
  editedItem.link = item.link
  editedItem.createdAt = item.createdAt
  editedItem.updatedAt = item.updatedAt
  editDialog.value = true
}

const deleteBlog = (item) => {
  const index = blogs.value.indexOf(item)
  confirm('คุณแน่ใจหรือไม่ที่จะลบบล็อกนี้?') && blogs.value.splice(index, 1)
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

const saveEdit = async () => {
  if (editedIndex.value > -1) {
    let imageUrl = blogs.value[editedIndex.value].image // Keep the existing image if not changed
    if (editedItem.imageFile) {
      imageUrl = await uploadImage(editedItem.imageFile)
    }

    Object.assign(blogs.value[editedIndex.value], {
      ...editedItem,
      image: imageUrl,
      updatedAt: new Date().toISOString().substr(0, 10)
    })
  }
  closeEdit()
}
</script>