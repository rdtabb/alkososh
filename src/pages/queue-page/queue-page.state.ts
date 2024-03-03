export type QueueItem = {
    value: string
    id: number
} | null

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
        const copy = []
        const lastNonNullIndex = this.items.findLastIndex((elem) => elem !== null)

        if (lastNonNullIndex < 0) {
            this.items[0] = item
        } else {
            this.items[lastNonNullIndex + 1] = item
        }

        for (let i = 0; i < 7; i++) {
            const item = this.items[i]
            if (!item) {
                copy.push(null)
            } else {
                copy.push(item)
            }
        }
        this.setItems(copy)
    }

    dequeue(): void {
        const index = this.items.findIndex((elem) => elem !== null)
        this.items[index] = null
    }

    clear(): void {
        if (this.items.length) {
            this.items = []
        }
    }

    getItems(): QueueItem[] {
        return this.items
    }

    private setItems(items: QueueItem[]): void {
        this.items = items
    }
}

export const queueController = new Queue()

export const initialQueueState: QueueItem[] = [null, null, null, null, null, null, null]
export const QUEUE_CONTROLLER_ACTION_DURATION = 500
