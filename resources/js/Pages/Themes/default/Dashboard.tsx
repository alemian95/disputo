import AuthenticatedLayout from '@/Layouts/Themes/default/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import PrimaryButton from '@/Components/Themes/default/PrimaryButton';
import { CategoryBox } from '@/Components/Themes/default/ui_components/CategoryBox';
import { ThreadBox } from '@/Components/Themes/default/ui_components/ThreadBox';

export default function Dashboard( { categories, threads, category, breadcrumbs, canCreateThreads } : { categories: Category[], threads?: Thread[], category?: Category, breadcrumbs?: Category[], canCreateThreads: boolean } ) {

    const { auth } = usePage<PageProps>().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className='flex flex-row gap-4'>
                        <Link
                            key={0}
                            href={route('dashboard')}
                            className='font-semibold text-indigo-600'
                        >
                            <span>Dashboard</span>
                        </Link>
                        {
                            breadcrumbs && breadcrumbs.length &&
                            breadcrumbs.map((category, index) => {
                                return (
                                    <>
                                        <span>&raquo;</span>
                                        <Link
                                            key={category.id}
                                            href={route('dashboard.category', category.code)}
                                            className='font-semibold text-indigo-600'
                                        >
                                            <span>{category.name}</span>
                                        </Link>
                                    </>
                                )
                            })
                        }
                    </div>
                </>
            }
        >
            <Head title={category?.name || "Dashboard"} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end gap-6">
                        { canCreateThreads && <a href={`${route('threads.create')}${category ? `?category=${category.code}` : ""}`}><PrimaryButton>New Thread +</PrimaryButton></a> }
                    </div>
                </div>
            </div>

            {
                (categories && categories.length)
                ?
                <div className="py-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                                {
                                    categories.map((category, index) => {
                                        return (
                                            <CategoryBox category={category} key={index} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }

            {
                (threads && threads.length)
                ?
                <div className="py-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                                {
                                    threads.map((thread, index) => {
                                        return (
                                            <ThreadBox thread={thread} key={index}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }

            {
                (threads && threads.length == 0)
                ?
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                                No threads for this category
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </AuthenticatedLayout>
    );
}
