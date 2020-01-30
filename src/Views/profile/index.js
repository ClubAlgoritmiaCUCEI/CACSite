import React from 'react'

import './style.css'

const Profile = ({match}) =>{
    console.log(match);
    const {uid} = match.params;
    console.log(uid);
    return (
        <div className="cac_profile">
            {uid ? uid : "pagina personal :)"}
        </div>
    )
}
export default Profile;