import React from 'react'

function MessageArea({allConversations}) {
  return (
    <div>
      {
        allConversations&&allConversations.map((conversation)=>{
          return (
            <div>
              <h2>{conversation.message}</h2>
              <p>{conversation.createdAt.toDate().toString()}</p>
            </div>
          )
        })
        
      }
    </div>
  )
}

export default MessageArea