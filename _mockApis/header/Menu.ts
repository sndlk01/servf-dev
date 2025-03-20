
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
         componentId:'hero'
        
    },
    {
        title: 'About Us',
        componentId:'features'
    },
    {
        title: 'Booking',
        componentId:'team'
    },
    {
        title: 'Review',
        componentId:'testimonials'
    },
    
    {
        title: 'Contact Us',
        componentId: 'contact'
    },
    {
        title: 'Blogs',
        componentId: 'blog'
    },
];

export default sidebarItem;
