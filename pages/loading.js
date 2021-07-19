import React from 'react'
import { Circle } from 'better-react-spinkit'

function loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <img 
                src="https://play-lh.googleusercontent.com/OY4rxeNTPaHwyOTZ-RUooqJvPnO5QUYmQcw0dhD90Mu6UWItOSZfQv7ks_FscbBow0M" 
                alt=""
                style={{ marginBottom: 5, borderRadius: '50%' }}
                height={200}
                 />
            </div>
            <Circle color="#4285F4" size={60}/>
        </center>
    )
}

export default loading
