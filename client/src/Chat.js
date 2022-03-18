import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useChatMessages } from './hooks/useChatMessages';

const Chat = ({user}) => {
  // Use Query
  // const {data} = useQuery(messagesQuery);
  // const messages = data ? data.messages : [];

  // Use Mutation
  // const [addMessage, {loading, error, data, called}] = useMutation(addMessageMutation);
  // const [addMessage] = useMutation(addMessageMutation);

  // Use Subscription
  // This method take cares about unsubscribing automatically
  // useSubscription(messageAddedSubscription, {
  //   onSubscriptionData: ({client, subscriptionData}) => {
  //     client.writeData({data: {
  //       messages: messages.concat(subscriptionData.data.messageAdded)
  //     }});
  //   }
  // });

  // Custom Hook
  const {messages, addMessage} = useChatMessages();

  // const handleSend = async(text) => {
  //   await addMessage({variables: {input: {text}}});
  // }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={addMessage} />
      </div>
    </section>
  );
}

export default Chat;
