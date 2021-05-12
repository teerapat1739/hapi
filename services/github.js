const axios = require('axios').default
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: process.env.GIT_HUB_TOKEN });

exports.Github = async (q, page) => {
    let links = {}, data = {}, total_count
    const per_page = 2
    try {
        const response = await octokit.request('GET /search/repositories', {
            q,
            per_page,
            page
          })
        
        const link = response.headers.link;

        if (link) {
            link.replace(/<([^>]*)>;\s*rel="([\w]*)\"/g, function (m, uri, type) {
                links[type] = uri.split('&').pop();
            });
        }

        data = response.data.items
        total_count = response.data.total_count

        return { links, data, total_count }

    } catch (error) {
        return {}
    }


}