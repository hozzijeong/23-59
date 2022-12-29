# **하루 결산 기록 사이트, 23:59✍️**

### `하루의 끝🕛에 작성하는 하루 결산 기록 사이트`

## 1. 서비스 소개

### 🛠️ 기술 스택
![image](/uploads/4c76399b80c31022f75b1c61720dce22/image.png)

### 👀 웹서비스 개요

```
'매일 쓰는 일기, 쓰고 싶은 부분만 골라서 기록할 순 없을까?' 라는 질문에서 시작했어요.
오늘 하루의 Todo list, 일기, 감정, 가계부, 오늘의 질문 중에 쓰고 싶은 것만 골라서 기록하고,
달력을 눌러 날마다 작성한 내용을 확인할 수 있어요.
마이페이지에서는 한 달의 감정 및 가계부 통계를 확인하고, 오늘의 질문을 모아볼 수 있어요.
```

## 2. 서비스 주요 기능 설명

### ✨ 페이지별 기능 소개

  <details open>
  <summary>로그인,회원가입 페이지</summary>
  ![회원가입_로그인](/uploads/e91c5de429a82a48111ccef3e18d8068/회원가입_로그인.gif)
  1. 이메일, 비밀번호 유효성 체크<br/>   
  2. 이메일 중복 체크   
</details>
<details open>
  <summary>홈 페이지</summary>
  ![홈페이지](/uploads/b04450a95ecf622c8cb25aadefb997b7/홈페이지.gif)
  1. 첫 로그인 모달 페이지 기본 옵션 설정 저장<br/>      
  2. 달력에서 다이어리 요약본 확인      
</details>
<details open>
  <summary>작성 페이지</summary>
  ![작성페이지](/uploads/500bf231a432fe5cecb6e93069b101f2/작성페이지.gif)
  1. 체크박스로 컴포넌트 추가/빼기<br/>      
  2. Todolist, 일기, 오늘의 질문, 감정, 가계부 기록<br/>      
  3. 기록 수정/삭제   
</details>
<details open>
  <summary>마이페이지</summary>
  ![마이페이지1](/uploads/83978446b8b93f1b321520e60edc789a/마이페이지1.gif)
  ![마이페이지2](/uploads/ecbfe5bedede8313a3977f6c01c78626/마이페이지2.gif)
  1. 회원 정보 수정/탈퇴<br/>     
  2. 감정, 가계부 통계 확인<br/>      
  3. 태그별 오늘의 질문 모아보기   
</details>

### 💡프로젝트만의 차별점, 기대 효과

    1. 작성하고 싶은 옵션만 체크해서 작성/수정할 수 있다.
    2. 기본 체크 옵션을 지정/변경할 수 있다.
    3. 달력에서 월별 기록을 확인할 수 있다.
    4. 월별로 통계를 확인할 수 있다.
    5. 작성한 질문을 태그별로 확인할 수 있다.

## 3. 서비스 구성도

### 🗺️서비스 구조도

<img src="https://kdt-gitlab.elice.io/honghwanak/initialization/uploads/dd9d07cd3fb8f29823d6c8e94c902cd5/%EC%84%9C%EB%B9%84%EC%8A%A4_%EA%B5%AC%EC%A1%B0%EB%8F%84.png" width="300"/>


### 🎨와이어프레임

👉[피그마 보기](https://www.figma.com/file/weAyFeVUqDEUxBhpiWEe8W/23%3A59?node-id=0%3A1&t=0lGAFZpWEHLHBfqr-1)

### 📋API 명세

👉[API 명세 보기](https://surgedev.notion.site/DB-API-3c9c7cdb822f4dd080dcdb45fb8e3de2)

### 🪢인프라 구조
👉[인프라 구조 보기](https://media.discordapp.net/attachments/1050706291208757269/1057661481912639599/1beb610a808d2a8c.png?width=949&height=671)

## 4. 프로젝트 팀원 역할 분담

### 👥프로젝트 팀원

- [박우찬](https://github.com/Croossh)
- [김혜민](https://github.com/pansgraphy)
- [정지헌](https://github.com/honey989)
- [정호진](https://github.com/hozzijeong)
- [홍화낙](https://github.com/Nakhong)
- [설지윤](https://github.com/yoonbly)

### 🏋️멤버별 responsibility

<details>
  <summary>박우찬: 팀장/프론트엔드 담당</summary>
  <ul>
 <li>기획 단계: 구체적인 설계, 와이어프레임 작성 및 팀원간 의견 조율</li>
<li>개발 단계: 와이어프레임 기반으로 마이페이지 구현 담당</li>   
 <li>수정 단계: 스크럼 및 회의 진행, 팀 구체적인 목표 설계, 발표 진행</li> 
</ul>   
</details>
<details>
  <summary>김혜민: 백엔드 담당</summary>
  <ul>
 <li>기획 단계: 기술스택 선정, 서버구조 기획, 전체적인 api 설계, DB 선택 및 구조화</li>
<li>개발 단계:  사용자 스키마 및 api 구현, docker를 이용한 ec2 배포 구현</li>   
 <li>수정 단계: 피드백 반영해서 백엔드 설계 수정, 에러 핸들러 구현</li> 
</ul>   
</details>
<details>
<summary>정지헌: 백엔드 담당</summary>
  <ul>
 <li>기획 단계: 기술스택 선정, 서버구조 기획, 전체적인 api 설계, DB 선택 및 구조화</li>
<li>개발 단계:  DB 생성 및 연결, 컨텐츠, 질문 스키마 및 api 구현</li>   
 <li>수정 단계:  피드백 반영해서 백엔드 설계 수정, DB 데이터 관리</li> 
</ul>   
</details>
<details>
<summary>정호진: 프론트엔드 담당</summary>
  <ul>
  <li>기획 단계: 아이디어 도출 및 FE work flow 및 와이어프레임 작성</li>
  <li>개발 단계: work flow 및 와이어 프레임 기준으로 작성 페이지 CRUD 구현</li>   
  <li>수정 단계: 피드백 및 오류 수정해서 작성 페이지 수정</li> 
</ul>   
</details>
<details>
<summary>홍화낙: 프론트엔드 담당</summary>
  <ul>
 <li>기획 단계:와이어프레임 작성,아이디어 공유</li>
<li>개발 단계: 와이어프레임을 기반으로 홈페이지 로그인,회원가입,회원정보수정 페이지 담당</li>   
 <li>수정 단계: 피드백 반영 및 UI개선</li> 
</ul>   
</details>
<details>
<summary>설지윤: 프론트엔드 담당</summary>
  <ul>
 <li>기획 단계: 와이어프레임 작성</li>
<li>개발 단계:  와이어프레임을 기반으로 캘린더, 모달, 홈페이지 담당</li>   
 <li>수정 단계: 피드백 반영하여 UI개선</li> 
</ul>   
</details>

## 5. 실행 방법

- 백엔드:
  ```bash
  1. 디렉토리 이동 2359_back
  2. npm install
  3. npm start
  ```
- 프론트엔드:
  ```bash
  1. 디렉토리 이동 2359_front
  2. npm start
  ```

## 6. 버전

- 2359 version 1.0.0

## 7. FAQ

1. 이 서비스는 어떻게 실행하면 되나요?

```
  1. git clone
  2. npm install
```
