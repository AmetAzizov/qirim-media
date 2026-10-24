import BreadCrumbs from '../components/common/BreadCrumbs';
import {EDITORIAL_POLICY, EDITORIAL_POLICY_TITLE} from './editorialPolicy';

export const metadata = {
    title: EDITORIAL_POLICY_TITLE
};

export default function PartnersPage() {
    return (
        <section className='px-4 pb-16'>
            <div className='mx-auto max-w-3xl'>
                <BreadCrumbs />
                <h1 className='title-text pb-8'>{EDITORIAL_POLICY_TITLE}</h1>

                <div className='space-y-8'>
                    {EDITORIAL_POLICY.map((section, index) => (
                        <article key={section.title}>
                            <h2 className='text-xl font-semibold mb-3 lg:text-2xl'>
                                {index + 1}. {section.title}
                            </h2>
                            <div className='space-y-3 text-base leading-relaxed'>
                                {section.paragraphs.map(p => (
                                    <p key={p}>{p}</p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
