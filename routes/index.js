const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, avatar, Name, Logo, JobTitle FROM tbl_card";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
        res.render('home', { people: result });
    })
})

//  localhost:3000/anything
router.get('/:id', (req, res) => {
    console.log('hit a dynamic route!');
    console.log(req.params.id);

    let query = `SELECT * FROM tbl_bio WHERE profID="${req.params.id}"`;

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array


        // turn on social property into an array - it's just text in the DB,
        // which isn't really anything we can work with

        result[0].social = result[0].social.split(",").map(function(item) {
            item = item.trim(); // remove the extra spaces from each word

            return item;
        })

        console.log('after aplit: ', result[0]);

        // send the DB query back to the browser
        res.json(result);
})

})
module.exports = router;