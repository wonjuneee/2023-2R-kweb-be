const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const readDirectory = async (currDir) =>{
    try{
        const files = await readdir(currDir);
        for(const file of files){
            const Path = path.join(currDir, file);
            if((await stat(Path)).isDirectory()){
            // stat(Path) 실행 후 Stats가 반환된 후에 isDirectory가 실행될 수 있다.
            // await 미실행 시 콜백함수를 통해 stat(Path)의 값을 도출한 뒤 isDirectory를 실행해야 함.
                await readDirectory(Path);
            }
            else if(path.extname(file) == '.js')
                console.log(Path);
        }
    }
    catch(err){
        console.error(err);
    }
}

readDirectory('./test');

/*  line 13~16을 콜백함수로 표현해본다면 
    if(stat(Path, (err, info) =>{
        info.isDirectory();
    })
        readDirectory(Path, (err) =>{
            if(err) consol.error(err);
        })
*/