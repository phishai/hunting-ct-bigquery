const BigQuery = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
    projectId: 'phish-ai-production'
});
const dataset = bigquery.dataset('phish_ai_ct_log');

// CHANGE THIS SEARCH STRING
const search_string = 'ENTER YOUR SEARCH STRING HERE!!!!';

var query = 'SELECT "argon2018" as log,* FROM `phish_ai_ct_log.argon2018` where REGEXP_CONTAINS(subject_common_name,r"' + search_string  + '") ' +
            'union all SELECT "argon2019" as log,* FROM `phish_ai_ct_log.argon2019` where REGEXP_CONTAINS(subject_common_name,r"' + search_string  + '") ' +
            'union all SELECT "argon2020" as log,* FROM `phish_ai_ct_log.argon2020` where REGEXP_CONTAINS(subject_common_name,r"' + search_string  + '") ' +
            'union all SELECT "argon2021" as log,* FROM `phish_ai_ct_log.argon2021` where REGEXP_CONTAINS(subject_common_name,r"' + search_string + '") order by valid_from desc limit 100';

return bigquery.query({query: query}).then((rows) => {
    for (var i = 0; i < rows[0].length; i++) {
        console.log(rows[0][i]);
    }
});