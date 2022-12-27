# **하루 결산 기록 사이트, 23:59✍️**
### `23:59, 하루의 끝에 작성하는 하루 결산 기록 사이트`

## 1. 서비스 소개

### 🛠️ 기술 스택   
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=mongoDB&logoColor=black">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=Express&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=black">   
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=black">   
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=black">   

- 전역 상태관리 : `recoil`  
- 서버 상태관리 : `SWR`

### 👀 웹서비스 개요     
```
'매일 쓰는 일기, 쓰고 싶은 부분만 골라서 기록할 순 없을까?' 라는 질문에서 시작했어요.   
오늘 하루의 Todo list, 일기, 감정, 가계부, 오늘의 질문 중에 쓰고 싶은 것만 골라서 기록하고,   
달력을 눌러 날마다 작성한 내용을 확인할 수 있어요.   
마이페이지에서는 한 달의 감정 및 가계부 통계를 확인하고, 오늘의 질문을 모아볼 수 있어요. 
```

  

## 2. 서비스 주요 기능 설명
**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**
  ### ✨주요 기능 및 서브 기능 소개    
  <details>
  <summary>로그인 페이지 이메일, 비밀번호 유효성 체크</summary>
영상 
</details>
<details>
  <summary> 첫 로그인 모달 페이지 기본 옵션 설정 저장</summary>
영상 
</details>
<details>
  <summary>작성 페이지에서 체크박스로 컴포넌트 추가/빼기</summary>
영상 
</details>
<details>
  <summary>작성 페이지에서 Todolist, 일기, 오늘의 질문, 감정, 가계부 기록</summary>
영상 
</details>
<details>
  <summary>홈 페이지 달력에서 다이어리 요약본 확인</summary>
영상 
</details>
<details>
  <summary>작성 페이지 수정/삭제</summary>
영상 
</details>
<details>
  <summary>마이페이지 회원 정보 수정/탈퇴</summary>
영상 
</details>
<details>
  <summary>마이페이지 감정, 가계부 통계 확인</summary>
영상 
</details>
<details>
  <summary>마이페이지 태그별로 오늘의 질문 모아보기</summary>
영상 
</details>


  ### 💡프로젝트만의 차별점, 기대 효과        
    1. 작성하고 싶은 옵션만 체크해서 작성/수정할 수 있다.
    2. 기본 체크 옵션을 지정/변경할 수 있다.
    3. 달력에서 월별 기록을 확인할 수 있다.
    4. 월별로 통계를 확인할 수 있다.
    5. 작성한 질문을 태그별로 확인할 수 있다.

## 3. 서비스 구성도
  ### 🗺️서비스 구조도
  ### 🎨와이어프레임 👉[23:59 피그마 보기](https://www.figma.com/file/weAyFeVUqDEUxBhpiWEe8W/23%3A59?node-id=0%3A1&t=0lGAFZpWEHLHBfqr-1)
  ### 📋API 명세 👉[23:59 API 명세](https://surgedev.notion.site/DB-API-3c9c7cdb822f4dd080dcdb45fb8e3de2)

## 4. 프로젝트 팀원 역할 분담
### MEMBERS
[박우찬](https://github.com/Croossh)🧑‍💻 - 팀장/프론트엔드 개발      
[김혜민](https://github.com/pansgraphy)🧑‍💻 - 백엔드 개발   
[정지헌](https://github.com/honey989)👩‍💻 - 백엔드 개발   
[정호진](https://github.com/hozzijeong)🧑‍💻 - 프론트엔드 개발      
[홍화낙](https://github.com/Nakhong)🧑‍💻 - 프론트엔드 개발   
[설지윤](https://github.com/yoonbly)👩‍💻 - 프론트엔드 개발   

**멤버별 responsibility(예시)**

1. 박우찬: 팀장/프론트엔드 담당
- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 김혜민: 백엔드 담당
- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 API 완성
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

3. 정지헌: 백엔드 담당

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 API 완성
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

4. 정호진: 프론트엔드 담당

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 API 완성
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

5. 홍화낙: 프론트엔드 담당

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 API 완성
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

6. 설지윤: 프론트엔드 담당

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 API 완성
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

## 5. 실행 방법
- 백엔드 (예시):
  ```bash
  1. mongodb 실행
  2. yarn start (혹은 npm start)
  ```

## 6. 버전
  - 프로젝트의 버전 기입 (예: 1.0.0)

## 7. FAQ
  - 자주 받는 질문 정리
  - 예시) 이 서비스는 어떻게 실행하면 되나요?
    - git clone을 하신 후 아래 커맨드를 입력하시면 됩니다. ~~~
