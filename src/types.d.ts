interface User {
    id: number,
    name: string,
    age?: number
}

interface Note {
    id: number,
    userId: number,
    text: string
}