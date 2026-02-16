import User from "../model/User.js";
import Message from "../model/Message.js";

export const getAllContacts = async (req, res) => {
     try{
         console.log("getAllContacts called");
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUser} }).select("-password");
        res.status(200).json(filteredUsers);
     }catch(error){
        console.log("error in getAllContacts:", error);
        res.status(500).json({message: "Internal server error"});
     }
}


export const  getMessageByUserId = async (req,res) => {
   try{
      const myId = req.user._id; //auth user from middelware = protectRoute
      const {id: userToChatId} = req.params; // {id: userToChatId} = getting id from url /param

      const messages= await Message.find({
         $or:[
            //some times we will be sender and receiver
            {senderId:myId,receiverId:userToChatId},
            {senderId:userToChatId,receiverId:myId}
         ]
      })
      res.status(200).json(messages);

   }catch(error){
      console.log("error in getMessageByUserId", error.message);
      res.status(500).json({message: "Internal server error"});
   }
}


export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

   //  checking is empt
    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }

   //  no self messaging
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "Cannot send messages to yourself." });
    }
   //  const receiverExists = await User.exists({ _id: receiverId });
   //  if (!receiverExists) {
   //    return res.status(404).json({ message: "Receiver not found." });
   //  }

   // uploading image to cloudinary
    let imageUrl;
    if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

   //  saving message to database - (message model)
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

   //  const receiverSocketId = getReceiverSocketId(receiverId);
   //  if (receiverSocketId) {
   //    io.to(receiverSocketId).emit("newMessage", newMessage);
   //  }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getChatPartner = async (req,res) => {
   try{
      const loggedInUserId = req.user._id;

      // finding all messages where the logged in user is either sender or receiver
      const messages = await Message.find({
         $or: [
            {senderId: loggedInUserId},
            {receiverId: loggedInUserId}
         ]
      });

      const chatPartnerIds = [
         ...new Set(
            messages.map((msg)=> msg.senderId.toString() === loggedInUserId.toString() 
         ? msg.receiverId.toString() 
         : msg.senderId.toString())),
      ];

      const chatPartners = await User.find({_id: {$in: chatPartnerIds}}).select("-password");

      res.status(200).json(chatPartners);

   }catch(error){
      console.log("Error in getChatPartner:", error.message);
      res.status(500).json({message: "Internal server error"});
   }
}