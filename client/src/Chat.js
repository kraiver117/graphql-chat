import React from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { addMessageMutation, messagesQuery, messageAddedSubscription } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({user}) => {
  // Use Query
  const {data} = useQuery(messagesQuery);
  const messages = data ? data.messages : [];

  // Use Mutation
  // const [addMessage, {loading, error, data, called}] = useMutation(addMessageMutation);
  const [addMessage] = useMutation(addMessageMutation);

  // Use Subscription
  // This method take cares about unsubscribing automatically
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({client, subscriptionData}) => {
      client.writeData({data: {
        messages: messages.concat(subscriptionData.data.messageAdded)
      }});
    }
  });

  const handleSend = async(text) => {
    // TODO
    await addMessage({variables: {input: {text}}});
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}

export default Chat;
