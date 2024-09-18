"use server";

import {getClient} from "@/app/lib/apollo_client";
import {
    CreateTaskDocument,
    CreateTaskInput,
    DeleteTaskDocument,
    DeleteTaskInput,
    GetTaskDocument,
    GetTaskQuery, GetTasksPaginationDocument, GetTasksPaginationQuery,
    UpdateTaskDocument,
    UpdateTaskInput
} from "@/graphql/codegen/graphql";
import {ApolloError} from "@apollo/client";
import {redirect} from "next/navigation";
import {revalidateTag} from "next/cache";
import Task from "@/app/models/task";

export type TaskHash = {
    id: number | undefined,
    name: string
    description: string
    status: string
};

export type PaginationHash = {
    current: number,
    totalPages: number
}

export type TasksPaginationHash = {
    tasks: TaskHash[],
    pagination: PaginationHash
}

export type State = {
    error_message?: string | null;
};

export async function getTask(id: number): Promise<TaskHash> {
    const { data: queryData } = await getClient().query<GetTaskQuery>({
        query: GetTaskDocument,
        variables: { id: id }
    })
    const task = queryData['task']
    return {id: task.id, name: task.name, description: task.description, status: task.status}
}

export async function getTasksPagination(page: number): Promise<TasksPaginationHash> {
    const { data: queryData } = await getClient().query<GetTasksPaginationQuery>({
        query: GetTasksPaginationDocument,
        variables: { page: page },
        context: {
            fetchOptions: {
                next: { tags: ['task'] }
            }
        }
    })
    return queryData['tasksPagination']
}

export async function formCreateTask(state: State, formData: FormData): Promise<State> {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const status = Number(formData.get("status"));
    let task
    try {
        task = await createTask(name, description, status)
    } catch (e: unknown) {
        if (e instanceof ApolloError) {
            if (e.message == 'E1') {
                return {error_message: "名前を入力してください"}
            }
        }
        throw e
    }
    redirect(`/tasks/${task.id}`)
}
async function createTask(name: string, description: string, status: number): Promise<State> {
    const {data: queryData} = await getClient().mutate<CreateTaskInput>({
        mutation: CreateTaskDocument,
        variables: {input: {name: name, description: description, status: status}}
    });
    revalidateTag('task')
    return queryData['createTask']['task']
}

export async function formUpdateTask(state: State, formData: FormData): Promise<State> {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const id = formData.get("id") as number;
    const status = formData.get("status") as string;
    let task_hash:TaskHash = {id: id, name: name, description: description, status: status};
    let task:Task = new Task(task_hash);
    try {
        task = await updateTask(task.id as number, task.name, task.description, task.convert_num_status())
    } catch (e: unknown) {
        if (e instanceof ApolloError) {
            if (e.message == 'E1') {
                return {error_message: "名前を入力してください"}
            }
        }
        throw e
    }
    redirect(`/tasks/${task.id}`)
}

async function updateTask(id: number, name: string, description: string | null, status: number) {
    const {data: queryData} = await getClient().mutate<UpdateTaskInput>({
        mutation: UpdateTaskDocument,
        variables: {input: {id: id, name: name, description: description, status: status}}
    });
    revalidateTag('task')
    return queryData['updateTask']['task']
}

export async function formDeleteTask(state: State, formData: FormData): Promise<State> {
    const id = formData.get("id") as number;
    await deleteTask(id)
    redirect(`/tasks?delete=${id}`)
}

async function deleteTask(id: number) {
    const {data: queryData} = await getClient().mutate<DeleteTaskInput>({
        mutation: DeleteTaskDocument,
        variables: {input: {id: id}}
    });
    revalidateTag('task')
}
