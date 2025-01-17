npm install @nestjs/core @nestjs/common @nestjs/platform-express class-validator class-transformer

설치 비밀번호 암호화

npm install bcryptjs --save

import * as bcrypt from 'bcryptjs';

// 삭제
DELETE FROM `admin_board`.`auth` WHERE (`id` = '2');
DELETE FROM `admin_board`.`auth` WHERE (`id` = '3');

1. TypeORM을 사용하기 위해서 설치해야하는 모듈
@nestjs/typeorm
 -Nest.js에서 TypeOrm을 사용하기 위해 연동
npm install pg typeorm @nestjs/typeorm --save
//passport-jwt는 JWT를 검증하고 해독
npm install @nestjs/passport @nestjs/jwt passport-jwt


2. 애플리케이션에 jwt 모듈 등록
 2-1 auth 모듈 imports에 넣어주기

3. 애플리케이션에 Passport 등록
Passport
passport는 애플리케이션의 인증을 도와주는 Node.js용 미들웨어입니다. passport는 OAuth, JWT, HTTP 기본/다이제스트 등과 같은 다양한 인증 메커니즘에 알맞은 로직(전략)을 제공해 줍니다. 각 인증에 맞게 미리 만들어진 로직(전략)을 그대로 사용할 수도 있지만 우리 입맛에 맞게 확장할 수도 있습니다. 이러한 '전략'을 통한 유연한 인증을 가능케 하는 것이 passport입니다.

4. 유저 토큰 생성 ( Secret + Payload )
페이로드(payload)는 네트워크를 통해 전송되는 데이터의 내용을 의미합니다. http 요청에서 페이로드는 요청 바디에 포함됩니다. @Body 데코레이터를 이용하여 요청 바디에서 데이터를 추출할 수 있습니다. 먼저 DTO createUserDto 스키마를 정의해야 합니다. class를 사용하여 dto를 정의 하도록 합시다.

5.passport를 해서 요청안에서 유저 정보 얻기

Passport 란?
Node.js에서 (Nest도 Node.js를 기반으로 만들어짐) Authenticate(인증)를 적용할 때에, 편하게 사용할 수 있는 미들웨어이다. 마치 출입국자의 출입국 심사 인증을 하는 "여권(passport)"의 역할과 같은데, 클라이언트가 서버에 권한을 요청을 할 자격이 있는지 인증(검증)할 때에 "passport" 미들웨어를 사용한다. Nest는 이러한 토큰 인증(검증)에 있어서 passport의 사용을 권장하고 있다.

PassportStrategy의 생성자 파라미터로 StrategyOptions를 가진다는 것을 알 수 있고 즉, 우리가 생성한 JwtStrategy의 생성자 내부에서 super 키워드를 이용해서 부모 클래스 PassportStrategy의StrategyOptions를 불러 올 수 있게 된다.

constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      // secret key는 외부에 노출되면 안 되는 값이므로 환경변수나 config로 빼서 사용하는 것을 권장한다.
      secretOrKey: 'SECRET_KEY',
    })
  }
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

: jwtFromRequest를 작성하는 방법 중 하나이다. jwt로 생성해서 클라이언트 측으로 보냈던 토큰 값을 Header에 Bearer Token 값으로 실어 보내야 (요청해야) 서버에서 해당 토큰을 받아 검사할 수 있다.

ignoreExpiration: true

: 토큰이 만료되었는지 검사를 하게 되는데 해당 속성을 ture로 설정하면 만료되더라도 바로 strategy에서 에러를 리턴하지 않도록 해준다. 만약 false로 설정해주게 되면, 이는 JWT가 만료되지 않았음을 보증하는 책임을 Passport 모듈에 위임하게 된다. 즉, 만약 만료된 JWT를 받았을 경우, request는 거부되고 401 Unauthorized response를 보낼 것이다.

6. AuthGuard의 역할
 6-1. AuthGuard()는 인증 로직을 처리하는 가드입니다. NestJS에서는 이 가드를 사용하여 요청이 보호된 리소스에 접근할 때, 인증이 필요한지 여부를 확인합니다.

 6-2. AuthGuard() 기본 값
AuthGuard()는 passport 모듈과 연동되며, 기본적으로 passport-local 전략을 사용합니다. 즉, 명시적으로 전략 이름을 전달하지 않으면, 기본적으로 로컬 인증 전략(local)을 사용합니다.
예를 들어, AuthGuard('jwt')는 JWT 전략을 사용하지만, AuthGuard()는 기본적으로 로컬 전략을 사용합니다.

 6-3. 로컬 전략(passport-local)의 동작 방식
passport-local 전략은 사용자 이름과 비밀번호를 기반으로 사용자를 인증합니다. 이는 일반적인 로그인 폼에서 사용하는 방식입니다. 즉, AuthGuard()는 기본적으로 사용자 이름과 비밀번호를 요청 본문에서 가져와 인증하는 데 사용됩니다.

 6-4.시 코드
아래는 @UseGuards(AuthGuard())를 사용하는 간단한 예제입니다:
@UseGuards()는 요청이 처리되기 전에 실행되며, 가드가 요청을 허용하거나 거부합니다.



 // ** 요청안에 유저 정보(유저 객처)가 들어가게 하는 방법
 // validate 메소드에서 return 값을 user 객체로 주었습니다. 그래서 요청 값안에 user 객처가 들어있으면 하는데
 // 현재 요청을 보낼때는 user 객체가 없습니다. 어떠한 방식으로 가질수있을나요 
 // UseGuards 안에  @nestjs/passport에서 가져온 AuthGuard()를 이용하면 요청한에 유저 정보를 넣어줄수 있습니다.
 // Guards 가드는 인즈 미들웨어입니다. 지정된 경로로 통과할 수 있는 사람과 허용되지 않는 사람을 서버에 알려줍니다.


각각의 미들웨어가 불러지는(called) 순서
middleware -> guard -> interceptor (before) -> pipe -> controller -> service -> controller -> interceptor (after) -> filter (if applicable) -> client

설정하기 위해서 필요한 모듈

원도우에서는 win-node-env를 설치해야 한다.
(왜냐면 원도우에서는 기본적으로 환경변수를 지원하지 않기 때문입니다.)

npm install -g win-node-env

그리고 원도우와 맥 모두에서는 config라는 모듈을 설치받아야 한다.

npm install config --save


구성
구성은 세 가지 YAML 파일로 나뉩니다.
Config

1. default.yml
기본 설정 (기본 환경 설정이나 운영 환경 설정에도 적용됨)
server:
  port: 3000
db:
  type: 'mysql'
  port: 5432
  database: 'boardproject'
jwt:
  expiresIn: 3600

2. development.yml은 default.yml을 확장하고 다음을 추가합니다.
db:
  host: 'localhost'
  username: 'postgres'
  password: 'postgres'
  synchronize: true
jwt:
  secret: 'secret'

3. production.yml은 default.yml을 확장하고 다음을 추가합니다.
db:
  synchronize: false
yml 파일은 띄어 쓰기가 매우 중요한다.

synchronize: true는 무엇을 합니까?
TypeORM 구성에서 'synchronize: true'를 설정하면 TypeORM은 애플리케이션이 실행될 때마다 데이터베이스 스키마를 엔터티 정의와 자동으로 동기화하도록 지시합니다. 이는 TypeORM이 코드에 정의한 엔터티 클래스와 일치하도록 데이터베이스 테이블과 열을 자동으로 생성, 업데이트 또는 삭제한다는 것을 의미합니다.