export class ListNode<T> {
    value: T
    next: ListNode<T> | null

    constructor(value: T) {
        this.value = value
        this.next = null
    }
}

interface ILinkedList<T> {
    tail: ListNode<T> | null
    head: ListNode<T> | null
    length: number
    addToTail(value: T): void
    addToHead(value: T): void
    removeFromTail(): void
    removeFromHead(): void
    insertAtIndex(index: number, value: T): void
    deleteAtIndex(index: number, value: T): void
    getList(): ILinkedList<T>
    clear(): void
}

export class LinkedList implements ILinkedList<string> {
    tail: ListNode<string> | null
    head: ListNode<string> | null
    length: number

    constructor() {
        this.tail = null
        this.head = null
        this.length = 0
    }

    addToTail(value: string): void {
        const node = new ListNode(value)
        if (!this.head) {
            this.head = node
            this.tail = node
            this.length++
            return
        }
        if (this.tail) {
            this.tail.next = node
            this.tail = node
            this.length++
            return
        }
    }

    addToHead(value: string): void {
        const node = new ListNode(value)
        if (!this.head) {
            this.head = node
            this.tail = node
            this.length++
            return
        }
        node.next = this.head
        this.head = node
        this.length++
    }

    removeFromHead(): void {
        const current = this.head
        if (!current) {
            return
        }
        this.head = current.next
        this.length--
    }

    removeFromTail(): void {
        if (!this.head || !this.head.next) {
            return
        }
        let second_last_node = this.head
        while (second_last_node.next?.next) {
            second_last_node = second_last_node.next
        }
        second_last_node.next = null
        this.length--
    }

    insertAtIndex(index: number, value: string): void {
        if (index < 0 || index > this.length) {
            return
        }
        const node = new ListNode(value)

        if (!this.head) {
            this.head = node
            this.tail = node
            this.length++
            return
        }

        let prev: ListNode<string> | null | undefined = null
        let current: ListNode<string> | null | undefined = this.head
        let loopidx = 0

        while (loopidx < index) {
            prev = current
            current = current?.next
            loopidx++
        }

        node.next = current
        if (prev?.next) {
            prev.next = node
        }
        this.length++
    }

    deleteAtIndex(index: number): void {
        if (index < 0 || index > this.length || !this.head) {
            return
        }

        let prev: ListNode<string> | null = null
        let current: ListNode<string> | null = this.head
        let loopidx = 0

        while (loopidx < index) {
            prev = current
            current = current?.next as ListNode<string> | null
            loopidx++
        }

        if (prev && current) {
            prev.next = current?.next
        }

        this.length++
    }

    getList(): LinkedList {
        return structuredClone(this)
    }

    clear(): void {
        this.head = null
        this.tail = null
        this.length = 0
    }
}

export const linkedListController = new LinkedList()
