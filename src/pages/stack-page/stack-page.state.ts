export interface StackItem {
    value: string
    id: number
    isHead: boolean
}

interface IStack<T> {
    items: T[]
    getItems(): T[]
    push(item: T): void
    pop(): void
    peek(): T | undefined
    clear(): void
}

export class Stack<T extends StackItem> implements IStack<T> {
    items: T[]

    constructor() {
        this.items = []
    }

    public getItems(): T[] {
        return [...this.items]
    }

    public push(item: T): void {
        const lastItem = this.items.at(-1)

        if (lastItem) {
            lastItem.isHead = false
        }

        this.items.push(item)
    }

    public pop(): void {
        if (!this.items.length) return

        const preLastItem = this.items.at(-2)

        if (preLastItem) {
            preLastItem.isHead = true
        }

        this.items.pop()
    }

    public peek(): T | undefined {
        return this.items.at(-1)
    }

    public clear(): void {
        this.items = []
    }
}

export const stackController = new Stack<StackItem>()

export const STACK_CONTROLLER_ACTION_DURATION = 500
