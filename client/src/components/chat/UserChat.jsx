import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from '../../assets/avatar.gif';
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers, notifications, markThisUserNotificationAsRead } = useContext(ChatContext);
    const { latestMessage } = useFetchLatestMessage(chat)
    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserUnreadNotifications = unreadNotifications?.filter((notification) => (notification.senderId === recipientUser?._id));
    
    const truncateText = (text) => {
        let shortText = text.substring(0, 20);
        if(text.length > 20){
            shortText += '...';
        }
        return shortText
    }
    return ( 
    <>
        <Stack 
            direction="horizontal" 
            gap={3} 
            className="user-card align-items-center p-2 justify-content-between" 
            role="button"
            onClick={() => {
                if(thisUserUnreadNotifications?.length !== 0){
                    markThisUserNotificationAsRead(thisUserUnreadNotifications, notifications);
                }
            }}
        >
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} alt="avatar" height={50} width={50} style={{borderRadius: '50%'}}/>
                </div>
                <div className="text-content">
                    <div className="name">{recipientUser?.name}</div>
                    <div className="text">{
                        latestMessage?.text && (
                            <span>{truncateText(latestMessage?.text)}</span>
                        )
                    }</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
                <div className={thisUserUnreadNotifications?.length > 0 ? "this-user-notifications" : ""}>{thisUserUnreadNotifications?.length > 0 ? thisUserUnreadNotifications?.length : ''}</div>
                <span className={onlineUsers?.some((onlineUser) => (onlineUser.userId === recipientUser?._id)) ? "user-online" : ""}></span>
            </div>
        </Stack>
    </> );
}
 
export default UserChat;