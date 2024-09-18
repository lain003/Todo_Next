"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import Task from "@/app/models/task";
import {getTasksPagination, PaginationHash} from "@/app/server_actions/tasks";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

export default function TasksPage() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page'));
    const [tasks, setAction] = useState<[Task]>()
    const [pagination, setPaginationAction] = useState<PaginationHash>()
    useEffect(() => {
        ;(async () => {
            const tasks_pagination_hash = await getTasksPagination(page)
            let tasks: Task[] = [];
            tasks_pagination_hash.tasks.map((task_hash) => {
                tasks.push(new Task(task_hash))
            })
            setAction(tasks)
            setPaginationAction(tasks_pagination_hash.pagination)
        })()
    }, [searchParams])

    const [selectedStatus, setSelectedFruit] = useState('');

    const router = useRouter();
    const redirectTask = (id: number | undefined) => {
        router.push(`/tasks/${id}`);
    };

    const newTask = () =>{
        router.push(`/tasks/new`);
    }

    return (
        <div>
            {tasks && pagination ? (
                <div>
                    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700 py-2">
                        <select value={selectedStatus} onChange={e => setSelectedFruit(e.target.value)}
                                className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Select Filter</option>
                            <option value="not_start">未着手</option>
                            <option value="in_progress">着手中</option>
                            <option value="complete">完了</option>
                        </select>
                        <button type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={() => newTask()}>
                            Task生成
                        </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                ID:
                            </th>
                            <th className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Name:
                            </th>
                            <th className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Action:
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {tasks.filter(task => selectedStatus == "" || task.status == selectedStatus).map(({id, name}) => (
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={id}>
                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <Link href={'/tasks/' + id}
                                          className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{id}</Link>
                                </td>
                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <Link href={'/tasks/' + id}
                                          className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{name}</Link>
                                </td>
                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            onClick={() => redirectTask(id)}>
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px text-base h-10">
                            {page > 1 ? (
                                <Link href={`/tasks?page=${page - 1}`}
                                      className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
                            ) : (
                                <span
                                    className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                            )}
                            {Array(pagination.totalPages).fill(null).map((_, index) => (
                                <li key={index}>
                                    {index + 1 == pagination.current ? (
                                        <Link aria-current="page" href={`/tasks?page=${index + 1}`}
                                              className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{index + 1}</Link>
                                    ) : (
                                        <Link href={`/tasks?page=${index + 1}`}
                                              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index + 1}</Link>
                                    )}
                                </li>
                            ))}
                            {page < pagination.totalPages ? (
                                <Link href={`/tasks?page=${page + 1}`}
                                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
                            ) : (
                                <span
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                            )}
                        </ul>
                    </nav>
                </div>
            ) : (<div>loading</div>)}
        </div>
    );
}
