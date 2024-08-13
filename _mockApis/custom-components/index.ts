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

const BuildFeaturesData: BuildFeatures[] = [
  {
    icon: SearchIcon,
    title: 'Easy to find friends',
    desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '/',
  },
  {
    icon: HeartIcon,
    title: 'Best take care',
    desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '/',
  },
  {
    icon: MapPinIcon,
    title: 'Service everywhere',
    desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '/',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Safety',
    desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '/',
  }

]


/*-- Pricing Page --*/
/*-- Pricing Page --*/
import img1 from '/images/corporate/silver.png';
import img2 from '/images/corporate/bronze.png';
import img3 from '/images/corporate/gold.png';
const pricing: pricingType[] = [
  {
    tagtext: false,
    caption: 'Silver',
    image: img1,
    free: true,
    price: 10.99,
    yearlyprice: 10.99 * 12,
    buttontext: 'Choose Silver',
    list: [
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: '3 Members',
        status: false,
      },
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: 'Single Device',
        status: false,
      },
      {
        icon: XIcon,
        iconcolor: 'inputBorder',
        listtitle: '50GB Storage',
        status: true,
      },
      {
        icon: XIcon,
        iconcolor: 'inputBorder',
        listtitle: 'Monthly Backups',
        status: true,
      },
      {
        icon: XIcon,
        iconcolor: 'inputBorder',
        listtitle: 'Permissions & workflows',
        status: true,
      }
    ]
  },
  {
    tagtext: true,
    caption: 'bronze',
    image: img2,
    free: false,
    price: 10.99,
    yearlyprice: 10.99 * 12,
    buttontext: 'Choose Bronze',
    list: [
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: '5 Members',
        status: false,
      },
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: 'Multiple Device',
        status: false,
      },
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: '80GB Storage',
        status: false,
      },
      {
        icon: XIcon,
        iconcolor: 'inputBorder',
        listtitle: 'Monthly Backups',
        status: true,
      },
      {
        icon: XIcon,
        iconcolor: 'inputBorder',
        listtitle: 'Permissions & workflows',
        status: true,
      }
    ]
  },
  {
    tagtext: false,
    caption: 'gold',
    image: img3,
    free: false,
    price: 22.99,
    yearlyprice: 22.99 * 12,
    buttontext: 'Choose Gold',
    list: [
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: '15 Members',
        status: false,
      },
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: 'Multiple Device',
        status: false,
      },
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: '150GB Storage',
        status: false,
      },
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: 'Monthly Backups',
        status: false,
      },
      {
        icon: CheckIcon,
        iconcolor: 'primary',
        listtitle: 'Permissions & workflows',
        status: false,
      }
    ]
  }

];


//Portfolio

import s1 from '/images/portfolio/portfolio-1.jpg';
import s2 from '/images/portfolio/portfolio-2.png';
import s3 from '/images/portfolio/portfolio-3.jpg';
import s4 from '/images/portfolio/portfolio-4.jpg';
import s5 from '/images/portfolio/portfolio-5.jpg';
import s6 from '/images/portfolio/portfolio-6.jpg';

const Portfolio: PortfolioSection[] = [
  {
    img: s1,
    title: 'White Theming Background',
    desc: '3D Render',

  },
  {
    img: s2,
    title: 'The Heritage',
    desc: 'Illustration',
  },
  {
    img: s3,
    title: 'Belforte Fall',
    desc: 'Photography',
  },
  {
    img: s4,
    title: 'Ipsum neque libero',
    desc: 'React',
  },
  {
    img: s5,
    title: 'White Theming',
    desc: 'Graphics Design',
  },
  {
    img: s6,
    title: 'luctus neque purus',
    desc: 'Html',
  },

];


//Blog

import blog1 from '/images/blog-grid/grid-LP.jpg';
import blog2 from '/images/blog-grid/grid-uxdesign.jpg';
import blog3 from '/images/blog-grid/grid-search.jpg';

const Blog: BlogSection[] = [
  {
    id: 1,
    img: blog2,
    badge: 'UX Design',
    date: 'Aug 12, 2024',
    view: '27,567 Views',
    title: 'เคล็ดลับกำจัดความเหงาแบบง่ายๆ ที่เราอยากแนะนำ',
    desc: 'เหงายิ่งกว่าเหงา เขาว่าฝนทำให้คนเหงาจริงไหม? หลายคนก็ถามว่าแล้วถ้ารู้สึกเหงาล่ะ จะต้องทำยังไงดี? วันนี้ SERVF มีวิธีง่ายๆ 5 ข้อ ที่น่าจะช่วยทุกคน คลายเหงาได้',
    name: 'Mark R. Freeman'
  },
  { id: 2,
    img: blog2,
    badge: 'Digital',
    date: 'Aug 11, 2024',
    view: '29,567 Views',
    title: 'ทริปกิจกรรมที่เหมาะแก่การไปเที่ยวกับกลุ่มเพื่อน',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name: 'James Robert'
  },
  {
    id: 3,
    img: blog3,
    badge: 'Html',
    date: 'Aug 10, 2024',
    view: '28,567 Views',
    title: '10 กิจกรรมที่คนขอนแก่นห้ามพลาด!',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name: 'David William'
  },
  {
    id: 4,
    img: blog3,
    badge: 'Html',
    date: 'Aug 9, 2024',
    view: '28,567 Views',
    title: '“Lonely Market” ถ้าคุณเหงาเราช่วยได้!',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name: 'David William'
  },
  {
    id: 5,
    img: blog3,
    badge: 'Html',
    date: 'Aug 8, 2024',
    view: '28,567 Views',
    title: 'This Week in Search: New Limits and Exciting Features',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name: 'David William'
  },


];


//Team

import team1 from '/images/team/team-1.jpg';
import team2 from '/images/team/team-2.jpg';
import team3 from '/images/team/team-3.jpg';
import team4 from '/images/team/team-4.jpg';

const Team: TeamSection[] = [
  {
    img: team1,
    title: "Michael Doe",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
    socialicon: [
      {
        url: "/",
        icon: "mdi mdi-facebook",
      },
      {
        url: "/",
        icon: "mdi mdi-twitter",
      },
      {
        url: "/",
        icon: "mdi mdi-instagram",
      },
      {
        url: "/",
        icon: "mdi mdi-youtube",
      },
    ],
  },
  {
    img: team2,
    title: "Michael Doe",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
    socialicon: [
      {
        url: "/",
        icon: "mdi mdi-facebook",
      },
      {
        url: "/",
        icon: "mdi mdi-twitter",
      },
      {
        url: "/",
        icon: "mdi mdi-instagram",
      },
      {
        url: "/",
        icon: "mdi mdi-youtube",
      },
    ],
  },
  {
    img: team3,
    title: "Michael Doe",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
    socialicon: [
      {
        url: "/",
        icon: "mdi mdi-facebook",
      },
      {
        url: "/",
        icon: "mdi mdi-twitter",
      },
      {
        url: "/",
        icon: "mdi mdi-instagram",
      },
      {
        url: "/",
        icon: "mdi mdi-youtube",
      },
    ],
  },
  {
    img: team4,
    title: "Michael Doe",
    subtitle: "Property Specialist",
    desc: "You can relay on our amazing features list and also our customer services will be great experience.",
    socialicon: [
      {
        url: "/",
        icon: "mdi mdi-facebook",
      },
      {
        url: "/",
        icon: "mdi mdi-twitter",
      },
      {
        url: "/",
        icon: "mdi mdi-instagram",
      },
      {
        url: "/",
        icon: "mdi mdi-youtube",
      },
    ],
  },
]

//Testimonial 

import profile1 from '/images/blog/cyrus.jpg';
import profile2 from '/images/blog/kriss.jpg';
import profile3 from '/images/blog/sara.jpg';


const TestimonialsData: Testimonials[] = [
  {
    img: profile1,
    testimonial: "หมดปัญหาอยากไปเที่ยวแต่เพื่อนไม่ว่าง ก็มี SERVF ครับไปเป็นเพื่อน",
    name: "SOMCHAI",
    rating: 5

  },
  {
    img: profile2,
    testimonial: "ชอบมากค่ะ บริการดี ทางออกที่ดีสำหรับคนเหงา ๆ และต้องการเพื่อนไปทำกิจกรรม",
    name: "SOMRAKS",
    rating: 4

  },
  {
    img: profile3,
    testimonial: "ใช้บริการ SERVF มาหลายรอบแล้วครับ บริการดี เอนจอย มั่นใจ ปลอดภัยแน่นอน",
    name: "SOMYING",
    rating: 5
  },
  // {
  //   img: profile3,
  //   testimonial: "sfsdfff is parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
  //   name: "Lasds AM",
  //   rating: 5
  // },
  // {
  //   img: profile3,
  //   testimonial: "sfsdsdffvcvcv Cras venene veliel vestibulum.",
  //   name: "LcvM",
  //   rating: 5
  // },


];

import facebook from '/images/icons/7.png';
import instagram from '/images/icons/8.png';
import line from '/images/icons/9.png';
import tiktok from '/images/icons/10.png';


const Iconsdata: Contact[] = [

  {
    url: "https://www.facebook.com/",
    img: facebook,
  },
  {
    url: "https://www.instagram.com/",
    img: instagram,
  },
  {
    url: "https://account.line.biz/login?redirectUri=https%3A%2F%2Fmanager.line.biz%2F",
    img: line,
  },
  {
    url: "https://www.tiktok.com/",
    img: tiktok,
  },
];




export { ServicesData, BuildFeaturesData, pricing, Portfolio, Blog, Team, TestimonialsData, Iconsdata };