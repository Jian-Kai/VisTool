const fs = require('fs')
fs.readFile('C:/Users/nuuser/routed-react/text.json', 'utf8',function(err,data){
    if(err) console.log(err)
    console.log(data)
  })