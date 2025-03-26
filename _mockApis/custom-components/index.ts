import type { Services, BuildFeatures, pricingType, PortfolioSection, BlogSection, TeamSection, Testimonials, Contact } from "@/types/custom-components";

/*import tabler icons*/
import { CheckIcon, XIcon, UserCircleIcon, BriefcaseIcon, StarIcon, AssemblyIcon, LayersIntersect2Icon, TriangleSquareCircleIcon, SearchIcon, HeartIcon, MapIcon, MapPinIcon, ShieldCheckIcon, BrandFacebookIcon, BrandInstagramIcon } from 'vue-tabler-icons';

//Services
const ServicesData: Services[] = [
  {
    img: StarIcon,
    title: '4.86',
    desc: 'Out of 5 stars from 3896 reviews on google platform',
  },
  {
    img: UserCircleIcon,
    title: '364',
    desc: 'Client testimonials received in year 2023',
  },
  {
    img: BriefcaseIcon,
    title: '45M+',
    desc: 'Revenue generated through new projects & marketing',
  },
]

//Build Features
import icons1 from '/images/blog-grid/17.png';
import icons2 from '/images/blog-grid/18.png';
import icons3 from '/images/blog-grid/19.png';
import icons4 from '/images/blog-grid/20.png';


const BuildFeaturesData: BuildFeatures[] = [
  {
    image: icons1,
    title: 'Easy to find consultants',
    desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '/',
  },
  {
    image: icons2,
    title: 'Reliable',
    desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '/',
  },
  {
    image: icons3,
    title: 'Expert Advice',
    desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '/',
  },
  {
    image: icons4,
    title: 'Service everywhere',
    desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '/',
  }
]




//Portfolio

//Blog

import blog1 from '/images/blog-grid/blog1.png';
import blog2 from '/images/blog-grid/blog2.png';
import blog3 from '/images/blog-grid/blog3.jpg';
import blog4 from '/images/blog-grid/blog4.jpg';


const Blog: BlogSection[] = [
  {
    id: 1,
    img: blog1,
    badge: 'UX Design',
    date: 'Mar 21, 2025',
    view: '27,567 Views',
    title: '15 เคล็ดลับการเรียน! ทำยังไงให้ได้เกรด 4 ทุกวิชา เรียนไม่เก่งก็ทำได้',
    desc: 'ไม่ว่าใครก็อยากเป็นคนเรียนเก่ง และอยากได้เกรด 4 ทุกวิชา แต่ความเก่งก็ขึ้นอยู่การฝึกฝน และความตั้งใจด้วย ถึงแม้ว่าจะเรียนไม่เก่ง แต่ถ้าหากมีความพยายาม ฝึกฝนตนเอง ทบทวนบทเรียนอย่างสม่ำเสมอ',
    name: 'Mark R. Freeman',
    link: 'https://enconcept.com/how-to-get-straight-a/'
  },
  {
    id: 2,
    img: blog2,
    badge: 'Digital',
    date: 'Mar 20, 2025',
    view: '29,567 Views',
    title: 'คิดงานไม่ออกทำไงดี?10 วิธีจัดการสมองตันให้กลับมาไอเดียแล่นอีกครั้ง',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name: 'James Robert',
    link: 'https://shortrecap.co/academic/self-improvement/%e0%b8%84%e0%b8%b4%e0%b8%94%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b9%84%e0%b8%a1%e0%b9%88%e0%b8%ad%e0%b8%ad%e0%b8%81%e0%b8%97%e0%b8%b3%e0%b9%84%e0%b8%87%e0%b8%94%e0%b8%b5/'
  },
  {
    id: 3,
    img: blog3,
    badge: 'Html',
    date: 'Mar 19, 2025',
    view: '28,567 Views',
    title: 'เลือกเรียนมหาลัยไหนดี? จากจุดเด่นของมหาลัยกว่า 20 ที่ ครบ 4 ภาค!!',
    desc: 'น้องเป็นสาวขอนแก่น ยังบ่เคยมีแฟน บ้านอยู่แดนอีสาน น้องเป็นสาววัยอ่อน ได้แต่นอนตะแคง ยามเมื่อแลงฝันหวาน จะมีชายใด ไผเดต้องการ จะมีชายใด ไผเดต้องการ หมายปองน้องนั่น แม้ต้องการจะคอย สาวอีสานบ้านป่า เช้าก็ไปทำนา ค่ำแลงมาเหงาหงอย เขาว่าน้องเป็นลาว เป็นสาวเมืองอีสาน ใจน้องนั้นเลื่อนลอย จงเอ็นดู แน้เด้ออ้ายเด้อ จงปรานี น้องแน่จั๊กหน่อย ฮักน้องบ่อยบ่อย พอน้องได้พลอยดีใจ',
    name: 'David William',
    link: 'https://www.smartmathpro.com/article/university-highlight/'
  },
  {
    id: 4,
    img: blog4,
    badge: 'Html',
    date: 'Mar 18, 2025',
    view: '28,567 Views',
    title: 'รวม 10 แอป ตัวช่วยการ เรียนออนไลน์ เรียนสนุก เข้าถึงง่ายขึ้น',
    desc: 'นี่คือเหงานี่แหละเหงา นี่คือความจริงที่ได้เจอ เจ็บปวดทรมาน ลึกลงข้างในใจ โอ้ความเหงา มันช่างหนาว มันช่างยาวนานและทุกข์ทน รอคอยใครบางคนมาหยุดมัน',
    name: 'David William',
    link: 'https://www.learneducation.co.th/10-%E0%B9%81%E0%B8%AD%E0%B8%9B-%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3-%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%AD%E0%B8%99/'
  },
  // {
  //   id: 5,
  //   img: blog3,
  //   badge: 'Html',
  //   date: 'Mar 17, 2025',
  //   view: '28,567 Views',
  //   title: 'This Week in Search: New Limits and Exciting Features',
  //   desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  //   name: 'David William'
  // },


];


//Team

import mk1 from '/images/team/mk1.png';
import mk2 from '/images/team/mk2.png';
import mk3 from '/images/team/mk3.png';
import mk4 from '/images/team/mk4.png';
import mk5 from '/images/team/mk5.png';

import fn1 from '/images/team/fn1.png';
import fn2 from '/images/team/fn2.png';
import fn3 from '/images/team/fn3.png';
import fn4 from '/images/team/fn4.png';
import fn5 from '/images/team/fn5.png';

import ds1 from '/images/team/ds1.png';
import ds2 from '/images/team/ds2.png';

import lan1 from '/images/team/lan1.png';
import lan2 from '/images/team/lan2.png';
import lan3 from '/images/team/lan3.png';

import law1 from '/images/team/law1.png';

import tech1 from '/images/team/tech1.png';
import tech2 from '/images/team/tech2.png';
import tech3 from '/images/team/tech3.png';
import tech4 from '/images/team/tech4.png';

import ac1 from '/images/team/ac1.png';
import ac2 from '/images/team/ac2.png';
import ac3 from '/images/team/ac3.png';
import ac4 from '/images/team/ac4.png';
import ac5 from '/images/team/ac5.png';
import ac6 from '/images/team/ac6.png';
import ac7 from '/images/team/ac7.png';
import ac8 from '/images/team/ac8.png';



const Team: TeamSection[] = [
  {
    img: mk1,
    title: "Khim",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
    
  },
  {
    img: mk2,
    title: "Prach",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
    
  },
  {
    img: mk3,
    title: "Ton-aor",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
   
  },
  {
    img: mk4,
    title: "Zara",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
    
  },
  {
    img: mk5,
    title: "Mild",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: fn1,
    title: "Tiw",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: fn2,
    title: "Aom",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: fn3,
    title: "Boss",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: fn4,
    title: "Mark",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: fn5,
    title: "Pleng",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: ds1,
    title: "Namwan",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: ds2,
    title: "Bim",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: lan1,
    title: "Fasai",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: lan2,
    title: "Mimi",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: lan3,
    title: "Ja",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: law1,
    title: "Pa",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: tech1,
    title: "Pluem",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: tech2,
    title: "Pure",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: tech3,
    title: "Jan",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: tech4,
    title: "Khet",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: ac1,
    title: "Din",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

  {
    img: ac2,
    title: "Minty",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: ac3,
    title: "Fon",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: ac4,
    title: "May",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: ac5,
    title: "Mootang",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: ac6,
    title: "Jane",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: ac7,
    title: "Sunshine",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },
  {
    img: ac8,
    title: "Bam",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
  },

]

//Testimonial 

import profile1 from '/images/blog/cyrus.jpg';
import profile2 from '/images/blog/kriss.jpg';
import profile3 from '/images/blog/sara.jpg';
import profile4 from '/images/blog/12.png';
import profile5 from '/images/blog/13.png';
import profile6 from '/images/blog/14.png';

const TestimonialsData: Testimonials[] = [
  {
    img: profile1,
    testimonial: "หมดปัญหาไม่มีเพื่อนต่างคณะให้ปรึกษาโปรเจ็ค ก็มาหาที่ SERVF นี่แหละครับ",
    name: "SOMCHAI",
    rating: 5

  },
  {
    img: profile2,
    testimonial: "ชอบมากค่ะ บริการดี ทางออกที่ดีมากหากต้องการที่ปรึกษาหลายๆด้าน แนะนำให้ใช้บริการที่นี่ค่ะ",
    name: "SOMRAKS",
    rating: 4

  },
  {
    img: profile3,
    testimonial: "ชอบมากค่ะ เคยใช้บริการปรึกษาด้านการตลาด ให้คำแนะนำได้ตรงประเด็น เข้าใจง่าย ตรงไหนที่ไม่เข้าใจก็ค่อย ๆ อธิบาย เป็นกันเองสุด ๆ ค่ะ  ",
    name: "SOMYING",
    rating: 5
  },
  {
    img: profile4,
    testimonial: "ใช้บริการ SERVF มาหลายรอบแล้วครับ หาที่ปรึกษาในหลายด้านได้ครบจบในที่เดียวเลยครับ",
    name: "DREW",
    rating: 5
  },
  {
    img: profile5,
    testimonial: "เป็นบริการที่ตอบโจทย์คนรุ่นใหม่มากๆ ครับ ปลอดภัย เวรี่กู้ดอะ สุดยอด",
    name: "TONY",
    rating: 5
  },

  {
    img: profile6,
    testimonial: "ดีมากค่ะ ให้คำปรึกษาดีมากๆ มีให้เลือกหลายด้าน แล้วมีคำแนะนำที่ดีมากค่ะ",
    name: "SANDY",
    rating: 5
  },



];

import facebook from '/images/icons/7.png';
import instagram from '/images/icons/8.png';
import line from '/images/icons/9.png';
import tiktok from '/images/icons/10.png';


const Iconsdata: Contact[] = [

  {
    url: "https://www.facebook.com/profile.php?id=61563551153300",
    img: facebook,
  },
  {
    url: "https://www.instagram.com/servf_official?igsh=MXBmN3Mwb2M1c3A3cQ%3D%3D",
    img: instagram,
  },
  {
    url: "https://line.me/R/ti/p/@842vmgfm?from=page&searchId=842vmgfm",
    img: line,
  },
  {
    url: "https://www.tiktok.com/@servf.official?_t=8q8vUD4ges4&_r=1",
    img: tiktok,
  },
];




export { ServicesData, BuildFeaturesData, pricing, Portfolio, Blog, Team, TestimonialsData, Iconsdata };