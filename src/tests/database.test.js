const faker = require("faker");
const RepositoryController = require("../controllers/RepositoryController");
const SearchController = require("../controllers/SearchController");
const axios = require("axios");

const request = (url, method, data) => {
  return axios({ 
    url,
    method,
    data
  });
};

const dbBaseURL = 'http://localhost:3333';

describe('Database', () => {
  
  test('should create a repository entry', async () => {
    const repoEntry = { name: faker.lorem.word(), owner: faker.lorem.word() };

    const response = await request(`${dbBaseURL}/repositories`, 'post', repoEntry);

    const repo = response.data;

    expect(response.status).toBe(200);
    expect(repo.id).toBeDefined();
    expect(repo.owner).toBeDefined();
    expect(repo.name).toBeDefined();
    expect(repo.createdAt).toBeDefined();
    expect(repo.updatedAt).toBeDefined();
    expect(repo.name).toBe(repoEntry.name);
    expect(repo.owner).toBe(repoEntry.owner);
  });
  
  test.only('should delete a repository entry', async () => {
    const repoEntry = { name: faker.lorem.word(), owner: faker.lorem.word() };

    const response = await request(`${dbBaseURL}/repositories`, 'post', repoEntry);

    const repo = response.data;

    expect(response.status).toBe(200);
    expect(repo.id).toBeDefined();
    expect(repo.owner).toBeDefined();
    expect(repo.name).toBeDefined();
    expect(repo.createdAt).toBeDefined();
    expect(repo.updatedAt).toBeDefined();
    expect(repo.name).toBe(repoEntry.name);
    expect(repo.owner).toBe(repoEntry.owner);
    
  });
  
  it('should create a search entry', async () => {
    const repoEntry = { name: faker.lorem.word(), owner: faker.lorem.word() };
    //TODO: create search entry linked to the repository entry above

    const response = await request(`${dbBaseURL}/repositories`, 'post', repoEntry);

    const repo = response.data;

    expect(response.status).toBe(200);
    expect(repo.id).toBeDefined();
    expect(repo.owner).toBeDefined();
    expect(repo.name).toBeDefined();
    expect(repo.createdAt).toBeDefined();
    expect(repo.updatedAt).toBeDefined();
    expect(repo.name).toBe(repoEntry.name);
    expect(repo.owner).toBe(repoEntry.owner);
    
  });

  it('should delete a search entry', async () => {

  });

});
