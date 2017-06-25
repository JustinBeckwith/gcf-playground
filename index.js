const google = require('googleapis');

/**
 * This example uses nconf to store keys.  It expects a `keys.json` in the
 * same directory.  It should look like this:
 *
 *   {
 *     "YOUTUBE_KEY": "xxxxxxxxxxxxxxxxxxxx"
 *   }
 *
 * You can get a key like this by visiting the Google Developers Console,
 * going to the API Credentials section, and creating a new API key.
 */
const nconf = require('nconf');
nconf.env().file({
  file: 'keys.json'
});
const key = nconf.get('YOUTUBE_KEY');

const youtube = google.youtube({
  version: 'v3',
  auth: key
});

exports.tryit = (req, res) => {
  console.log("In endpoint");
  youtube.search.list({
    part: 'id,snippet',
    q: 'Node.js on Google Cloud'
  }, (err, data) => {
    if (err) {
      console.error('Error: ' + err);
      return res.status(500).send(err);
    }
    console.log(data);
    res.status(200).json(data);
  });
};