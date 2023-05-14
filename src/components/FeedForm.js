import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Context } from '../context/FeedListContext';

/*formulário para cadastrar noticia e rebebe uma prop navegação 
que deverá ser utlizada quando para redirecionamento quanddoo clicado
no button submit*/

const FeedForm = ({ navegacao }) => {
 //criação de stados 
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const { addFeed } = useContext(Context);

  //funções para setar title e Linck  
  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleLinkChange = (text) => {
    setLink(text);
  };

  //função que chama as funções acima
  const handleSubmit = () => {
    addFeed(title, link, ()=>navegacao.navigate('Index'));
  };

  //exiber o formuliario
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