import { Todo } from "./todo";

export class Playlist {
    name: string;
    todos?: Todo[];
    id?: string;
    owner: string;
    readers?: string[];
    writers?: string[];
    hasWritingRights?: boolean;

    constructor(name: string, todos?: Todo[]) {
        this.name = name;
        this.todos = todos ?? [];
    }
}
