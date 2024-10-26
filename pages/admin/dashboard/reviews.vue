<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>จัดการรีวิว</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container>
        <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

        <v-row>
          <v-col cols="12" md="4">
            <v-card class="mb-4">
              <v-card-title class="headline">เพิ่มรีวิวใหม่</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="addReview">
                  <v-text-field v-model="newReview.name" label="ชื่อผู้รีวิว" required outlined dense></v-text-field>
                  <v-textarea v-model="newReview.review" label="เนื้อหารีวิว" required outlined auto-grow
                    rows="4"></v-textarea>
                  <v-btn type="submit" color="primary" block class="mt-4">
                    <v-icon left>mdi-plus</v-icon>
                    เพิ่มรีวิว
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="headline">
                รายการรีวิวทั้งหมด
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหารีวิว" single-line hide-details
                  outlined dense class="mt-4"></v-text-field>
              </v-card-title>

              <v-card-text>
                <div v-if="loading" class="text-center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
                <table v-else-if="filteredReviews.length > 0" class="review-table">
                  <thead>
                    <tr>
                      <th>ชื่อผู้รีวิว</th>
                      <th>เนื้อหารีวิว</th>
                      <th>การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="review in filteredReviews" :key="review.id">
                      <td>{{ review.name }}</td>
                      <td>{{ review.review }}</td>
                      <td>
                        <v-btn icon small @click="editReview(review)" class="mr-2">
                          <v-icon small color="primary">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon small @click="deleteReview(review)">
                          <v-icon small color="error">mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <v-alert v-else type="info" class="ma-2">ไม่พบข้อมูลรีวิว</v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Edit Review Dialog -->
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">แก้ไขรีวิว</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="editedItem.name" label="ชื่อผู้รีวิว" outlined dense></v-text-field>
                <v-textarea v-model="editedItem.review" label="เนื้อหารีวิว" outlined auto-grow rows="4"></v-textarea>
              </v-form>
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
import axios from 'axios'

const router = useRouter()
const config = useRuntimeConfig()
const API_URL = `${config.public.apiBase}/reviews`

const error = ref(null)
const reviews = ref([])
const loading = ref(true)
const search = ref('')
const editDialog = ref(false)
const editedIndex = ref(-1)
const editedItem = reactive({
  id: null,
  name: '',
  review: ''
})

const newReview = reactive({
  name: '',
  review: ''
})

const filteredReviews = computed(() => {
  return reviews.value.filter(review =>
    review.name.toLowerCase().includes(search.value.toLowerCase()) ||
    review.review.toLowerCase().includes(search.value.toLowerCase())
  )
})

const fetchReviews = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(API_URL)
    console.log('API Response:', response.data)
    reviews.value = response.data
  } catch (err) {
    console.error('Error fetching reviews:', err)
    error.value = 'ไม่สามารถโหลดข้อมูลรีวิวได้ กรุณาลองใหม่อีกครั้ง'
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

const addReview = async () => {
  try {
    const response = await axios.post(API_URL, newReview)
    reviews.value.push(response.data)
    Object.assign(newReview, { name: '', review: '' })
    // Add success notification
    alert('เพิ่มรีวิวสำเร็จ')
  } catch (err) {
    console.error('Error adding review:', err)
    error.value = 'ไม่สามารถเพิ่มรีวิวได้ กรุณาลองใหม่อีกครั้ง'
  }
}

const editReview = (item) => {
  editedIndex.value = reviews.value.indexOf(item)
  Object.assign(editedItem, item)
  editDialog.value = true
}

const deleteReview = async (item) => {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบรีวิวนี้?')) {
    try {
      await axios.delete(`${API_URL}/${item.id}`)
      reviews.value = reviews.value.filter(review => review.id !== item.id)
      alert('ลบรีวิวสำเร็จ')
    } catch (err) {
      console.error('Error deleting review:', err)
      error.value = 'ไม่สามารถลบรีวิวได้ กรุณาลองใหม่อีกครั้ง'
    }
  }
}

const closeEdit = () => {
  editDialog.value = false
  editedIndex.value = -1
  Object.assign(editedItem, { id: null, name: '', review: '' })
}

const saveEdit = async () => {
  if (editedIndex.value > -1) {
    try {
      const response = await axios.put(`${API_URL}/${editedItem.id}`, editedItem)
      Object.assign(reviews.value[editedIndex.value], response.data)
      closeEdit()
      // Add success notification
      alert('แก้ไขรีวิวสำเร็จ')
    } catch (err) {
      console.error('Error updating review:', err)
      error.value = 'ไม่สามารถแก้ไขรีวิวได้ กรุณาลองใหม่อีกครั้ง'
    }
  }
}
</script>

<style scoped>
.review-table {
  width: 100%;
  border-collapse: collapse;
}

.review-table th,
.review-table td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.review-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.review-table tr:hover {
  background-color: #f9f9f9;
}
</style>