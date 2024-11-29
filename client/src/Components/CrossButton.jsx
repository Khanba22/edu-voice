import React from 'react'

const CrossButton = ({setShowPopUp}) => {
  return (
    <button onClick={()=>{setShowPopUp(false)}} className='h-16 font-bold aspect-square absolute right-4 top-4 bottom-0'>
      X
    </button>
  )
}

export default CrossButton
