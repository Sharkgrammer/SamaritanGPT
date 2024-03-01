import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state() {
        return {
            key: "",
            save: false,
            seenPopup: false,
        }
    },
    mutations: {
        setKey(state, key) {
            state.key = key;
        },
        setSave(state, save) {
            state.save = save;
        },
        setPopup(state, seenPopup) {
            state.seenPopup = seenPopup;
        },
    },
    getters: {
        key: state => state.key,
        save: state => state.save,
        seenPopup: state => state.seenPopup,
    },
    plugins: [createPersistedState()]
});
