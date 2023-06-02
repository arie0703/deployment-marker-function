import request from 'request';
const apiKey = process.env.NEW_RELIC_API_KEY;

export const handler = async (event: any) => {

    const url = `https://api.newrelic.com/v2/applications/${event.NEW_RELIC_APP_ID}/deployments.json`;

    const headers = {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey
    }
    const dataString = JSON.stringify({
        "deployment": {
            "revision": event.COMMIT_HASH,
            "description": event.COMMIT_MESSAGE,
            "user": event.COMMIT_USER,
        }
    });
    const options = {
        url: url,
        headers: headers,
        body: dataString,
        method: "POST",
    };

    const response = await new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(body);
                resolve(body);
            }
        });
    });

    return response;

};
