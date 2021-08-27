module.exports = {
  '../services/defaultService': {
    getDefaultData: async () => ({
      importantProperty: 'ok',
    }),
  },
  '../serviceCalls/defaultServiceCall': async () => ({
    importantProperty: 'ok',
  }),
};
