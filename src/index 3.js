// src의 index.js 에는 전역적인 부분이 들어감(입구 파일)

// 리액트는 사용자 정의 태그를 만드는 기술이다 (본질)

// npx create-react-app . -> React 설치
// npm start -> 개발 환경 증축
// npm run build -> 서버 배포 파일 생성 -> 파일들에 공백이 없다 = 필요없다 (파일 용량 줄이기 위해)
// serve -s build -> 빌드한 결과를 작동(서브라는 앱 쓰는 것을 추천한다고 나옴)
// The build folder is ready to be deployed. You may serve it with a static server: serve -s build
// serve 는 앱이자 웹 서버 - 사용자가 어느 경로로 들어와도 build 안의 index.html를 서비스 해 주겠다 의 serve 의 역할
// npx serve -s build
// │   Serving!                                        │
// │                                                   │
// │   - Local:            http://localhost:51342      │
// │   - On Your Network:  http://192.168.0.13:51342   │
// │                                                   │
// │   This port was picked because 3000 is in use.    │
// │                                                   │
// │   Copied local address to clipboard!              │    

import React from 'react';
import ReactDOM from 'react-dom/client';
// 기본적으로 샘플에 대해 적용된 css 인 index.css
import './index.css';
// ./App 뒤에 .js 확장자가 생략돼 있음 (./ :현재 경로를 지칭)
import App from './App';
import reportWebVitals from './reportWebVitals';

// 'div id = root' 부분 = public 의 index.html <div id="root"></div>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 맨 첫 화면의 UI 전체인 APP */}
    {/* <App /> 은 import App from './App' 의 파일과 동일 */}
    <App />
  </React.StrictMode>
);

// 생활코딩 강사님은 아래와 같이 자동 작성돼 있음
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
