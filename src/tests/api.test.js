const faker = require("faker");
const port = process.env.PORT || 3333;
const axios = require("axios").default;

describe('Basic API', () => {
    let request;

    it('should request total number of open issues', async () => {
      const repositoryName = 'nlw_5_nodejs';
      const repositoryOwner = 'Gabsjorge';
      const url = `http://localhost:${port}/${repositoryOwner}/${repositoryName}/issues/count`;
      
      const result = await axios({
        method: 'get',
        url
      });
      
      expect(result).toBe({
        totalIssues: 2
      })
      expect(axios).toHaveBeenCalledTimes(1);
    });

    it('should request average and standard deviation for open issues times', async () => {

    });
});
