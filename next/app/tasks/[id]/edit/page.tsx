"use client"

import {useFormState} from "react-dom";
import {formUpdateTask, getTask} from "@/app/server_actions/tasks";
import {useEffect, useState} from "react";
import Task from "@/app/models/task";


export default function TaskEditPage({ params }: { params: { id: number } }) {
    const [task, setAction] = useState<Task>()
    useEffect(() => {
        ;(async () => {
            const res = await getTask(params.id)
            setAction(new Task(res))
        })()
    }, [])

    const [state, formAction, isPending2] = useFormState(formUpdateTask, {});
    return (
        <div>
            {task ? (
                <form action={formAction}>
                    <input name="id" defaultValue={task.id} type="hidden"></input>
                    <input name="name" defaultValue={task.name}></input>
                    <br/>
                    <input name="description" defaultValue={task.description}></input>
                    <br/>
                    <select name="status" defaultValue={task.status}>
                        <option value="not_start">未着手</option>
                        <option value="in_progress">着手中</option>
                        <option value="complete">完了</option>
                    </select>
                    <br/>
                    <button type="submit">送信</button>
                </form>
            ): (
                <div>loading</div>
            )}

        </div>
    )
}
