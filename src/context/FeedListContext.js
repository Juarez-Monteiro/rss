import createDataContext from './createDataContext';

const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            let id = state.length+1
            let novoFeed = {titulo: action.payload.titulo, urlFeed:action.payload. urlFeed, id:id}        
            newState = [...state,novoFeed]
            return newState;
        case 'delete_feed':
            console.log("antes")
            newState = state.filter((item)=>item.id !== action.payload)     
            console.log("depois")
        return newState;
        case 'restore_state':
           
            return state;
        case 'delete_all':
            console.log('implementar');
            return state;
        default:
            return state;
    }
};

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
        console.log(id)
        console.log("eita")
        dispatch({type:"delete_feed", payload:id})
    };
};

const restoreState = dispatch => async () => {
    return () => {
        console.log('implementar');
    }
}

const deleteAll = dispatch => {
    return () => {
        console.log('implementar');
    }
}

const rssFeeds = [
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
    
];

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    []
);
