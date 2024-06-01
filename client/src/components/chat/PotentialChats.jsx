import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    
    return ( 
    <>
        <div className="all-users">
            {potentialChats &&  (
                potentialChats.map((u, index) => {
                    return (
                        <div key={index} className="single-user" onClick={() => createChat(user._id, u._id)}>
                            {u.name}
                            <span className={onlineUsers?.some((onlineUser) => (onlineUser.userId === u._id)) ? "user-online" : ""}></span>
                        </div>
                    )
                })
            )}
        </div>
    </> 
    );
}
 
export default PotentialChats;