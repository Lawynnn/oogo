import { MoveLeft } from 'lucide-react'
import React from 'react'

export default function BackButton(props) {
  return (
    <div className="back-button-container">
        <button className='back-button' {...props}><MoveLeft className='icon' /> Go back</button>
    </div>
  )
}
