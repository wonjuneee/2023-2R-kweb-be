//Code 5.1 Implementation of runQuery Function

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",   // <db-host>
    port: 3306,          // <db-port> -> MariaDB 설치할 때 설정했던 port #
    user: "kwebuser",    // <db-username>
    password: "kwebpw",  // <db-password>
    database: "kwebdb1", // <db-name>
});
// mysql2의 createPool를 통해 DB와 DB 사용자에 대한 정보를 담은 pool 생성
/* MySQL은 미리 pool(메모리)에 DB와의 connection들을 생성하여 저장하여
필요할 때마다 연결을 가져가(getConnection) 사용 후 반납(release) */

/*
const runQuery = async sql => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(sql);
        return result; // row들의 array 또는 만족하는 값이 없을 경우 Undefined 반환
    } finally {
        conn.release();
    }
};
*/


// Code 5.5 runQuery Function with Prepared Statement

const runQuery = async (pstmt, data) => {
    const conn = await pool.getConnection();
    try {
        const sql = conn.format(pstmt, data); // 입력값 검증
        const [result] = await conn.query(sql);
        return result;
    } finally {
        conn.release();
    }
};

module.exports = { runQuery };

/* Nodejs가 connection을 hold하며,
사용자가 몇 개의 connection 중특정 connection을 pool에게 요청하여 받아오고
사용 후 release하여 다른 사용자들도 connection을 사용할 수 있도록 함 */