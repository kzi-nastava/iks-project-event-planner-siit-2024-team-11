export interface Chat {
    chatId: number,
    otherId: number,
    otherName: string,
    otherPicture: string,
    lastMessageTime: Date
}

export interface Message {
    senderId: number,
    message: string,
    timestamp: Date
}

export interface MessageList {
    allMessages: Message[]
}