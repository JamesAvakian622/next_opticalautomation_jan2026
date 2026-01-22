import ProjectDetailPage from './ProjectDetailPage';

export async function generateMetadata({ params }) {
    const projectTitles = {
        'e-commerce-platform': 'E-Commerce Platform',
        'task-management': 'Task Management App',
        'social-network': 'Social Network',
        'developer-portfolio': 'Developer Portfolio',
        'data-dashboard': 'Analytics Dashboard',
        'photo-gallery': 'Photo Gallery',
        'music-streaming': 'Music Streaming',
        'learning-platform': 'Learning Platform',
        'real-estate': 'Real Estate Portal',
        'delivery-tracking': 'Delivery Tracker',
        'fitness-app': 'Fitness Tracker',
        'cloud-storage': 'Cloud Storage',
        'cms-platform': 'CMS Platform',
        'mobile-banking': 'Mobile Banking',
        'travel-booking': 'Travel Booking',
        'stock-trading': 'Stock Trading',
        'smart-home': 'Smart Home Hub',
        'design-system': 'Design System',
        'api-platform': 'API Platform',
        'restaurant-pos': 'Restaurant POS'
    };

    const title = projectTitles[params.id] || 'Project Details';

    return {
        title: `${title} | Portfolio | Optical Automation`,
        description: `Learn more about our ${title} project - features, technology stack, and live demo.`
    };
}

export default function ProjectPage() {
    return <ProjectDetailPage />;
}
