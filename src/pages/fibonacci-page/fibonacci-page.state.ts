export function fibonacci(number: number): number {
    if (number === 1 || number === 0) {
        return 0
    }
    if (number === 2) {
        return 1
    }

    return fibonacci(number - 1) + fibonacci(number - 2)
}

export const FIBONACCI_ACTION_DURATION = 500
