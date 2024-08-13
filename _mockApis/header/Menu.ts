
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
        title: 'Review',
        componentId:'testimonials'
    },
    {
        title: 'About Us',
        componentId:'features'
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
