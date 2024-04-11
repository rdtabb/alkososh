import { FormEvent } from 'react'

interface PerformDelayConfig {
    delayInMs: number
    setIsDelayPerforming?: (isPerforming: boolean) => void
}

export const preventDefault = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
}

export const performDelay = ({
    delayInMs,
    setIsDelayPerforming
}: PerformDelayConfig): Promise<void> => {
    setIsDelayPerforming?.(true)
    return new Promise((res) => {
        setTimeout(() => {
            res()
            setIsDelayPerforming?.(false)
        }, delayInMs)
    })
}
