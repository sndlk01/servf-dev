<!-- ReviewManagement.vue -->
<template>
    <v-app>
      <v-app-bar color="primary" dark app>
        <v-app-bar-nav-icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>จัดการรีวิว</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-title>เพิ่มรีวิว</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="addReview">
                    <v-text-field v-model="newReview.name" label="ชื่อผู้รีวิว" required></v-text-field>
                    <v-textarea v-model="newReview.content" label="เนื้อหารีวิว" required></v-textarea>
                    <v-btn type="submit" color="primary" block>เพิ่มรีวิว</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="8">
              <v-card>
                <v-card-title>
                  รีวิวทั้งหมด
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line
                    hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="reviews" :search="search" :items-per-page="5" :loading="loading">
                  <template v-slot:no-data>
                    ไม่พบข้อมูลรีวิว
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editReview(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteReview(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
  
          <!-- Edit Review Dialog -->
          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">แก้ไขรีวิว</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.name" label="ชื่อผู้รีวิว"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="editedItem.content" label="เนื้อหารีวิว"></v-textarea>
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
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const headers = [
    { title: 'ชื่อผู้รีวิว', align: 'start', key: 'name' },
    { title: 'เนื้อหารีวิว', key: 'content' },
    { title: 'วันที่สร้าง', key: 'createdAt' },
    { title: 'วันที่แก้ไขล่าสุด', key: 'updatedAt' },
    { title: 'การจัดการ', key: 'actions', sortable: false }
  ]
  
  const reviews = ref([])
  const loading = ref(true)
  const search = ref('')
  const editDialog = ref(false)
  const editedIndex = ref(-1)
  const editedItem = reactive({
    id: null,
    name: '',
    content: '',
    createdAt: '',
    updatedAt: ''
  })
  
  const newReview = reactive({
    name: '',
    content: ''
  })
  
  // จำลองการโหลดข้อมูลจาก API
  const fetchReviews = async () => {
    loading.value = true
    try {
      // จำลองการเรียก API
      await new Promise(resolve => setTimeout(resolve, 1000))
      reviews.value = [
        {
          id: 1,
          name: 'คุณ A',
          content: 'บริการดีมาก ประทับใจ',
          createdAt: '2024-09-20',
          updatedAt: '2024-09-20'
        },
        {
          id: 2,
          name: 'คุณ B',
          content: 'อาหารอร่อย บรรยากาศดี',
          createdAt: '2024-09-22',
          updatedAt: '2024-09-22'
        }
      ]
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchReviews()
  })
  
  const goBack = () => {
    router.push('/admin')
  }
  
  const addReview = () => {
    const review = {
      id: reviews.value.length + 1,
      ...newReview,
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }
    reviews.value.push(review)
    // Reset the form
    Object.assign(newReview, {
      name: '',
      content: ''
    })
  }
  
  const editReview = (item) => {
    editedIndex.value = reviews.value.indexOf(item)
    Object.assign(editedItem, item)
    editDialog.value = true
  }
  
  const deleteReview = (item) => {
    const index = reviews.value.indexOf(item)
    confirm('คุณแน่ใจหรือไม่ที่จะลบรีวิวนี้?') && reviews.value.splice(index, 1)
  }
  
  const closeEdit = () => {
    editDialog.value = false
    editedIndex.value = -1
    Object.assign(editedItem, {
      id: null,
      name: '',
      content: '',
      createdAt: '',
      updatedAt: ''
    })
  }
  
  const saveEdit = () => {
    if (editedIndex.value > -1) {
      Object.assign(reviews.value[editedIndex.value], {
        ...editedItem,
        updatedAt: new Date().toISOString().substr(0, 10)
      })
    }
    closeEdit()
  }
  </script>