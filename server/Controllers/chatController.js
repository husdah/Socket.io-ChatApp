const chatModel = require("../Models/chatModel");

//createChat
const createChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.body;

        const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } });
        
        if (chat) return res.status(200).json(chat);

        //create chat
        const newChat = await chatModel.create({ members: [firstId, secondId] });
        return res.status(200).json(newChat);
    } catch (error) {
        conslog(error);
        res.status(500).json(error);
    }
}

//getUserChats
const findUserChats = async (req, res) => {
    try {
        const userId = req.params.userId;
        const chats = await chatModel.find({ members: { $in: [userId] } });
        return res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

//findChat
const findChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.body;
        const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } });
        return res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createChat, findUserChats, findChat }