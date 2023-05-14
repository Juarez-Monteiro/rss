import createDataContext from './createDataContext';
import AsyncStorage from "@react-native-async-storage/async-storage";


// salva o stado do fead
const saveStateFeeds = async (feeds) => {
    try { await AsyncStorage.setItem('feeds', JSON.stringify(feeds));}
    catch(err) {console.log(err);}
}
// limpar o stado do fead
const clearFeead = async () => {
    try {
        await AsyncStorage.removeItem('feeds');
        alert('Limpou todos os feeds salvos');
    }
    catch(e) { alert('Deu errado ao limpar feeds');}
}
/*O feedListReducer recebe um estado e uma ação, e retorna o novo estado. 
As ações definidas no objeto actions são addFeed, 
deleteFeed, restoreState e deleteAll, que recebem um dispatch como parâmetro. 
*/

const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            let id = state.length+1 // gera id para o novo feed
            let novoFeed = {titulo: action.payload.titulo, urlFeed:action.payload. urlFeed, id:id}        
            newState = [...state,novoFeed]
            saveStateFeeds(newState);// salva no estado
            return newState;

        case 'delete_feed':
           // Log's ultilizados para teste de fluxo
            console.log("antes")
            newState = state.filter((item)=>item.id !== action.payload)     
            console.log("depois")
            saveStateFeeds(newState);// salva no estado
        return newState;

        case 'restore_state':
           
            return newState;

        case 'delete_all':
            clearFeead ();
            return [];
        default:
            return state;
    }
};

/*O dispatch é uma função que recebe uma ação, chama o reducer passando o estado atual 
e a ação recebida, e atualiza o estado. 
As ações addFeed e deleteFeed recebem parâmetros 
adicionais que são passados para a ação que será executada.*/

const addFeed = dispatch => {
    return (titulo, urlFeed, callback) => {
        dispatch({type:"add_feed", payload: {titulo, urlFeed}})
        if(callback){
            callback()
        }
    };
};

const deleteFeed = dispatch => {
    return (id) => {
        // Log's ultilizados para teste de fluxo
        console.log(id)
        console.log("eita")
        dispatch({type:"delete_feed", payload:id})
    };
};

const restoreState = dispatch => async () => {
    return () => {
        dispatch({ type: 'restore_state' }); // chamando o reducer para restaurar o estado.
    }
}

const deleteAll = dispatch => {
    return () => {
        dispatch({ type: 'delete_all' }); // chamando o reducer para deletar todos os feeds
    }
}

/*const rssFeeds = [
    {
        id: 4,
        titulo: 'G1 - Todas as notícias',
        urlFeed: 'https://g1.globo.com/rss/g1/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        id: 3,
        titulo: 'G1 - Brasil',
        urlFeed: 'https://g1.globo.com/rss/g1/brasil/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        id: 2,
        titulo: 'G1 - Tecnologia e Games',
        urlFeed: 'https://g1.globo.com/rss/g1/tecnologia/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        id: 1,
        titulo: 'Jovem Nerd',
        urlFeed: 'http://jovemnerd.com.br/rss',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    }
    
];*/

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    []
);
