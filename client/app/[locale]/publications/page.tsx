import PublicationsClient from "@/app/[locale]/publications/PublicationsClient";
import BreadCrumbs from "@/app/[locale]/components/common/BreadCrumbs";
import {getPublications} from '../lib/newsPosts';
import {getCurrentLocale} from "@/app/[locale]/utils/getCurrentLocale";

export default async function Publications() {
    const locale = getCurrentLocale();
    const start = 0;
    const limit = 30;
    const initialPosts = await getPublications(start, limit, locale);

    return (
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <BreadCrumbs/>
                <h2 className={'title-text pb-9'}>Публікації</h2>
                <div className={'pt-6'}>
                    <PublicationsClient initialPosts={initialPosts} locale={locale}/>
                </div>
            </div>
        </section>

    )
}

