import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Context } from '../context/FeedListContext';


const FeedForm = ({ navegacao }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const { addFeed } = useContext(Context);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleLinkChange = (text) => {
    setLink(text);
  };

  const handleSubmit = () => {
    addFeed(title, link, ()=>navegacao.navigate('Index'));
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={handleTitleChange}
      />
      <TextInput
        placeholder="Link"
        value={link}
        onChangeText={handleLinkChange}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default FeedForm;