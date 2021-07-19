import { Circle } from 'better-react-spinkit';

function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <img 
                src="https://play-lh.googleusercontent.com/OY4rxeNTPaHwyOTZ-RUooqJvPnO5QUYmQcw0dhD90Mu6UWItOSZfQv7ks_FscbBow0M" 
                alt=""
                style={{ marginBottom: 5, borderRadius: '50%' }}
                height={200}
                 />
            <Circle color="#4285F4" size={40}/>
            </div>
        </center>
    )
}

export default Loading
