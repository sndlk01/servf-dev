
export interface menu {
    header?: string;
    title?: string;
    children?: menu[];
    to?: string;
    componentId?:string;
}

const sidebarItem: menu[] = [
    {
        title: 'Home',
        to: '/',
        
    },
    {
        title: 'Review',
        to: 'Testimonials',
        componentId:'Testimonials'
    },
    {
        title: 'About Us',
        to: 'BuildFeature',
        componentId:'BuildFeature'
    },
    {
        title: 'Contact Us',
        to: 'Contact',
        componentId: 'Contact'
    },
    {
        title: 'Blogs',
        to: 'BlogSection',
        componentId: 'BlogSection'
    },
];

export default sidebarItem;
