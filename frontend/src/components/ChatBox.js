import React from 'react'
import {ChatState} from "../Context/ChatProvider"
import {Box} from "@chakra-ui/react"
import SingelChat from './SingelChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
 const {selectedChat} =  ChatState();

  return  <Box
  display={{base : selectedChat ? "flex" : "none" , md:"flex"}}
  alignItems="center"
  flexDir="column"
  p={3}
  bg="white"
  w={{base:"100%",md:"68%"}}
  borderRadius="lg"
  borderWidth="1px"
  >
    <SingelChat fetchAgain={fetchAgain} setFetchAgain ={setFetchAgain}/>
  </Box>
  
}

export default ChatBox