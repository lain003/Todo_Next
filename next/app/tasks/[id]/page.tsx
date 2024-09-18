"use client"

import Link from 'next/link'
import {useEffect, useState} from "react";
import {formDeleteTask, getTask, TaskHash} from "@/app/server_actions/tasks";
import {useFormState} from "react-dom";
import Task from "@/app/models/task";
export default function TaskPage({ params }: { params: { id: number } }) {
    const [task, setAction] = useState<Task>()
    useEffect(() => {
        ;(async () => {
            const res:TaskHash = await getTask(params.id)
            setAction(new Task(res))
        })()
    }, [])
    const [state, formAction, isPending] = useFormState(formDeleteTask, {});

    return (
        <div>
            name: {task?.name}
            <br/>
            description: {task?.description}
            <br/>
            state: { task?.get_status_msg()}
            <br/>
            <Link href="/tasks/">タスク一覧</Link>
            <br/>
            <Link href={`/tasks/${params.id}/edit`}>編集</Link>
            <br/>
            <form action={formAction}>
                <input name="id" defaultValue={params.id} type="hidden"></input>
                <button type="submit">削除</button>
            </form>
        </div>
    )
}
