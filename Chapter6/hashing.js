// Code 6.1 Simple Example of SHA-512 Hashing
const util = require('util');
const crypto = require('crypto');

const pbkdf2 = util.promisify(crypto.pbkdf2); //pbkdf2 : crypto 모듈의 메서드

/* pbkdf2의 인자
1. password : 암호화할 문자열
2. salt // salt를 통해 암호화하고자 하는 텍스트를 변조(salting)하는 것으로 해시 함수의 입력값으로 사용
3. iterations : 반복 횟수 즉, 함수 실행 횟수를 결정 (많이 할수록 복잡하지만 시간이 오래 걸림)
4. key-length : 'byte' 단위의 key 길이
5. algorithm : 사용할 해시 함수 알고리즘
*/

const encrypt = async text => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const digest = await pbkdf2(text, '', 1, KEY_LEN, ALGO);
    console.log(`${text} | ${digest.toString('base64')}`);

    console.log(`byteLength : ${digest.byteLength}`);
}; // 비동기 함수로써 실행됨

(async () => await encrypt('samplepassword'))();
(async () => await encrypt('samplepastword'))();
// 하나의 문자만 다르더라도 해시 키가 굉장히 달라지며, 이를 '눈사태 효과'라고 함


// Code 6.3 Salting Input Text (Derived from Code 6.1)
const randomBytes = util.promisify(crypto.randomBytes);

const encrypt2 = async text => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32);
    const digest = await pbkdf2(text, salt, 1, KEY_LEN, ALGO);
    console.log(`${text} | ${salt.toString('base64')} | ${digest.toString('base64')}`);
};

// Code 6.4 Key Stretching of Hashing(Derived from Code 6.3)
const encrypt3 = async text => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32);
    const iter = Math.floor(Math.random() * 20000) + 200000;
    const digest = await pbkdf2(text, salt, iter, KEY_LEN, ALGO);
    // salt, iter, 암호화된 pw를 모두 DB에 저장할 필요가 있지만 레인보우 테이블 사용을 어렵게 할 수 있다.
    console.log(`${text} | ${iter} | ${digest.toString('base64')}`);
}


// Code 6.5 Password Generation(Derived from Code 6.4)
const generatePassword = async password => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32);
    const iter = Math.floor(Math.random() * 20000) + 200000;
    const digest = await pbkdf2(password, salt, iter, KEY_LEN, ALGO);
    return `${ALGO}:${salt.toString(
        'base64',
    )}:${iter}:${KEY_LEN}:${digest.toString('base64')}`;
    // salt, iter, pw를 각각의 열에 저장할 경우 DB 열람 시 각각이 어떤 값인지 확인이 가능하므로
    // 하나의 문자열 형태로 정보들을 저장하여 유출 시 악용될 가능성을 줄일 수 있다.
};
