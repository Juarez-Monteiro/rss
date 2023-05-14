import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

const ShowFeedScreen = ({ route, navigation }) => {
    const feedListContext = useContext(FeedListContext);
    const feedID = route.params.id;
    console.log(feedID);
    const feed = feedListContext.state.find((feed) => feed.id === feedID);
    const { state, fetchItems } = useContext(FeedContext);
    
    useEffect(()=>{ 
        fetchItems(feed.urlFeed);
    },[])
    const abrirLink = (link) => {
        Linking.openURL(link);
    }

    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => {
                    //atualmente só exibe o título, faça com que apareça data de publicação, descrição (pode cortar em 100 ou 200 caracteres para não ficar muito grande), e imagem (caso tenha)
                    //ao clicar em uma notícia, devemos chamar a função abrirLink que direciona o usuário para o link da notícia
                    return (
                        <TouchableOpacity onPress={( )=> abrirLink(item.link)}>
                            <View style={styles.row}>
                                <Text style={styles.titulo}>{item.title} - {item.pubDate}</Text>
                                    <View style={styles.row1}> 
                                        <TouchableOpacity /*onPress={( )=> deleteItem(item.id)}*/>
                                            <Feather style={styles.icon} name="trash" />
                                        </TouchableOpacity>
                                    </View>
                                
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderTopWidth: 2,
        borderColor: 'gray'
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 10,
        
    
        
    },
    
    titulo: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 5
    },
    descricao: {
        fontSize: 8
    },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;
