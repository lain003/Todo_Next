import {TaskHash} from "@/app/server_actions/tasks";

export default class Task {
    id: number | undefined
    name: string
    description: string
    status: string

    constructor(hash: TaskHash) {
        this.id = hash.id
        this.name = hash.name
        this.description = hash.description
        this.status = hash.status
    }

    get_status_msg():string{
        let state_dic = { not_start: "未着手", in_progress: "着手中", complete: "完了" }
        return state_dic[this.status]
    }

    convert_num_status():number{
        const status_map = { not_start: 0, in_progress: 1, complete: 2}
        return status_map[this.status]
    }
}