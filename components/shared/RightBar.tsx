import React from 'react'

export default function RightBar () {
  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <div className='flex flex-col flex-1 justify-start'>
          <h3 className='text-heading4-medium text-light-1'>
            Suggested comminuties
          </h3>
        </div>
        <div className='flex flex-col flex-1 justify-start'>
          <h3 className='text-heading4-medium text-light-1'>
            Others comminuties
          </h3>
        </div>
        <div></div>
      </div>
    </section>
  )
}
