// Code 5.2 Usage of runQuery Function

const { runQuery } = require('./database');
// kwebdb1의 connection을 가져오기 때문에 이 파일에서 kwebdb1 내부의 테이블들에 접근 가능

const getScoreStats = async () => {
    const sql = 'SELECT course, Count(*) AS cnt, Avg(final) AS avg, ' +
        'Stddev(final) AS stddev FROM scores GROUP BY course';
    // runQuery함수에 SQL문을 인자로 전달하기 위해 SQL문 문자열을 sql 변수로 선언
    const results = await runQuery(sql);
    return results;
};

/*
const getScoreByIdName = async (id, name) => {
    const sql = `SELECT * FROM scores WHERE id = ${id} AND student = '${name}'`;
    const results = await runQuery(sql);
    return results[0];
};

const createScore = async (name, course, midterm, final) => {
    const sql = 'INSERT INTO scores ' +
        `VALUES (DEFAULT, '${name}', '${course}', ${midterm}, ${final})`;
    const result = await runQuery(sql);
    return result;
};
*/


// Code 5.6 Using Prepared Statement

const getScoreByIdName = async (id, name) => {
    const sql = 'SELECT * FROM scores WHERE id = ? AND student = ?';
    const results = await runQuery(sql, [id, name]);
    return results[0];
    /* results는 row들의 array 또는 undefined를 값으로 가질 수 있는데
    id값은 중복되지 않기 때문에 id와 같은 값을 가진 1개의 row 혹은 undefined가 담긴
	크기가 1인 배열이 반환되므로 idx = 0인 배열을 반환해도 같은 결과인 것이다. */
};
const createScore = async (name, course, midterm, final) => {
    const sql = 'INSERT INTO scores VALUES (DEFAULT, ?, ?, ?, ?)';
    const result = await runQuery(sql, [name, course, midterm, final]);
    return result;
}; // ?에 db 값들이 차례대로 입력되어 값들을 안전하게 넘길 수 있다.


(async () => {
    const stats = await getScoreStats();
    stats.forEach(stat => {
        const { course, cnt, avg, stddev } = stat;
        console.log(`${course} (${cnt} people): Average ${avg}, Std.Dev. ${stddev}`);
    });
    const scoreData = await getScoreByIdName(2, 'Joe');
    const { course, final } = scoreData;
    console.log(`Course: ${course} / Final score: ${final}`);
    console.dir(await getScoreByIdName(9, 'Barack'));
    const newScore = await createScore('Barack', 'Operating Systems', 83, 62);
    console.dir(await getScoreByIdName(9, 'Barack'));
    console.dir(await getScoreByIdName(newScore.insertId, 'Barack'));
    // insertId는 newScore로 생성된 새로운 row에 inserted된 Id값을 바로 불러올 수 있음
})();
// 비동기 함수를 한 번만 실행하기 위해 이름을 설정하지 않고 async 이후 arrow function 사용


// Code 5.3 SQL Injection Example - Force True Condition

const scoreData = await getScoreByIdName(3, "abc' OR '1'='1");
// (1) SELECT * FROM scores WHERE id = 3 AND student = 'abc' OR '1'='1'
// (2) SELECT * FROM scores WHERE id = 3 AND student = 'abc' OR '1'='1'
// (3) SELECT * FROM scores