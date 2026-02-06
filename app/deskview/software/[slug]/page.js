import { generatePageMetadata } from '@/lib/metadata';
import { softwareData, getAllSoftwareSlugs } from '@/lib/softwareData';
import SoftwareDetailPage from './SoftwareDetailPage';

export async function generateStaticParams() {
    return getAllSoftwareSlugs().map((slug) => ({
        slug: slug
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const software = softwareData[slug];

    if (!software) {
        return generatePageMetadata('deskview', 'Software not found');
    }

    return {
        ...generatePageMetadata('deskview', `${software.title} - ${software.category}`),
        title: `${software.title} | Optical Automation`,
        description: software.description
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    return <SoftwareDetailPage slug={slug} />;
}
