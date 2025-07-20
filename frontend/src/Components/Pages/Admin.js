import React from 'react'
import FetchUsers from '../FetchUsers';

function Admin({user}) {
    if(!user?.isAdmin){
        return <p>You are not authorized to view this section.</p>;
    }

  return (
    <div>
        <h3>Admin Panel</h3>
        <FetchUsers/>
    </div>
  )
}

export default Admin