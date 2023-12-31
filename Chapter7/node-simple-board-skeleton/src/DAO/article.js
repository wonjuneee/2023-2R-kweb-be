const { runQuery } = require("../lib/database");

const formatDate = date => {
  const yr = date.getFullYear();
  const mon = date.getMonth() + 1;
  const dt = date.getDate();
  const hrs = date.getHours();
  const mins = date.getMinutes();
  const secs = date.getSeconds();
  return `${yr}. ${mon}. ${dt} ${hrs}:${mins}:${secs}`;
};

const replaceDate = article => {
  if (article) {
    article.createdAt = formatDate(article.createdAt);
    article.lastUpdated = formatDate(article.lastUpdated);
    /* 타임스탬프 형식으로 저장되어 있는 정보를 문자열로 parsing하기 위해
    함수를 정의한 후 필요할 때마다 사용 */
  }
  return article;
};

const getList = async (start, count) =>{
    const sql = 'SELECT B.id AS id, title, created_at AS createdAt, ' +
                'last_updated AS lastUpdated, display_name AS displayName ' +
                'FROM users AS A INNER JOIN articles AS B ' +
                'ON A.id = B.author ' +
                'WHERE is_active = 1 AND is_deleted = 0 ' +
                'ORDER BY B.id DESC LIMIT BY ?, ?';
                // sql문이 굉장히 길어지므로 AS문으로 축약 가능!!
    var res = await runQuery(sql, [start, count]);
    return res.map(replaceDate);
    // for문으로 각 row마다 replaceDate 함수를 실행시켜도 된다.
};

const getTotalCount = async () =>{
    const sql = 'SELECT Count(*) AS cnt FROM ariticles ' +
                'WHERE is_active = 1 AND is_deleted = 0';
    var res = await runQuery(sql, []);
    res[0] = [{cnt : 1}];
    return res[0].cnt;
};

const getById = async (id) =>{
    const sql = 'SELECT B.id AS id, title, content, created_at AS createdAt ' +
                'last_updated AS lastUpdated, author, display_name AS displayName ' +
                'FROM users AS A INNER JOIN articles AS B ' +
                'ON A.id = B.author ' +
                'WHERE B.id = ? AND is_active = 1 AND is_deleted = 0';
    var res = await runQuery(sql, [id]);
    return res[0];
    /* 하나만 반환하더라도 하나의 배열로 나타나기 때문에
    게시물의 객체를 반환하기 위해 res가 받은 배열의 첫번째 값을 반환한다.*/
};

const getByIdAndAuthor = async (id, author) =>{
    const sql = 'SELECT title, content, author, created_at AS creaetedAt, last_updated AS lastUpdated ' +
                'FROM articles WHERE id = ? AND author = ? AND is_active = 1 AND is_deleted = 0';
    var res = await runQuery(sql, [id, author.id]);
    return res[0];
};

const create = async (title, content, author) =>{
    const sql = 'INSERT INTO articles VALUES (DEFAULT, ?, ?, ?.id, DEFAULT, DEFAULT, DEFAULT, DEFAULT)';
    var res = await runQuery(sql, [title, content, author.id]);
    return res.insertId;
    // insertId는 새로 생성된 row에 들어간 id값을 바로 가져올 수 있음
};

const update = async (id, title, content) =>{
    const sql = 'UPDATE articles SET title = ?, content = ? ' +
                'WHERE id = ?';
    await runQuery(sql, [title, content, id]);
};

const remove = async (id) =>{
    const sql = 'UPDATE articlces SET is_deleted = 1 ' +
                'WHERE id = ?';
    await runQuery(sql, [id]);
}; // 아카이빙; '이제 접근할 수 없는 게시물입니다' 등의 에러 표시 가능

module.exports = {
    getList,
    getTotalCount,
    getById,
    getByIdAndAuthor,
    create,
    update,
    remove
};