export default {
  state: {
    messages: [],
  },
  mutations: {
    MESSAGE(state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp,
      });
    },
    REMOVE(state, num) {
      state.messages.splice(num, 1);
    },
    TIMEREMOVE(state, timestamp) {
      state.messages.forEach((item, num) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(num, 1);
        }
      });
    },
  },
  actions: {
    messagePush(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('MESSAGE', { message, status, timestamp });
      setTimeout(() => {
        context.commit('TIMEREMOVE', timestamp);
      }, 1500);
    },
    messageRemove(context, num) {
      context.commit('REMOVE', num);
    },
  },
};
