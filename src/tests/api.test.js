const faker = require("faker");
const port = process.env.PORT || 3333;
const axios = require("axios").default;

describe('Basic API', () => {
    // let request;

    test.only('should request total number of open issues', async () => {
      const repositoryName = 'nlw_5_nodejs';
      const repositoryOwner = 'Gabsjorge';
      const url = `http://localhost:${port}/${repositoryOwner}/${repositoryName}/issues/count`;
      
      const response = await axios({
        method: 'get',
        url
      });

      const data = response.data;
      
      expect(response.status).toBe(200);
      expect(data.totalIssues).toBeDefined();
      expect(data.totalIssues).toBeGreaterThanOrEqual(0);
    });

    test('should request average and standard deviation for open issues times', async () => {
      const repositoryName = 'nlw_5_nodejs';
      const repositoryOwner = 'Gabsjorge';
      const totalIssues = ''
      const url = `http://localhost:${port}/${repositoryOwner}/${repositoryName}/issues/${totalIssues}/time`;
      
      const response = await axios({
        method: 'get',
        url
      });

      const data = response.data;
      
      expect(response.status).toBe(200);
      expect(data.avgTime).toBeDefined();
      expect(data.stdTime).toBeDefined();
      expect(data.avgTime).toBeGreaterThanOrEqual(0);
      expect(data.stdTime).toBeGreaterThanOrEqual(0);
    });
});
