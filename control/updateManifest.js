var fs = require('fs');

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

module.exports = function() {
    fs.readFile('../public/manifest.appcache','utf-8' ,function (err, data) {
        if (err){
            console.log("df");
            throw err;
        }
        console.log("kjnjnjknkjnkjn"+ data);
        var hashIndex = data.indexOf('#');
        var number = (data[hashIndex + 1]);
        if(number === '1'){
            number = '2';
        }else{
            number = '1';
        }
        console.log("myNumber " + number);
        var newData = data.replaceAt(hashIndex + 1, number );
        fs.writeFile('../public/manifest.appcache', newData, function(){console.log('done')})
    });
};