import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members?.find((member) => member !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if(!recipientId) return null

            if(recipientId){
                const response = await getRequest(`${baseUrl}/users/find/${recipientId}`)
                if(response.error){
                    setError(response.message || "An unknown error occurred")
                    return
                }
                setRecipientUser(response)
            }
        }   

        getUser()
    },[recipientId])

    return { recipientUser }
}