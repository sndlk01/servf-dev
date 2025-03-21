<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Team } from '@/_mockApis/custom-components/index';

// ข้อมูลประเภทบริการ (Categories)
const serviceCategories = ref([
  { id: 1, name: 'Marketing', icon: 'mdi-bullhorn' },
  { id: 2, name: 'Finance', icon: 'mdi-cash' },
  { id: 3, name: 'Design', icon: 'mdi-palette' },
  { id: 4, name: 'Languages', icon: 'mdi-translate' },
  { id: 5, name: 'Law', icon: 'mdi-scale-balance' },
  { id: 6, name: 'Innovation and Technology', icon: 'mdi-robot' },
  { id: 7, name: 'Activity', icon: 'mdi-heart-pulse' },
]);

const servfiesWithCategories = ref([
  { ...Team[0], categoryId: 1 },
  { ...Team[1], categoryId: 1 },
  { ...Team[2], categoryId: 1 },
  { ...Team[3], categoryId: 1 },
  { ...Team[4], categoryId: 1 },

  { ...Team[5], categoryId: 2 },
  { ...Team[6], categoryId: 2 },
  { ...Team[7], categoryId: 2 },
  { ...Team[8], categoryId: 2 },
  { ...Team[9], categoryId: 2 },

  { ...Team[10], categoryId: 3 },
  { ...Team[11], categoryId: 3 },

  { ...Team[12], categoryId: 4 },
  { ...Team[13], categoryId: 4 },
  { ...Team[14], categoryId: 4 },

  { ...Team[15], categoryId: 5 },

  { ...Team[16], categoryId: 6 },
  { ...Team[17], categoryId: 6 },
  { ...Team[18], categoryId: 6 },
  { ...Team[19], categoryId: 6 },

  { ...Team[20], categoryId: 7 },
  { ...Team[21], categoryId: 7 },
  { ...Team[22], categoryId: 7 },
  { ...Team[23], categoryId: 7 },
  { ...Team[24], categoryId: 7 },
  { ...Team[25], categoryId: 7 },
  { ...Team[26], categoryId: 7 },
  { ...Team[27], categoryId: 7 },

]);

// State สำหรับขั้นตอนการจอง
const currentStep = ref(1);
interface Category {
  id: number;
  name: string;
  icon: string;
}

const selectedCategory = ref<Category | null>(null);
interface Servfy {
  title: string;
  subtitle: string;
  img: string;
  categoryId: number;
}

const selectedServfy = ref<Servfy | null>(null);
const bookingDate = ref('');
const bookingTime = ref({
  start: '',
  end: ''
});
const consultType = ref(''); // 'online' หรือ 'onsite'
const locationDetails = ref({
  place: '',
  location: { lat: 0, lng: 0 }
});

// สำหรับ tab ในการจอง
const bookingTab = ref('day');

// ข้อมูลผู้จอง
const customerInfo = ref({
  name: '',
  phone: '',
  email: '',
  note: ''
});

// สถานที่นัดพบ (mockup)
const meetingPlaces = ref([
  { id: 1, name: 'KKBS', address: 'คณะบริหารธุรกิจและการบัญชี มหาวิทยาลัยขอนแก่น' },
  { id: 2, name: 'KKBS Cafe', address: 'คาเฟ่ในคณะบริหารธุรกิจและการบัญชี' },
  { id: 3, name: 'KKBS Studio', address: 'สตูดิโอในคณะบริหารธุรกิจและการบัญชี' }
]);

// กรองรายชื่อ Servfies ตามหมวดหมู่ที่เลือก
const filteredServfies = computed(() => {
  if (!selectedCategory.value) {
    return servfiesWithCategories.value;
  }
  return servfiesWithCategories.value.filter(servfy =>
    selectedCategory.value?.id !== undefined && servfy.categoryId === selectedCategory.value.id
  );
});

// เตรียมวันที่สำหรับ calendar
const currentMonth = ref(new Date());
const daysInMonth = computed(() => {
  const year = currentMonth.value.getFullYear();
  const month = currentMonth.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  // ปรับให้วันแรกเป็นวันจันทร์ (0 = จันทร์, 6 = อาทิตย์)
  const adjFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  let dayCounter = 1;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < adjFirstDay) || dayCounter > daysInMonth) {
        week.push(null);
      } else {
        week.push(dayCounter++);
      }
    }
    days.push(week);
    if (dayCounter > daysInMonth) break;
  }

  return days;
});

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentMonthName = computed(() => {
  return `${monthNames[currentMonth.value.getMonth()]} ${currentMonth.value.getFullYear()}`;
});

// ฟังก์ชันสำหรับการนำทาง
const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1);
};

const prevMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1);
};

// ฟังก์ชันสำหรับการเลือกวันที่
const selectDate = (day: any) => {
  if (!day) return;
  const selectedDate = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day);
  bookingDate.value = selectedDate.toISOString().split('T')[0];
  // ถ้าเลือกวันที่แล้วให้ไปที่ขั้นตอนการเลือกเวลา
  bookingTab.value = 'time';
};

// ฟังก์ชันสำหรับการเปลี่ยนขั้นตอน
const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
    // ถ้าไปที่ขั้นตอนที่ 2 ให้เริ่มที่การเลือกวันที่
    if (currentStep.value === 2) {
      bookingTab.value = 'day';
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// ฟังก์ชันสำหรับการส่งข้อมูลไปยัง Line OA
const submitBooking = () => {
  // สร้างข้อความที่จะส่งไป Line OA
  const servfyName = selectedServfy.value ? selectedServfy.value.title : '';
  const categoryName = selectedCategory.value ? selectedCategory.value.name : '';

  let consultTypeText = '';
  if (consultType.value === 'online') {
    consultTypeText = 'ออนไลน์';
  } else if (consultType.value === 'onsite') {
    consultTypeText = 'พบที่สถานที่';
  }

  // จัดรูปแบบวันที่ให้สวยงาม
  const formattedDate = bookingDate.value ? new Date(bookingDate.value).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  // สร้างข้อความสำหรับส่งไป Line OA
  const message = `
SERVF - คำขอจองใหม่
ประเภทบริการ: ${categoryName}
Servfy: ${servfyName}
วันที่: ${formattedDate}
เวลา: ${bookingTime.value.start} - ${bookingTime.value.end} น.
รูปแบบ: ${consultTypeText}
สถานที่: ${locationDetails.value.place}
ผู้จอง: ${customerInfo.value.name}
เบอร์โทร: ${customerInfo.value.phone}
อีเมล: ${customerInfo.value.email}
หมายเหตุ: ${customerInfo.value.note}
  `.trim();

  // URL สำหรับส่งข้อความไปยัง Line OA
  const lineOaUrl = `https://line.me/R/oaMessage/@842vmgfm/?${encodeURIComponent(message)}`;

  // เปิดหน้าต่างใหม่เพื่อส่งข้อความ
  window.open(lineOaUrl, '_blank');
};

// ช่วงเวลาที่เลือกได้
const timeSlots = ref([
  { start: '09.00', end: '10.00' },
  { start: '10.00', end: '11.00' },
  { start: '11.00', end: '12.00' },
  { start: '13.00', end: '14.00' },
  { start: '14.00', end: '15.00' },
  { start: '15.00', end: '16.00' },
  { start: '16.00', end: '17.00' }
]);

// เลือกช่วงเวลา
const selectTimeSlot = (slot: any) => {
  bookingTime.value = slot;
  // ถ้าเลือกช่วงเวลาแล้วให้ไปที่ขั้นตอนการเลือกรูปแบบการให้คำปรึกษา
  bookingTab.value = 'consults';
};

// สำหรับการเลือกวันใน calendar
const isToday = (day: any) => {
  if (!day) return false;
  const today = new Date();
  return (
    day === today.getDate() &&
    currentMonth.value.getMonth() === today.getMonth() &&
    currentMonth.value.getFullYear() === today.getFullYear()
  );
};

const isSelectedDate = (day: any) => {
  if (!day || !bookingDate.value) return false;
  const selectedDate = new Date(bookingDate.value);
  return (
    day === selectedDate.getDate() &&
    currentMonth.value.getMonth() === selectedDate.getMonth() &&
    currentMonth.value.getFullYear() === selectedDate.getFullYear()
  );
};

const isDayDisabled = (day: any) => {
  if (!day) return true;
  const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// เมื่อเลือกประเภทการให้คำปรึกษาเสร็จ
const consultSelected = () => {
  nextStep();
};

// สำหรับแสดงข้อมูลที่เลือกในขั้นตอนสุดท้าย
const formatDate = (dateString: any) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// ฟังก์ชันสำหรับการเลือกหมวดหมู่
const selectCategory = (category: any) => {
  if (selectedCategory.value && selectedCategory.value.id === category.id) {
    // ถ้าคลิกหมวดหมู่ที่เลือกอยู่แล้ว ให้ยกเลิกการเลือก
    selectedCategory.value = null;
  } else {
    selectedCategory.value = category;
  }
};

// ฟังก์ชันสำหรับการเลือก Servfy
const selectServfy = (servfy: any) => {
  selectedServfy.value = servfy;
  nextStep();
};

// ดึงชื่อหมวดหมู่จาก ID
const getCategoryName = (categoryId: any) => {
  const category = serviceCategories.value.find(cat => cat.id === categoryId);
  return category ? category.name : '';
};
</script>

<template>

  <div id="team">

    <div class="header-gradient">
      <h1 class="header-title" style="color: #ffedb9;">Find your Servfies</h1>
    </div>

    <div class="booking-container">
      <!-- Step 1: เลือกประเภทบริการและ Servfy -->
      <div v-if="currentStep === 1">
        <!-- เลือกประเภทบริการ -->
        <div class="category-selection">
          <button v-for="category in serviceCategories" :key="category.id"
            :class="{ 'category-selected': selectedCategory && selectedCategory.id === category.id }"
            class="category-btn" @click="selectCategory(category)">
            <!-- <i class="material-icons category-icon">{{ category.icon.replace('mdi-', '') }}</i> -->
            {{ category.name }}
          </button>
        </div>

        <!-- แสดง Servfies -->
        <div class="servfies-grid">
          <div v-for="servfy in filteredServfies" :key="servfy.title" class="servfy-card">
            <div class="servfy-profile">
              <img :src="servfy.img" alt="servfy profile" class="profile-image" />
              <h3 class="servfy-name">{{ servfy.title }}</h3>
              <div class="rating">
                <i v-for="n in 5" :key="n" class="material-icons star-icon">star</i>
              </div>
              <button class="booking-btn" @click="selectServfy(servfy)">
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: เลือกวันที่ เวลา และรูปแบบการให้คำปรึกษา -->
      <div v-else-if="currentStep === 2" class="booking-step">
        <!-- แสดงข้อมูล Servfy ที่เลือก -->
        <div class="selected-servfy">
          <div class="servfy-info">
            <img :src="selectedServfy?.img" alt="servfy profile" class="profile-small" />
            <div class="servfy-details">
              <h2 class="servfy-name">{{ selectedServfy?.title }}</h2>
              <p>{{ getCategoryName(selectedServfy?.categoryId) }}</p>
              
              <!-- <p class="servfy-position">{{ selectedServfy?.subtitle }}</p> -->
              <div class="rating-2">
                <i v-for="n in 5" :key="n" class="material-icons star-icon small">star</i>
                <span class="rating-text">(5.0)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs สำหรับขั้นตอนการจอง -->
        <div class="booking-tabs">
          <div class="tab-header">
            <div class="tab-item" :class="{ 'active-tab': bookingTab === 'day' }" @click="bookingTab = 'day'">
              <i class="material-icons tab-icon">calendar_today</i>
              <span>Booking Day</span>
              <small>เลือกวันที่</small>
            </div>
            <div class="tab-item" :class="{ 'active-tab': bookingTab === 'time' }" @click="bookingTab = 'time'">
              <i class="material-icons tab-icon">access_time</i>
              <span>Booking Time</span>
              <small>เลือกเวลา</small>
            </div>
            <div class="tab-item" :class="{ 'active-tab': bookingTab === 'consults' }" @click="bookingTab = 'consults'">
              <i class="material-icons tab-icon">chat</i>
              <span>Consults</span>
              <small>เลือกรูปแบบ</small>
            </div>
          </div>

          <!-- เนื้อหาของแต่ละ Tab -->
          <div class="tab-content">
            <!-- Tab 1: เลือกวันที่ -->
            <div v-if="bookingTab === 'day'" class="day-selector">
              <div class="month-selector">
                <button class="nav-btn" @click="prevMonth">
                  <i class="material-icons">chevron_left</i>
                </button>
                <h3 class="current-month">{{ currentMonthName }}</h3>
                <button class="nav-btn" @click="nextMonth">
                  <i class="material-icons">chevron_right</i>
                </button>
              </div>

              <div class="calendar">
                <div class="calendar-header">
                  <div class="calendar-cell">MON</div>
                  <div class="calendar-cell">TUE</div>
                  <div class="calendar-cell">WED</div>
                  <div class="calendar-cell">THU</div>
                  <div class="calendar-cell">FRI</div>
                  <div class="calendar-cell">SAT</div>
                  <div class="calendar-cell">SUN</div>
                </div>

                <div v-for="(week, weekIndex) in daysInMonth" :key="weekIndex" class="calendar-row">
                  <div v-for="(day, dayIndex) in week" :key="dayIndex" class="calendar-cell" :class="{
                    'is-today': isToday(day),
                    'is-selected': isSelectedDate(day),
                    'is-disabled': isDayDisabled(day)
                  }" @click="!isDayDisabled(day) && selectDate(day)">
                    {{ day }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 2: เลือกเวลา -->
            <div v-if="bookingTab === 'time'" class="time-selector">
              <div class="time-slots">
                <div class="time-row">
                  <div v-for="slot in timeSlots" :key="`${slot.start}-${slot.end}`" class="time-slot"
                    :class="{ 'selected-slot': bookingTime.start === slot.start }" @click="selectTimeSlot(slot)">
                    <div class="slot-button">
                      <div class="slot-time">{{ slot.start }} - {{ slot.end }}</div>
                      <div class="slot-label">น.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 3: เลือกรูปแบบการให้คำปรึกษา -->
            <div v-if="bookingTab === 'consults'" class="consult-selector">
              <div class="consult-options">
                <div class="consult-option" :class="{ 'selected-option': consultType === 'online' }"
                  @click="consultType = 'online'">
                  <div class="option-content">Online</div>
                </div>
                <div class="consult-option" :class="{ 'selected-option': consultType === 'onsite' }"
                  @click="consultType = 'onsite'">
                  <div class="option-content">Onsite</div>
                </div>
              </div>

              <!-- แสดงตัวเลือกสถานที่ถ้าเลือก Onsite -->
              <div v-if="consultType === 'onsite'" class="location-selector">
                <div v-for="place in meetingPlaces" :key="place.id" class="location-option"
                  :class="{ 'selected-location': locationDetails.place === place.name }"
                  @click="locationDetails.place = place.name">
                  <div class="location-content">
                    <div class="location-name">{{ place.name }}</div>
                    <div class="location-address">{{ place.address }}</div>
                  </div>
                </div>
              </div>

              <!-- ปุ่มดำเนินการต่อ -->
              <div class="action-buttons">
                <button class="back-btn" @click="prevStep">
                  <i class="material-icons">arrow_back</i>
                  Back
                </button>
                <button class="next-btn" @click="consultSelected"
                  :disabled="!consultType || (consultType === 'onsite' && !locationDetails.place)">
                  Next
                  <i class="material-icons">arrow_forward</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: กรอกข้อมูลผู้จอง -->
      <div v-else-if="currentStep === 3" class="booking-step">
        <!-- แสดงข้อมูล Servfy ที่เลือก -->
        <div class="selected-servfy">
          <div class="servfy-info">
            <img :src="selectedServfy?.img" alt="servfy profile" class="profile-small" />
            <div class="servfy-details">
              <h2 class="servfy-name">{{ selectedServfy?.title }}</h2>
              <p class="servfy-position">{{ selectedServfy?.subtitle }}</p>
              <div class="rating">
                <i v-for="n in 5" :key="n" class="material-icons star-icon small">star</i>
                <span class="rating-text">(5.0)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- สรุปข้อมูลการจอง -->
        <div class="booking-summary">
          <div class="summary-row">
            <div class="summary-item">
              <i class="material-icons summary-icon">calendar_today</i>
              <div class="summary-detail">
                <div class="summary-label">Booking Day</div>
                <div class="summary-value">{{ formatDate(bookingDate) }}</div>
              </div>
            </div>

            <div class="summary-item">
              <i class="material-icons summary-icon">access_time</i>
              <div class="summary-detail">
                <div class="summary-label">Booking Time</div>
                <div class="summary-value">{{ bookingTime.start }} - {{ bookingTime.end }} น.</div>
              </div>
            </div>

            <div class="summary-item">
              <i class="material-icons summary-icon">chat</i>
              <div class="summary-detail">
                <div class="summary-label">Consults</div>
                <div class="summary-value">{{ consultType === 'online' ? 'Online' : 'Onsite' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ฟอร์มข้อมูลผู้จอง -->
        <div class="customer-form">
          <h3 class="form-title">กรอกข้อมูลผู้จอง</h3>

          <div class="form-group">
            <label class="form-label">ชื่อ-นามสกุล</label>
            <input v-model="customerInfo.name" class="form-input" placeholder="กรุณากรอกชื่อ-นามสกุล" />
          </div>

          <div class="form-group">
            <label class="form-label">เบอร์โทรศัพท์</label>
            <input v-model="customerInfo.phone" class="form-input" placeholder="กรุณากรอกเบอร์โทรศัพท์" />
          </div>

          <div class="form-group">
            <label class="form-label">อีเมล</label>
            <input v-model="customerInfo.email" class="form-input" placeholder="กรุณากรอกอีเมล (ถ้ามี)" />
          </div>

          <div class="form-group">
            <label class="form-label">หมายเหตุ</label>
            <textarea v-model="customerInfo.note" class="form-textarea"
              placeholder="กรุณากรอกหมายเหตุ (ถ้ามี)"></textarea>
          </div>

          <div class="action-buttons">
            <button class="back-btn" @click="prevStep">
              <i class="material-icons">arrow_back</i>
              Back
            </button>
            <button class="booking-confirm-btn" @click="submitBooking"
              :disabled="!customerInfo.name || !customerInfo.phone">
              Booking Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Gradient background for header */
.header-gradient {
  background: linear-gradient(90deg, #8872fb, #a08af7, #af96f2, #bfa0ee, #dcacde, #e1acd8, #eea8cc);
  padding: 60px 0 80px;
  text-align: center;
}

.header-title {
  font-size: 4rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.booking-container {
  width: 100%;
  padding: 30px 150px 80px;
  background-color: white;
  border-radius: 30px 30px 0 0;
  position: relative;
  margin-top: -30px;
  /* Pull up to overlap with gradient background */
}

@media (max-width: 1024px) {
  .booking-container {
    padding: 30px 50px 80px;
  }

  .header-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .booking-container {
    padding: 30px 20px 80px;
  }

  .header-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 2.2rem;
  }
}

.booking-header {
  text-align: center;
  margin-bottom: 40px;
  color: #A96AFF;
}

.booking-title {
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  color: #A96AFF;
  margin-bottom: 2rem;
}

/* ส่วนประเภทบริการด้านบน */
.category-selection {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
  gap: 10px;
}

.category-btn {
  background-color: white;
  color: #333;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  margin: 0 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.category-icon {
  font-size: 20px;
}

.category-selected {
  background-color: #B388FF;
  color: white;
}

.servfies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.servfy-card {
  background-color: #FFF4F8;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.servfy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 120px;
  height: 120px;
  /* border-radius: 50%; */
  object-fit: cover;
  margin: 0 auto 15px;
  /* border: 2px solid white; */
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
}

.servfy-name {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #333;
}

.servfy-category {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.rating {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.star-icon {
  color: #B388FF;
  font-size: 20px;
}

.star-icon.small {
  font-size: 16px;
}

.booking-btn {
  background-color: #B388FF;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 8px 25px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s;
}

.booking-btn:hover {
  background-color: #A96AFF;
}

/* Step 2 Styles */
.booking-step {
  background-color: white;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.selected-servfy {
  margin-bottom: 30px;
}

.servfy-info {
  display: flex;
  align-items: center;
}

.profile-small {
  width: 90px;
  height: 90px;
  /* border-radius: 50%; */
  object-fit: cover;
  margin-right: 20px;
  /* border: 3px solid white; */
  /* box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1); */
}

.servfy-details {
  flex: 1;
}

.servfy-position {
  color: #666;
  margin-bottom: 5px;
}

.rating-text {
  margin-left: 5px;
  color: #666;
  font-size: 0.9rem;
}

.booking-tabs {
  margin-top: 20px;
}

.tab-header {
  display: flex;
  border: 1px solid #E0E0E0;
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 20px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
  position: relative;
}

.tab-icon {
  font-size: 24px;
}

.tab-item span {
  font-weight: 500;
  margin: 5px 0;
}

.tab-item small {
  font-size: 0.8rem;
  color: #888;
}

.active-tab {
  background-color: #B388FF;
  color: white;
}

.active-tab small {
  color: rgba(255, 255, 255, 0.8);
}

.tab-content {
  padding: 20px 0;
}

/* Calendar Styles */
.month-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.current-month {
  font-size: 1.5rem;
  font-weight: 500;
}

.nav-btn {
  background: none;
  border: none;
  color: #B388FF;
  font-size: 20px;
  cursor: pointer;
}

.calendar {
  width: 100%;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
}

.calendar-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
}

.calendar-cell {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  border-radius: 50%;
  margin: 2px;
  cursor: pointer;
}

.is-today {
  background-color: #F0F0F0;
}

.is-selected {
  background-color: #B388FF;
  color: white;
}

.is-disabled {
  color: #DDD;
  cursor: not-allowed;
}

/* Time Slots Styles */
.time-selector {
  padding: 20px 0;
}

.time-slots {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.time-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.time-slot {
  flex: 0 0 calc(25% - 15px);
  max-width: calc(25% - 15px);
}

.slot-button {
  padding: 15px;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.slot-button:hover {
  background-color: #F5F5F5;
}

.slot-time {
  font-size: 1.1rem;
  font-weight: 500;
}

.slot-label {
  font-size: 0.8rem;
  color: #666;
}

.selected-slot .slot-button {
  background-color: #B388FF;
  border-color: #B388FF;
  color: white;
}

.selected-slot .slot-label {
  color: rgba(255, 255, 255, 0.8);
}

/* Consult Options Styles */
.consult-selector {
  padding: 20px 0;
}

.consult-options {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
}

.consult-option {
  flex: 0 0 200px;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.option-content {
  font-size: 1.2rem;
  font-weight: 500;
}

.selected-option {
  background-color: #B388FF;
  color: white;
  border-color: #B388FF;
}

.location-selector {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.location-option {
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.location-name {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.location-address {
  font-size: 0.9rem;
  color: #666;
}

.selected-location {
  background-color: #B388FF;
  color: white;
  border-color: #B388FF;
}

.selected-location .location-address {
  color: rgba(255, 255, 255, 0.8);
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.back-btn {
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.next-btn {
  padding: 10px 20px;
  background-color: #B388FF;
  color: white;
  border: none;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.next-btn:disabled {
  background-color: #D3D3D3;
  cursor: not-allowed;
}

/* Step 3 Styles */
.booking-summary {
  background-color: #F9F9F9;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
}

.summary-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.summary-item {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
}

.summary-icon {
  color: #B388FF;
  font-size: 24px;
}

.summary-detail {
  margin-left: 15px;
}

.summary-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.summary-value {
  font-size: 1.1rem;
  font-weight: 500;
}

.customer-form {
  margin-top: 30px;
}

.form-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 1rem;
}

.form-textarea {
  height: 100px;
  resize: vertical;
}

.booking-confirm-btn {
  padding: 10px 25px;
  background-color: #B388FF;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
}

.booking-confirm-btn:disabled {
  background-color: #D3D3D3;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .booking-title {
    font-size: 2rem;
  }

  .servfies-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .tab-item span {
    font-size: 0.9rem;
  }

  .tab-item small {
    display: none;
  }

  .summary-row {
    flex-direction: column;
  }

  .time-slot {
    flex: 0 0 calc(50% - 15px);
    max-width: calc(50% - 15px);
  }

  .consult-options {
    flex-direction: column;
  }

  .consult-option {
    flex: none;
  }
}

@media (max-width: 480px) {
  .time-slot {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .booking-step {
    padding: 20px 15px;
  }

  .servfy-info {
    flex-direction: column;
    text-align: center;
  }

  .profile-small {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>