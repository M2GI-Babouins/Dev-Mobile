import { Todo } from "./todo";

export class Playlist {
    name: string;
    todos?: Todo[];
    id?: string;

    constructor(name: string, todos?: Todo[]) {
        this.name = name;
        this.todos = todos ?? [];
    }
}
