import './App.css';
import {useEffect, useState, useRef} from 'react';
import { Recipient, useConversations } from './contexts/ConversationsProvider';
import useLocalStorage from './hooks/useLocalStorage';

type ChatBoxProps = {

}

function ChatBox(props: ChatBoxProps) {
    const [text, setText] = useState('')
    const [players, setPlayers] = useLocalStorage('id', undefined)
    const lastMessageRef = useRef<HTMLInputElement>(null)
    const { sendMessage, selectedConversation, createConversation, selectConversationIndex} = useConversations()

    function handleSubmit(e: any) {
        e.preventDefault(selectedConversation);
        sendMessage(
            selectedConversation.recipiants.map((r: Recipient) => r), 
            text
        )
        setText('')
    };

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({behavior: "smooth"})
        }
    })
    
    return (
        <div>
            <div style={{ overflowY: "scroll", border: "2px solid black", height:"200px", width: "300px"}}>
                {selectedConversation.messages.map((message : {senderName: string; fromMe: boolean; sender: string; text: string;}, index: number) =>
                {
                    const lastMessage = selectedConversation.messages.length - 1 === index
                    return (
                        <div 
                            ref={lastMessage ? lastMessageRef : null}
                            key={index} 
                            style={{textAlign:(message.fromMe ?  "right" : "left")}}
                        >
                            <b>{message.fromMe ? 'You: ' : message.senderName+ ': '}</b>
                            {message.text}
                        </div>
                    )
                }
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <br></br>
                <input type="text" onChange={e => setText(e.target.value)} value={text} required></input>
                <br></br>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default ChatBox