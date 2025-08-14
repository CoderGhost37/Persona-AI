"use client"

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { MessageLoading } from '@/components/message-loading';
import { Avatar } from '@/components/avatar';
import { SendIcon } from 'lucide-react';
import { ChatHeader } from '@/components/chat-header';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState<string>('')

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat/piyush',
        }),
        messages: [
            {
                id: 'initial',
                role: 'assistant',
                parts: [{
                    type: 'text',
                    text: 'Hello! How can I help you today?'
                }]
            }
        ]
    });

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    }, [messages]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage({
            parts: [{ type: 'text', text: input }]
        });
        setInput('')
    }

    return (
        <>
            <ChatHeader profile='piyush' />
            <main className="relative max-w-screen-md px-4 md:px-6 mx-auto flex min-h-[calc(100svh-56px)] pt-4">
                <div className="w-full h-[calc(100svh-56px-100px)] overflow-auto">
                    {messages.map((message, index) => (
                        <div key={index} className={cn(
                            "mb-4 flex items-start gap-4 p-4 md:p-5 rounded-2xl",
                            message.role === 'user' ? "" : "bg-primary-50",
                        )}>
                            <Avatar profile='piyush' isUser={message.role === 'user'} />
                            {message.parts.map(part => {
                                if (part.type === 'text') {
                                    return <div key={`${message.id}-text`} className='py-1.5 md:py-1 space-y-4'>{part.text}</div>;
                                }
                            })}
                        </div>
                    ))}

                    {/* loading */}
                    {status === 'submitted' && <MessageLoading profile='piyush' />}

                    {/* bottom ref */}
                    <div ref={messagesEndRef} />
                </div>

                <div
                    className={cn(
                        "fixed z-10 bottom-0 inset-x-0",
                        "flex justify-center items-center",
                        "bg-background",
                    )}
                >
                    <div className="w-full max-w-screen-md rounded-xl px-4 md:px-5 py-4">
                        <form
                            onSubmit={onSubmit}
                            className="relative m-auto flex items-center gap-4 justify-center"
                            ref={formRef}
                        >

                            <input
                                placeholder="Type your message..."
                                required
                                className={cn(
                                    "transition h-10 md:h-12 pl-4 pr-12 flex-1 rounded-xl",
                                    "border text-base",
                                    "bg-card",
                                )}
                                type="text"
                                disabled={status === 'streaming'}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            <Button
                                type="submit"
                                tabIndex={-1}
                                disabled={status === 'streaming'}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <SendIcon />
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}