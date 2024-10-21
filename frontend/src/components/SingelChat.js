import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import {ArrowBackIcon} from "@chakra-ui/icons";
import { getSender,getSenderFull } from '../config/ChatLogics';
import ProfileModel from './miscellaneous/ProfileModel';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';

const SingelChat = ({fetchAgain, setFetchAgain}) => {

    const [message, setMessage] = useState([]);
    const[loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    const toast = useToast();

    const {user , selectedChat, setSelectedChat} = ChatState();

    const sendMessage = async (event)=>{
      if(event.key === "Enter" && newMessage){
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization :`Bearer ${user.token}`
            },
          }
          setNewMessage("");
          const {data} = await axios.post('/api/message',{
            content:newMessage,
            chatId:selectedChat._id
          },config)
          console.log(data);
          setNewMessage("");
          setMessage([...message, data]);          
        } catch (error) {
          toast({
            title: "Error Occured",
            description: error.message,
            status:"error",
            duration:5000,
            isClosable:true,
            position: "bottom"
          })
        }
      }
    }
    const typingHandler = (e) => {
      setNewMessage(e.target.value);
    };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupchat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain} 
                />
              </>
            )}
          </Text>
          <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
          >
            {!loading ?(
              <Spinner
              size="xl"
              w={20}
              h={20}
              alignSelf="center"
              margin="auto"
              />
            ) :<div>
              {/* message */}
              </div>}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
              variant="filled"
              bg="#E0E0E0"
              placeholder='Enter a message..'
              onChange={typingHandler}
              value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingelChat