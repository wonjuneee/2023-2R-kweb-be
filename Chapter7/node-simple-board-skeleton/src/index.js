require('./env');
const app = require('./app');

const { ArticleDAO, UserDAO } = require('./DAO');

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`KWEB Project: Listening on port ${port}.`);

	/*
	(async () =>{
		
		//await UserDAO.create('username1', 'password1', 'nickname1');
		//await UserDAO.create('username2', 'password2', 'nickname2');
		//await ArticleDAO.create('title1', 'content1', {id : 1});
		//await ArticleDAO.create('title2', 'content1', {id : 1});
		//await ArticleDAO.create('title3', 'content1', {id : 2});
		//console.log('done!');
			// user 및 article 새로 생성 -> 중복 실행 시 duplicate entry 에러가 발생한다.
		const user = await UserDAO.getByUsername("username1");
		console.log(user);
		const article = await ArticleDAO.getById(1);
		console.log(article);
		// 오브젝트 형태로 반환된다.
	})(); // 함수 형태로 실행해야 한다. 
	*/
});