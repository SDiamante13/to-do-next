export interface Task {
    id: string
    name: string,
    completed: boolean
}

export type Tasks = Array<Task>;