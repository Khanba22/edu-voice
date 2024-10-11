import React from 'react'

const CrossButton = ({setShowPopUp}) => {
  return (
    <button onClick={()=>{setShowPopUp(false)}} className='h-16 bg-blue-950 aspect-square absolute right-12 top-12 bottom-0'>
      X
    </button>
  )
}

export default CrossButton
