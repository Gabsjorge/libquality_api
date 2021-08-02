const axios = require("axios").default;
const RepositoryController = require("../controllers/RepositoryController");

const port = process.env.PORT || 3333;
const gitBaseURL = 'https://api.github.com/repos/';
const projectBaseURL = `http://localhost:${port}/`;

const auth = {
    username: process.env.GITHUB_USERNAME,
    token: process.env.GITHUB_PAT
};

module.exports = {
    async getIssuesCount(req, res) {
        const { owner, repo } = req.params;

        const body = {
          name: repo,
          owner: owner,
        }

        try {
            const { data } = await axios({
                method: 'get',
                url: gitBaseURL + `${owner}/${repo}`,
                auth
            });

            const repoAlreadyExists = await axios({
              method: 'get',
              url: projectBaseURL + `repositories/${repo}/${owner}`,
            });

            if (!repoAlreadyExists.data.results) {
              const repo = await axios({
                method: 'post',
                url:  projectBaseURL + 'repositories',
                data: body
              })

              const search = await axios({
                method: 'post',
                url: projectBaseURL + `repositories/${repo.data.id}/searches`,
                data: {
                  user_id: null,
                  issues_count: data.open_issues,
                  issues_avg_time: null,
                  issues_std_time: null
                }
              });
              
            } else {
              const repoId = repoAlreadyExists.data.id;

              const search = await axios({
                method: 'post',
                url: projectBaseURL + `repositories/${repoId}/searches`,
                data: {
                  user_id: null,
                  issues_count: data.open_issues,
                  issues_avg_time: null,
                  issues_std_time: null
                }
              });
            }


            return res.json({
              totalIssues: data.open_issues
            });

          } catch (error) {

            return res.status(404).json({
              message: error.response.data.message
            });
          }
            
    },

    async getIssuesOpenTime(req, res) {
        const { owner, repo, totalIssues } = req.params;

        const body = {
          name: repo,
          owner: owner,
        }

        // Sets all auxiliary functions

        // Converts timestamp into date in miliseconds
        const convertTime = (date) => {
            return Date.parse(date);
        };
        
        const getTimeDiff = (time) => {
            const now = Date.now();
            let diff = now - time;
        
            diff = diff/(1000*60*60*24);
        
            return Math.floor(diff);
        };

        const avgIssueTime = (array) => {
            const numOfTimes = array.length;
            const sumOFTimes = array.reduce( (acc, curr) => acc + curr);
        
            return sumOFTimes / numOfTimes;
        };

        // std stands for Standard Deviation Time
        const stdIssueTime = (array) => {
            const avg = avgIssueTime(array);
            const numOfTimes = array.length;
      
            let variance = array.reduce( (acc, curr) => acc + Math.pow(avg - curr, 2) / numOfTimes, 0);
      
            return Math.sqrt(variance);
        };

        /* 
        * Calculates total number of pages necessary for pagination in GitHub request for issues
        * Needs to be rounded up always (Math.ceil), so it doesn't leave issues behind
        * Using 100 pages per page to get as many issues per page as possible
        */
        const totalPages = Math.ceil(totalIssues / 100);

        /* 
        * Because Axios is Promises-based to make requests, I'll use axios.all() to execute all
        * GitHub requests needed per page 
        */ 

        const pageRequest = (page) => {
            return axios({
                method: 'get',
                url: gitBaseURL + `${owner}/${repo}/issues?state=open&per_page=100/${page}`
            })
            .then(response => {
              let diffTimePerPage = response.data.map( issue => {
                let time = issue.created_at;

                time = convertTime(time);
                return getTimeDiff(time);
              });

              return diffTimePerPage;
            })
            .catch(error => {
              console.log(error);
            });
        };

        const executeAllRequests = () => {
            let totalPromises = [];
            
            for (let page = 0; page < totalPages ; page++) {
                totalPromises.push(pageRequest(page+1));
            }

            return totalPromises;
        }

        try {
            const response = await axios.all( executeAllRequests() )
            .then(
              axios.spread((data) => {
                  let result = [];

                  data.forEach( item => result.push(item));

                  return result;
              })
            );

            const repoAlreadyExists = await axios({
              method: 'get',
              url: projectBaseURL + `repositories/${repo}/${owner}`,
            });

            if (!repoAlreadyExists.data.results) {
              const repo = await axios({
                method: 'post',
                url:  projectBaseURL + 'repositories',
                data: body
              })

              const search = await axios({
                method: 'post',
                url: projectBaseURL + `repositories/${repo.data.id}/searches`,
                data: {
                  user_id: null,
                  issues_count: null,
                  issues_avg_time: avgIssueTime(response),
                  issues_std_time: stdIssueTime(response)
                }
              });
              
            } else {
              const repoId = repoAlreadyExists.data.id;

              const search = await axios({
                method: 'post',
                url: projectBaseURL + `repositories/${repoId}/searches`,
                data: {
                  user_id: null,
                  issues_count: null,
                  issues_avg_time: avgIssueTime(response),
                  issues_std_time: stdIssueTime(response)
                }
              });
            }

            return res.json({
                avgTime: avgIssueTime(response),
                stdTime: stdIssueTime(response)
            });
        } catch (error) {

            return res.status(404).json({
              message: error.response.data.message
            });
        }        
    }
}