import React, { useEffect, useState } from 'react'

function HeaderTitle( item: { headerTitleRef: React.RefObject<HTMLHeadingElement> } ) {

const [title, setTitle] = useState("Şifreli Not")    
useEffect(() => {
    setTimeout(() => {
        //setTitle("Notlarını Şifrele")
    }, 5000);
}, [])

return (
    <>
        <h1 className='display-5' ref={ item.headerTitleRef } > { title } </h1>
    </>
  )
}

export default HeaderTitle