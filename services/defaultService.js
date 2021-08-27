const defaultServiceCall = require('../serviceCalls/defaultServiceCall');

const getDefaultData = async (req) => {
  try {
    const { param } = req.query;

    if (param.toLowerCase() === 'foo') {
      throw new Error(JSON.stringify({ statusCode: 404, message: 'No FOOling around' }));
    }
    const response = await defaultServiceCall(req);
    if (!response.importantProperty) {
      throw new Error('Oh no!');
    }
    return response;
  } catch (error) {
    throw new Error(JSON.stringify({ statusCode: 400, message: `Error from service call: ${error.message}` }));
  }
};

module.exports = { getDefaultData };
