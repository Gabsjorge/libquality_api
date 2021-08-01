const axios = require("axios").default;

const baseURL = 'https://api.github.com/repos/';

const auth = {
    username: process.env.GITHUB_USERNAME,
    token: process.env.GITHUB_PAT
};

module.exports = {
    async getIssuesCount(req, res) {
        const { owner, repo } = req.params;

        try {
            const { data } = await axios({
                method: 'get',
                url: baseURL + `${owner}/${repo}`,
                auth
            });

            return res.json({
              totalIssues: data.open_issues
            });

          } catch (error) {
            console.log(error);
          }
            
    },

    async getIssuesOpenTime(req, res) {
        console.log(req.params);
        const { owner, repo } = req.params;

        const totalIssues = this.getIssuesCount(req, res);
        
        // Sets all auxiliary functions
        const convertTime = () => {

        };

        const getTimeDiff = (time) => {
            const now = Date.now();

            return now - convertTime(time);
        };

        const avgIssueTime = () => {

        };

        // std stands for Standard Deviation Time
        const stdIssueTime = () => {

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
                url: baseURL + `${owner}/${repo}/issues?state=open&per_page=100/${page}`
            })
        };

        const executeAllRequests = () => {
            const totalPromises = [];
            
            for (let page in totalPages) {
                totalPromises.push(pageRequest(page));
            }

            return totalPromises;
        }

        
        try {
            axios.all(executeAllRequests);
        } catch (error) {
            throw error;
        }

        return res.json({
            avgTime: avgIssueTime(),
            stdTime: stdIssueTime()
        });
    }
}