import React from 'react'
import { Store } from '../../../Context/ChatPrivider'
import './scrollableChat.scss'
function ScrollableChat(messages) {
  
  const {user}=Store()
  return (
   <div w={'100%'}>
     { messages.messages.map((message)=>{
       return<div className={message.senderId===user.id?'send_message':'resive_mesage'} key={message._id}>
         <p >{message.content}</p>
       </div>
     })
     }
   </div>
  )
}

export default ScrollableChat