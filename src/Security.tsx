import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function Security( item: { component: JSX.Element } ) : JSX.Element {

  const [login, setLogin] = useState(true)  
  const loc = useLocation()
  useEffect(() => {
    if ( loc.state ) {
        //console.log( loc.state )
    }else {
      setLogin(false)
    }
  }, [])


  return login ? item.component : <Navigate to='/'></Navigate>
}

export default Security