//state
const getDefaultState = () => 
{
    return {      
        token:null,        
        user:null
    }
}
const state = getDefaultState();

//mutations
const mutations = {
    setToken: (state,token) => {     
        state.token = token;
    },
    setUser: (state,user) => {
        state.user = user;
    },
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const getters= {
    Authenticated: state => {
        return state.token != null && state.user != null; 
    },
    Token : state => {
        return state.token;
    }, 
    User : state => {
        return state.user;
    },
    AtributeUser : (state) => (key) =>
    {           
        return state.user == null?'':state.user[key];
    },
    can : (state) => (name)=>
    {
        if (state.user == null)
        {
            return false;
        }
        else if (state.user.issuperadmin)
        {
            return true;
        }
        else
        {
            let permissions = state.user.permissions;                
            return name in permissions ? true : false;                
        }
    }
}
const actions = {
    afterLoginSuccess ({commit},data)
    {
        commit('setToken',data.token);
        commit('setUser',data.user);
    }
}
export default {
    namespaced: true,
    state,        
    mutations,
    getters,
    actions
}