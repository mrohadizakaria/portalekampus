//state
const getDefaultState = () => 
{
    return {      
        loaded:false, 
        //page
        pages:[],
        daftar_ta:[],
        tahun_masuk:0,
        default_dashboard:null
    }
}
const state = getDefaultState();

//mutations
const mutations = {   
    setNewPage(state, page)
    {
        state.pages.push(page);                
    },
    replacePage (state,page,index)
    {
        state.pages[index]=page;            
    },
    removePage(state,page)
    {
        var i;
        for (i = 0;i < state.pages.length;i++)
        {                
            if(state.pages[i].name==page.name)
            {
                state.pages.splice(i,1);
                break;
            }
        }
    },  
    setLoaded(state,loaded)
    {
        state.loaded=loaded;
    },
    setDashboard(state,name)
    {
        state.default_dashboard=name;
    },
    setDaftarTA(state,daftar)
    {
        state.daftar_ta=daftar;
    },
    setTahunMasuk(state,tahun)
    {
        state.tahun_masuk=tahun;
    },    
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const getters= {
    getDefaultDashboard: state => 
    {   
        return state.default_dashboard;
    },
    getDaftarTA: state => 
    {   
        return state.daftar_ta;
    },
    getTahunMasuk: state =>
    {
        return parseInt(state.tahun_masuk);
    }
}
const actions = {    
    init: async function ({commit,state,rootGetters},ajax)
    {   
        if (!state.loaded && rootGetters['auth/Authenticated'])
        {   
            commit('setTahunMasuk',rootGetters['uifront/getTahunPendaftaran']);   
            let token=rootGetters['auth/Token'];                                                     
            await ajax.get('/system/setting/uiadmin',               
                {
                    headers:{
                        Authorization:token
                    }
                }
            ).then(({data})=>{                   
                commit('setDaftarTA',data.daftar_ta);            
                commit('setLoaded',true);              
            });      
        }
    }, 
    changeDashboard({commit},name)
    {        
        commit('setDashboard',name);
    },
    addToPages ({commit,state},page)
    {
        let found = state.pages.find(halaman => halaman.name==page.name);
        if (!found)
        {
            commit('setNewPage',page);
        }
    },
    updatePage ({commit,state},page)
    {
        var i;
        for (i = 0;i < state.pages.length;i++)
        {                
            if(state.pages[i].name==page.name)
            {
                break;
            }
        }
        commit('replacePage',page,i)
    }, 
    updateTahunMasuk({commit},tahun)
    {
        commit('setTahunMasuk',tahun);
    },
    reinit ({ commit }) 
    {
        commit('resetState');
    },
}
export default {
    namespaced: true,
    state,        
    mutations,
    getters,
    actions
}