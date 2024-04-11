import { SetStateAction } from 'jotai'
import { useState, createContext, type PropsWithChildren, useMemo, useContext } from 'react'

interface ListPageContextState {
    isAddingToTail: boolean
    isAddingToHead: boolean
    isDeletingFromTail: boolean
    isDeletingFromHead: boolean
    isInserting: boolean
    isDeletingAtIndex: boolean
    performingIndecies: number[]
    performedIndex: number | null
    setIsAddingToTail: React.Dispatch<SetStateAction<boolean>>
    setIsAddingToHead: React.Dispatch<SetStateAction<boolean>>
    setIsDeletingFromTail: React.Dispatch<SetStateAction<boolean>>
    setIsDeletingFromHead: React.Dispatch<SetStateAction<boolean>>
    setIsInserting: React.Dispatch<SetStateAction<boolean>>
    setIsDeletingAtIndex: React.Dispatch<SetStateAction<boolean>>
    setPerformingIndecies: React.Dispatch<SetStateAction<number[]>>
    setPerformedIndex: React.Dispatch<SetStateAction<number | null>>
}

const ListPageContext = createContext<ListPageContextState>({
    isAddingToTail: false,
    isDeletingFromTail: false,
    isDeletingFromHead: false,
    isAddingToHead: false,
    isInserting: false,
    isDeletingAtIndex: false,
    performingIndecies: [],
    performedIndex: null,
    setIsAddingToHead: () => {},
    setIsDeletingFromHead: () => {},
    setIsInserting: () => {},
    setIsDeletingFromTail: () => {},
    setIsAddingToTail: () => {},
    setIsDeletingAtIndex: () => {},
    setPerformingIndecies: () => {},
    setPerformedIndex: () => {}
})

export const ListPageContextProvider = ({ children }: PropsWithChildren) => {
    const [isAddingToTail, setIsAddingToTail] = useState<boolean>(false)
    const [isAddingToHead, setIsAddingToHead] = useState<boolean>(false)
    const [isDeletingFromTail, setIsDeletingFromTail] = useState<boolean>(false)
    const [isDeletingFromHead, setIsDeletingFromHead] = useState<boolean>(false)
    const [isInserting, setIsInserting] = useState<boolean>(false)
    const [isDeletingAtIndex, setIsDeletingAtIndex] = useState<boolean>(false)
    const [performingIndecies, setPerformingIndecies] = useState<number[]>([])
    const [performedIndex, setPerformedIndex] = useState<number | null>(null)

    const contextValue: ListPageContextState = useMemo(
        () => ({
            isInserting,
            isDeletingFromHead,
            isDeletingFromTail,
            isAddingToHead,
            isAddingToTail,
            isDeletingAtIndex,
            performingIndecies,
            performedIndex,
            setIsAddingToTail,
            setIsDeletingFromTail,
            setIsInserting,
            setIsDeletingFromHead,
            setIsAddingToHead,
            setPerformingIndecies,
            setIsDeletingAtIndex,
            setPerformedIndex
        }),
        [
            isInserting,
            isDeletingFromTail,
            isDeletingFromHead,
            isAddingToTail,
            isAddingToHead,
            performedIndex,
            performingIndecies
        ]
    )

    return <ListPageContext.Provider value={contextValue}>{children}</ListPageContext.Provider>
}

export const useListPageContext = () => useContext(ListPageContext)

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
    insertAtIndex(index: number, value: T, cb: (index: number) => Promise<any>): void
    deleteAtIndex(index: number, cb: (index: number) => Promise<any>): void
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

    async insertAtIndex(
        index: number,
        value: string,
        callback: (...any: any[]) => Promise<any>
    ): Promise<void> {
        console.log('wtf')
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
            console.log('inside loop index', loopidx)

            await callback(loopidx)
        }

        node.next = current
        if (prev?.next) {
            prev.next = node
        }
        this.length++
    }

    async deleteAtIndex(index: number, callback: (...any: any[]) => Promise<any>): Promise<void> {
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
            console.log('inside loop index', loopidx)
            await callback(loopidx)
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

export const LIST_ACTION_DURATION = 500
export const linkedListController = new LinkedList()
