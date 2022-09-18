import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // console.log 2번 찍히게 하는 범인 StrictMode
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// StrictMode는 앱에서 잠재적인 문제를 알아내기 위한 도구로,
// Fragment와 같이 UI를 렌더링하지 않고 자손들에 대한 부가적인 검사와 경고를 활성화한다.

// StrictMode는 다음과 같은 부분에서 도움을 줄 수 있다.
// 1. 안전하지 않은 생명주기를 사용하는 컴포넌트 발견
// 2. 레거시 문자열 ref 사용에 대한 경고
// 3.권장되지 않는 findDOMNode 사용에 대한 경고
// 4. 예상치 못한 부작용 검사
// 5. 레거시 context API 검사

// StrictMode는 개발 모드에서만 활성화되기 때문에, 프로덕션 빌드에는 영향을 끼치지 않는다.
// 즉 console.log()가 두 번 뜨는 것은 StrictMode로 인한 정상적인 상황으로,
// 만약 이것이 거슬린다면 index.js에서 출력할 파일을 감싸고 있는 <StrictMode></StrictMode>를 제거하면 된다.

reportWebVitals();
