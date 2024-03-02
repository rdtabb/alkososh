export interface QueueItem {
    value: string
    id: number
}

interface IQueue<T> {
    items: T[]
    enqueue(item: T): void
    dequeue(): void
    clear(): void
    getItems(): T[]
}

export class Queue implements IQueue<QueueItem> {
    items: QueueItem[]

    constructor() {
        this.items = []
    }

    enqueue(item: QueueItem): void {
        this.items.unshift(item)
    }

    dequeue(): void {
        if (this.items.length !== 0) {
            this.items.pop()
        }
    }

    clear(): void {
        if (this.items.length) {
            this.items = []
        }
    }

    getItems(): QueueItem[] {
        return this.items
    }
}

export const queueController = new Queue()

export const QUEUE_CONTROLLER_ACTION_DURATION = 500
