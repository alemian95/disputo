import AuthenticatedLayout from '@/Layouts/Themes/tailwindui/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Category, PageProps, Thread } from '@/types';
import PrimaryButton from '@/Components/Themes/tailwindui/PrimaryButton';
import CategoryBox from '@/Components/Themes/tailwindui/ui_components/Category';
import ThreadBox from '@/Components/Themes/tailwindui/ui_components/Thread';
import React from 'react';
import SecondaryButton from '@/Components/Themes/tailwindui/SecondaryButton';

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
                            className='font-semibold text-blue-950'
                        >
                            <span>Dashboard</span>
                        </Link>
                        {
                            breadcrumbs?.length &&
                            breadcrumbs.map((category, index) => {
                                return (
                                    <React.Fragment key={category.id}>
                                        <span>&raquo;</span>
                                        <Link
                                            href={route('dashboard.category', category.code)}
                                            className='font-semibold text-blue-950'
                                        >
                                            <span>{category.name}</span>
                                        </Link>
                                    </React.Fragment>
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
                    <div className="flex justify-between gap-6">
                        <div>
                            {
                                category
                                &&
                                breadcrumbs
                                &&
                                (
                                    <Link href={breadcrumbs.length >= 2 ? route('dashboard.category', breadcrumbs[breadcrumbs.length - 2].code) : route('dashboard')}><SecondaryButton>&laquo; Back</SecondaryButton></Link>
                                )
                            }
                        </div>
                        <div>
                            { canCreateThreads && <a href={`${route('threads.create')}${category ? `?category=${category.code}` : ""}`}><PrimaryButton>New Thread +</PrimaryButton></a> }
                        </div>
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
