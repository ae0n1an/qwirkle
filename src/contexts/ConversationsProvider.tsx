import React, { useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { usePlayers } from './PlayersProvider'
import { useSocket } from './SocketProvider'

type ConversationContextType = {
    conversations: any;
    selectedConversation: {
      "recipiants": Recipient[],
      "messages": Message[],
      "selected": boolean
    };
    sendMessage: (recipiants: Recipient[], text: string) => void;
    selectConversationIndex: any;
    createConversation: (recipiants: Recipient[]) => void;
}

export type Recipient = { 
  id: string, 
  name : string 
}

type Message = {
  senderName: string; 
  fromMe: boolean; 
  sender: string; 
  text: string;
}

type ConversationType = {
    recipiants: Recipient[],
    messages: Message[]
}[]

const ConversationsContext = React.createContext<ConversationContextType>(
    {
        conversations: [],
        selectedConversation: {
          "recipiants": [],
          "messages": [],
          "selected": true
      },
        sendMessage: (recipiants: Recipient[], text: string) => {},
        selectConversationIndex: undefined,
        createConversation: (recipiants: Recipient[]) => {}
    })

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children } : {id: string, children: ReactNode}) {
  const [conversations, setConversations] = useLocalStorage('conversations', [{
    "recipiants": [],
    "messages": [],
    "selected": true
}])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { players } = usePlayers()
  const socket = useSocket()

  function createConversation(recipiants: Recipient[]) {
    setConversations((prevConversations: ConversationType) => {
      return [...prevConversations, { recipiants, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipiants, text, sender}: {recipiants: Recipient[], text: string, sender: string}) => {
    setConversations((prevConversations: ConversationType) => {
      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConversations.map
      (conversation => {
        if (arrayEquality(conversation.recipiants, recipiants)) 
        {
          madeChange = true
          return { ...conversation, messages: [...conversation.messages, newMessage]}
        }

        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          { recipiants, messages: [newMessage]}
        ]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)

    return () => {socket.off('receive-message')}
  }, [socket, addMessageToConversation])

  function sendMessage(recipiants: Recipient[], text: string) {
    socket?.emit('send-message', { recipiants, text })
    addMessageToConversation({recipiants, text, sender: id})
  }
  
  const formattedConversations = conversations.map((conversation: {recipiants: string[], messages: {sender: string, text: string }[]}, index: number) => {
    const recipiants = conversation.recipiants.map(recipiant => {
      const player = players.find(contact => {
        return contact.id === recipiant
      })
      const name = (player && player.name) || recipiant
      return { id: recipiant, name }
    })

    const messages = conversation.messages.map((message : {sender: string, text: string}) => {
      const player = players.find(player => {
        return player.id === message.sender
      })
      const name = (player && player.name) || message.sender
      const fromMe = id === message.sender
      return {...message, senderName: name, fromMe }
    })

    const selected = index === selectedConversationIndex
    return {...conversation, messages, recipiants, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}


function arrayEquality(a: Recipient[], b: Recipient[]) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index:number) => {
    return element === b[index]
  })
}