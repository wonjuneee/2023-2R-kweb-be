import { runQuery } from "../lib/database";

const getByUsername = async (username) => {
    const sql = 'SELECT id, password, display_name AS displayName, ' +
                'is_active AS isActive, is_staff AS isStaff ' +
                'FROM users WHERE username = ?';
    var res = await runQuery(sql, [username]); // data에 대한 배열을 받기 때문
    return res[0];
};

const create = async (username, password, displayName) =>{
    const sql = 'CREATE INTO users VALUES (DEFAULT, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT';
    await runQuery(sql, [username, displayName, password]);
}; // 반환 값이 없으므로 함수만 실행해도 된다.

module.exports ={
    getByUsername,
    create
};