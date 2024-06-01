import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications} = useContext(ChatContext)
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            if (!chat) return null;
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);
            if (response.error) {
                return console.log("Error fetching messages", response.message || "An unknown error occurred");
            }

            const latestMessage = response[response?.length - 1];
            setLatestMessage(latestMessage);
        };
        getMessages();
    }, [newMessage, notifications]);

    return { latestMessage };
}