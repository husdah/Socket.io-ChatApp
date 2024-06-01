const messageModel = require("../Models/messageModel");

//createMessage
const createMessage = async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;
        const newMessage = await messageModel.create({ chatId, senderId, text });
        return res.status(200).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

//getMessages
const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await messageModel.find({ chatId });
        return res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createMessage, getMessages }