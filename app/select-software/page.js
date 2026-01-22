import { generatePageMetadata } from '@/lib/metadata';
import SelectSoftwarePage from './SelectSoftwarePage';

export const metadata = {
    ...generatePageMetadata('select-software', 'Choose your software applications based on your subscription tier. Select from 40 professional applications.'),
};

export default function Page() {
    return <SelectSoftwarePage />;
}
