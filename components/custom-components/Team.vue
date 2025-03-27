<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Team } from '@/_mockApis/custom-components/index';

// Define interfaces for type safety
interface PortfolioItem {
  title: string;
  description: string;
  image: string;
}

interface Servfy {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
  categoryId: number;
  portfolio?: PortfolioItem[];
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

// Initialize servfiesWithCategories with proper typing
const servfiesWithCategories = ref<Servfy[]>(Team.map((member, index) => ({
  ...member,
  id: `servfy-${index}`,
  categoryId: getCategoryIdByIndex(index),
  portfolio: getPortfolioByIndex(index)
})));

function getCategoryIdByIndex(index: number): number {
  if (index < 5) return 1;
  if (index < 10) return 2;
  if (index < 12) return 3;
  if (index < 15) return 4;
  if (index < 16) return 5;
  if (index < 20) return 6;
  return 7;
}

function getPortfolioByIndex(index: number): PortfolioItem[] | undefined {
  if (index === 0) return [
    { title: 'Marketing Campaign 2023', description: 'Successful product launch campaign', image: Team[0].img },
    { title: 'Brand Strategy', description: 'Developed comprehensive brand identity', image: Team[0].img }
  ];
  if (index === 1) return [
    { title: 'Social Media Management', description: 'Increased engagement by 150%', image: Team[1].img }
  ];
  return undefined;
}

// Mock Portfolio Data
const portfolioItems = ref(Team.map(member => ({
  id: member.title,
  title: member.title,
  category: member.subtitle,
  description: member.desc,
  image: member.img
})));

const showPortfolio = ref(false);

// Service Categories
const serviceCategories = ref<Category[]>([
  { id: 1, name: 'Marketing', icon: 'mdi-bullhorn' },
  { id: 2, name: 'Finance', icon: 'mdi-cash' },
  { id: 3, name: 'Design', icon: 'mdi-palette' },
  { id: 4, name: 'Languages', icon: 'mdi-translate' },
  { id: 5, name: 'Law', icon: 'mdi-scale-balance' },
  { id: 6, name: 'Innovation and Technology', icon: 'mdi-robot' },
  { id: 7, name: 'Activity', icon: 'mdi-heart-pulse' },
]);

const showPortfolioModal = ref(false);
const currentMemberPortfolio = ref<Servfy | null>(null);
const currentPortfolioIndex = ref(0);
const currentModalStep = ref(1); // สำหรับจัดการขั้นตอนใน Modal

// Function to view portfolio
const viewPortfolio = (servfy: Servfy) => {
  currentMemberPortfolio.value = servfy;
  currentPortfolioIndex.value = 0;
  showPortfolioModal.value = true;
};
// Navigation for portfolio items
const nextPortfolioItem = () => {
  if (currentMemberPortfolio.value?.portfolio &&
    currentPortfolioIndex.value < currentMemberPortfolio.value.portfolio.length - 1) {
    currentPortfolioIndex.value++;
  }
};

const prevPortfolioItem = () => {
  if (currentPortfolioIndex.value > 0) {
    currentPortfolioIndex.value--;
  }
};

// Modal step navigation
const nextModalStep = () => {
  if (currentModalStep.value < 3) {
    currentModalStep.value++;
  }
};

const prevModalStep = () => {
  if (currentModalStep.value > 1) {
    currentModalStep.value--;
  }
};

// State for booking steps
const currentStep = ref(1);
const selectedCategory = ref<Category | null>(null);
const selectedServfy = ref<Servfy | null>(null);
const bookingDate = ref('');
const bookingTime = ref({
  start: '',
  end: ''
});
const consultType = ref(''); // 'online' or 'onsite'
const locationDetails = ref({
  place: '',
  customPlace: '',
  location: { lat: 0, lng: 0 }
});

// For booking tabs
const bookingTab = ref('day');

// Customer info
const customerInfo = ref({
  name: '',
  phone: '',
  email: '',
  note: ''
});

// Meeting places
const meetingPlaces = ref([
  { id: 1, name: 'KKBS', address: 'คณะบริหารธุรกิจและการบัญชี มหาวิทยาลัยขอนแก่น' },
  { id: 2, name: 'KKBS Cafe', address: 'คาเฟ่ในคณะบริหารธุรกิจและการบัญชี' },
  { id: 3, name: 'KKBS Studio', address: 'สตูดิโอในคณะบริหารธุรกิจและการบัญชี' },
  { id: 4, name: 'Other', address: 'ระบุสถานที่อื่นๆ' }
]);

// Filter servfies by selected category
const filteredServfies = computed(() => {
  if (!selectedCategory.value) {
    return servfiesWithCategories.value;
  }
  return servfiesWithCategories.value.filter(servfy =>
    servfy.categoryId === selectedCategory.value?.id
  );
});

// Prepare dates for calendar
const currentMonth = ref(new Date());
const daysInMonth = computed(() => {
  const year = currentMonth.value.getFullYear();
  const month = currentMonth.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
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

// Navigation functions
const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1);
};

const prevMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1);
};

// Date selection
const selectDate = (day: number | null) => {
  if (!day) return;
  const selectedDate = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day);
  bookingDate.value = selectedDate.toISOString().split('T')[0];
  bookingTab.value = 'start-time';
};

// Step navigation
const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
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

// Submit booking to Line OA
// แก้ไขฟังก์ชัน submitBooking ใน <script setup> ของไฟล์ Vue
const submitBooking = () => {
  const servfyName = selectedServfy.value ? selectedServfy.value.title : '';
  const categoryName = selectedCategory.value ? selectedCategory.value.name : '';

  let consultTypeText = '';
  if (consultType.value === 'online') {
    consultTypeText = 'ออนไลน์';
  } else if (consultType.value === 'onsite') {
    consultTypeText = 'พบที่สถานที่';
  }

  const formattedDate = bookingDate.value ? new Date(bookingDate.value).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  let placeText = locationDetails.value.place;
  if (locationDetails.value.place === 'Other') {
    placeText = locationDetails.value.customPlace;
  }

  // สร้างข้อความในรูปแบบที่ Line OA จะรู้ว่าเป็นการจอง และควรตอบกลับ
  // โดยใช้คีย์เวิร์ดพิเศษที่คุณตั้งค่าใน Auto-Reply ของ Line OA
  const message = `
BOOKING_REQUEST #${Math.floor(Math.random() * 10000)}
สวัสดีคุณ ${customerInfo.value.name}
นี่คือรายระเอียดสำหรับการจองบริการของคุณ (โปรดตรวจสอบข้อมูลการจองบริการของคุณ)
ปรึกษาด้าน: ${categoryName}
Servfie(ผู้ให้คำปรึกษา): ${servfyName}
วันที่จอง: ${formattedDate}
เวลาที่จอง: ${bookingTime.value.start} - ${bookingTime.value.end} น.
รูปแบบ: ${consultTypeText}
สถานที่: ${placeText}
เบอร์โทร: ${customerInfo.value.phone}
  `.trim();

  // เก็บข้อมูลการจองลงใน localStorage เพื่อใช้แสดงในภายหลัง
  const bookingData = {
    id: `booking-${Date.now()}`,
    customerName: customerInfo.value.name,
    serviceCategory: categoryName,
    servfyName: servfyName,
    formattedDate: formattedDate,
    startTime: bookingTime.value.start,
    endTime: bookingTime.value.end,
    consultType: consultTypeText,
    place: placeText,
    timestamp: new Date().toISOString()
  };
  
  // เก็บข้อมูลลงใน localStorage
  const existingBookings = JSON.parse(localStorage.getItem('servfyBookings') || '[]');
  existingBookings.push(bookingData);
  localStorage.setItem('servfyBookings', JSON.stringify(existingBookings));

  // เปิด Line OA และส่งข้อความ
  const lineOaUrl = `https://line.me/R/oaMessage/@842vmgfm/?${encodeURIComponent(message)}`;
  window.open(lineOaUrl, '_blank');
  
  // แสดงข้อความยืนยันการจอง
  alert('บันทึกการจองเรียบร้อยแล้ว กรุณาตรวจสอบข้อความยืนยันใน Line');
  
  // รีเซ็ตฟอร์มหรือกลับไปหน้าแรก (ตัวอย่าง)
  // resetForm(); หรือ router.push('/');
};

// Time slots
const timeSlots = ref([
  '09.00', '10.00', '11.00', '12.00',
  '13.00', '14.00', '15.00', '16.00', '17.00'
]);

// Time selection
const selectStartTime = (time: string) => {
  bookingTime.value.start = time;
  bookingTab.value = 'end-time';
};

const selectEndTime = (time: string) => {
  bookingTime.value.end = time;
  bookingTab.value = 'consults';
};

const availableEndTimes = computed(() => {
  if (!bookingTime.value.start) return [];

  const startIndex = timeSlots.value.indexOf(bookingTime.value.start);
  if (startIndex === -1) return [];

  return timeSlots.value.slice(startIndex + 1);
});

// Date helpers
const isToday = (day: number | null) => {
  if (!day) return false;
  const today = new Date();
  return (
    day === today.getDate() &&
    currentMonth.value.getMonth() === today.getMonth() &&
    currentMonth.value.getFullYear() === today.getFullYear()
  );
};

const isSelectedDate = (day: number | null) => {
  if (!day || !bookingDate.value) return false;
  const selectedDate = new Date(bookingDate.value);
  return (
    day === selectedDate.getDate() &&
    currentMonth.value.getMonth() === selectedDate.getMonth() &&
    currentMonth.value.getFullYear() === selectedDate.getFullYear()
  );
};

const isDayDisabled = (day: number | null) => {
  if (!day) return true;
  const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Consult selection
const consultSelected = () => {
  nextStep();
};

// Format date for display
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Category selection
const selectCategory = (category: Category) => {
  if (selectedCategory.value && selectedCategory.value.id === category.id) {
    selectedCategory.value = null;
  } else {
    selectedCategory.value = category;
  }
};

// Servfy selection
const selectServfy = (servfy: Servfy) => {
  selectedServfy.value = servfy;
  nextStep();
};

// Get category name by ID
const getCategoryName = (categoryId: number | undefined) => {
  if (categoryId === undefined) return '';
  const category = serviceCategories.value.find(cat => cat.id === categoryId);
  return category ? category.name : '';
};

// Place selection
const selectPlace = (place: { name: string }) => {
  locationDetails.value.place = place.name;
  if (place.name !== 'Other') {
    locationDetails.value.customPlace = '';
  }
};
</script>

<template>
  <div id="team">
    <div class="header-gradient">
      <h1 class="header-title" style="color: #ffedb9;">Find your Servfies</h1>
    </div>

    <div class="booking-container">
      <!-- Step 1: Select service category and Servfy -->
      <div v-if="currentStep === 1">
        <!-- Category selection -->
        <div class="category-selection">
          <button v-for="category in serviceCategories" :key="category.id"
            :class="{ 'category-selected': selectedCategory && selectedCategory.id === category.id }"
            class="category-btn" @click="selectCategory(category)">
            {{ category.name }}
          </button>
        </div>

        <!-- Display Servfies -->
        <div class="servfies-grid">
          <div v-for="servfy in filteredServfies" :key="servfy.id" class="servfy-card">
            <div class="servfy-profile">
              <img :src="servfy.img" alt="servfy profile" class="profile-image" />
              <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;">
                <h3 class="servfy-name">{{ servfy.title }}</h3>
              <a href="#" style="margin-left: 2px;" @click.prevent="viewPortfolio(servfy)"
                v-if="servfy.portfolio" class="portfolio-link">
                <div class="circle-icon">
                  <i class="material-icons">chevron_right</i>
                </div>
              </a>
              </div>
              
              <div class="rating">
                <i v-for="n in 5" :key="n" class="material-icons star-icon">star</i>
              </div>
              <div class="servfy-actions">

                <button class="booking-btn" @click="selectServfy(servfy)">
                  BOOKING
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Select date, time and consultation type -->
      <div v-else-if="currentStep === 2" class="booking-step">
        <!-- Selected Servfy info -->
        <div class="selected-servfy">
          <div class="servfy-info">
            <img :src="selectedServfy?.img" alt="servfy profile" class="profile-small" />
            <div class="servfy-details">
              <h2 class="servfy-name">{{ selectedServfy?.title }}</h2>
              <p>{{ getCategoryName(selectedServfy?.categoryId) }}</p>
              <div class="rating-2">
                <i v-for="n in 5" :key="n" class="material-icons star-icon small">star</i>
                <span class="rating-text">(5.0)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking tabs -->
        <div class="booking-tabs">
          <div class="tab-header">
            <div class="tab-item" :class="{ 'active-tab': bookingTab === 'day' }" @click="bookingTab = 'day'">
              <i class="material-icons tab-icon">calendar_today</i>
              <span>Booking Day</span>
              <small>เลือกวันที่</small>
            </div>
            <div class="tab-item" :class="{ 'active-tab': bookingTab === 'start-time' }"
              @click="bookingTab = 'start-time'">
              <i class="material-icons tab-icon">schedule</i>
              <span>Start Time</span>
              <small>เวลาเริ่มต้น</small>
            </div>
            <div class="tab-item" :class="{ 'active-tab': bookingTab === 'end-time' }" @click="bookingTab = 'end-time'"
              :disabled="!bookingTime.start">
              <i class="material-icons tab-icon">schedule</i>
              <span>End Time</span>
              <small>เวลาสิ้นสุด</small>
            </div>
            <div class="tab-item" :class="{ 'active-tab': bookingTab === 'consults' }" @click="bookingTab = 'consults'"
              :disabled="!bookingTime.end">
              <i class="material-icons tab-icon">chat</i>
              <span>Consults</span>
              <small>เลือกรูปแบบ</small>
            </div>
          </div>

          <!-- Tab content -->
          <div class="tab-content">
            <!-- Tab 1: Select date -->
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

            <!-- Tab 2: Select start time -->
            <div v-if="bookingTab === 'start-time'" class="time-selector">
              <h3 class="time-selector-title">Select Start Time</h3>
              <div class="time-slots-grid">
                <div v-for="time in timeSlots" :key="time" class="time-slot"
                  :class="{ 'selected-slot': bookingTime.start === time }" @click="selectStartTime(time)">
                  {{ time }}
                </div>
              </div>
            </div>

            <!-- Tab 3: Select end time -->
            <div v-if="bookingTab === 'end-time'" class="time-selector">
              <h3 class="time-selector-title">Select End Time</h3>
              <p class="time-selector-subtitle">Start Time: {{ bookingTime.start }}</p>
              <div class="time-slots-grid">
                <div v-for="time in availableEndTimes" :key="time" class="time-slot"
                  :class="{ 'selected-slot': bookingTime.end === time }" @click="selectEndTime(time)">
                  {{ time }}
                </div>
              </div>
            </div>

            <!-- Tab 4: Select consultation type -->
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

              <!-- Location selector for onsite -->
              <div v-if="consultType === 'onsite'" class="location-selector">
                <div v-for="place in meetingPlaces" :key="place.id" class="location-option"
                  :class="{ 'selected-location': locationDetails.place === place.name }" @click="selectPlace(place)">
                  <div class="location-content">
                    <div class="location-name">{{ place.name }}</div>
                    <div class="location-address">{{ place.address }}</div>
                  </div>
                </div>

                <!-- Custom location input -->
                <div v-if="locationDetails.place === 'Other'" class="custom-location-input">
                  <label class="form-label">ระบุสถานที่</label>
                  <input v-model="locationDetails.customPlace" class="form-input" placeholder="กรุณาระบุสถานที่นัดพบ" />
                </div>
              </div>

              <!-- Action buttons -->
              <div class="action-buttons">
                <button class="back-btn" @click="prevStep">
                  <i class="material-icons">arrow_back</i>
                  Back
                </button>
                <button class="next-btn" @click="consultSelected"
                  :disabled="!consultType || (consultType === 'onsite' && !locationDetails.place) || (locationDetails.place === 'Other' && !locationDetails.customPlace)">
                  Next
                  <i class="material-icons">arrow_forward</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Customer information -->
      <div v-else-if="currentStep === 3" class="booking-step">
        <!-- Selected Servfy info -->
        <div class="selected-servfy">
          <div class="servfy-info">
            <img :src="selectedServfy?.img" alt="servfy profile" class="profile-small" />
            <div class="servfy-details">
              <h2 class="servfy-name">{{ selectedServfy?.title }}</h2>
              <p>{{ getCategoryName(selectedServfy?.categoryId) }}</p>
              <div class="rating-2">
                <i v-for="n in 5" :key="n" class="material-icons star-icon small">star</i>
                <span class="rating-text">(5.0)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking summary -->
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

          <!-- Meeting location -->
          <div class="summary-item">
            <i class="material-icons summary-icon">place</i>
            <div class="summary-detail">
              <div class="summary-label">Location</div>
              <div class="summary-value">
                {{ locationDetails.place === 'Other' ? locationDetails.customPlace : locationDetails.place }}
              </div>
            </div>
          </div>
        </div>

        <!-- Customer form -->
        <div class="customer-form">
          <h3 class="form-title">กรอกข้อมูลผู้จอง</h3>

          <div class="form-group">
            <label class="form-label">ชื่อผู้จอง</label>
            <input v-model="customerInfo.name" class="form-input" placeholder="กรุณากรอกชื่อผู้จอง" />
          </div>

          <div class="form-group">
            <label class="form-label">เบอร์โทรศัพท์</label>
            <input v-model="customerInfo.phone" class="form-input" placeholder="กรุณากรอกเบอร์โทรศัพท์" />
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

      <!-- Portfolio Modal with Steps -->
      <div v-if="showPortfolioModal && currentMemberPortfolio" class="portfolio-modal">
        <div class="modal-overlay" @click="showPortfolioModal = false"></div>

        <div class="modal-content">
          <button class="close-btn" @click="showPortfolioModal = false">
            <i class="material-icons">close</i>
          </button>

          <!-- Member Info -->
          <div class="member-header">
            <img :src="currentMemberPortfolio.img" class="member-image" />
            <div class="member-info">
              <h2>{{ currentMemberPortfolio.title }}</h2>
              <p class="member-position">{{ getCategoryName(selectedServfy?.categoryId) }}</p>
              <div class="member-rating">
                <i v-for="n in 5" :key="n" class="material-icons star-icon">star</i>
                <span>(5.0)</span>
              </div>
            </div>
          </div>

          <!-- Portfolio Items List -->
          <div v-if="currentMemberPortfolio.portfolio" class="portfolio-list-container">
            <h3 class="portfolio-section-title">ผลงานทั้งหมด</h3>

            <div class="portfolio-list">
              <div v-for="(item, index) in currentMemberPortfolio.portfolio" :key="index" class="portfolio-list-item">
                <div class="portfolio-list-details">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Action -->
          <div class="portfolio-actions">
            <button class="booking-btn large" @click="selectServfy(currentMemberPortfolio)">
              Booking
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

/* Portfolio Section Styles */
.portfolio-toggle {
  text-align: center;
  margin: 20px 0;
}

.portfolio-btn {
  background-color: #B388FF;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.portfolio-btn:hover {
  background-color: #A96AFF;
}

.portfolio-section {
  padding: 0 150px 40px;
  background-color: white;
}

.portfolio-title {
  text-align: center;
  color: #A96AFF;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.portfolio-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.portfolio-item:hover {
  transform: translateY(-5px);
}

.portfolio-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-category {
  color: #B388FF;
  font-weight: 500;
  margin: 5px 0;
}

.portfolio-description {
  font-size: 0.9rem;
  margin-top: 5px;
}

.booking-container {
  width: 100%;
  padding: 30px 150px 80px;
  background-color: white;
  border-radius: 30px 30px 0 0;
  position: relative;
  margin-top: -30px;
}

@media (max-width: 1024px) {

  .booking-container,
  .portfolio-section {
    padding: 30px 50px 80px;
  }

  .header-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {

  .booking-container,
  .portfolio-section {
    padding: 30px 20px 80px;
  }

  .header-title {
    font-size: 2.8rem;
  }

  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 2.2rem;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }
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
  object-fit: cover;
  margin: 0 auto 15px;
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

.portfolio-link {
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.portfolio-link:hover {
  transform: scale(1.1);
}

.circle-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #b07bff70;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.circle-icon:hover {
  background-color: #b07bff60;
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
  object-fit: cover;
  margin-right: 20px;
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

.tab-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

.time-selector-title {
  text-align: center;
  color: #A96AFF;
  margin-bottom: 20px;
}

.time-selector-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 15px;
}

.time-slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
  justify-items: center;
}

.time-slot {
  padding: 15px;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.time-slot:hover {
  background-color: #F5F5F5;
}

.selected-slot {
  background-color: #B388FF;
  border-color: #B388FF;
  color: white;
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

.custom-location-input {
  grid-column: 1 / -1;
  padding: 20px;
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

/* Modal Step Styles */
.portfolio-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background-color: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 24px;
}

.member-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.member-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
}

.member-info {
  flex: 1;
}

.member-position {
  color: #666;
  margin: 5px 0 15px;
}

.member-description {
  color: #555;
  line-height: 1.6;
}

.portfolio-items {
  margin: 40px 0;
}

.portfolio-item {
  margin-top: 20px;
}

.portfolio-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-arrow {
  background: none;
  border: none;
  color: #B388FF;
  font-size: 32px;
  cursor: pointer;
}

.nav-arrow:disabled {
  color: #E0E0E0;
  cursor: not-allowed;
}

.portfolio-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin: 0 20px;
}

.portfolio-image {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 20px;
}

.portfolio-item-details {
  text-align: center;
}

.portfolio-pagination {
  text-align: center;
  margin-top: 15px;
  color: #666;
}

.portfolio-actions {
  text-align: center;
  padding: 20px 0;
}

.booking-btn.large {
  padding: 5px 28px;
  font-size: 1.2rem;
}


.nav-arrow:disabled {
  color: #E0E0E0;
  cursor: not-allowed;
}

.portfolio-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin: 0 20px;
}

.portfolio-image {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 20px;
}

.portfolio-item-details {
  text-align: center;
}

.portfolio-pagination {
  text-align: center;
  margin-top: 15px;
  color: #666;
}

.portfolio-actions {
  text-align: center;
  padding: 40px 0;
}

.action-title {
  font-size: 1.8rem;
  color: #B388FF;
  margin-bottom: 10px;
}

.action-subtitle {
  color: #666;
  margin-bottom: 30px;
}

.modal-action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.modal-back-btn,
.modal-next-btn,
.modal-confirm-btn {
  padding: 12px 25px;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-back-btn {
  background-color: #f5f5f5;
  color: #333;
  border: none;
}

.modal-next-btn {
  background-color: #B388FF;
  color: white;
  border: none;
  margin-left: auto;
}

.modal-confirm-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  width: 100%;
  justify-content: center;
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

  .time-slots-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .consult-options {
    flex-direction: column;
  }

  .consult-option {
    flex: none;
  }

  .location-selector {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .time-slots-grid {
    grid-template-columns: 1fr;
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

  .tab-header {
    flex-wrap: wrap;
  }

  .tab-item {
    flex: 0 0 50%;
    padding: 10px;
  }

  .member-header {
    flex-direction: column;
    text-align: center;
  }

  .member-image {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .portfolio-nav {
    flex-direction: column;
  }

  .portfolio-item-content {
    margin: 20px 0;
  }

  .modal-action-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .modal-back-btn,
  .modal-next-btn,
  .modal-confirm-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>