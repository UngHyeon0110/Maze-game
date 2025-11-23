# 🧩 Maze-game
First Web Pull Stack Practice

---

## 🎮 프로젝트 소개
DFS Recursive Backtracker 알고리즘을 이용하여 **완전 미로를 자동 생성**하고, 웹에서 플레이할 수 있는 미로 게임입니다.

- 스테이지 난이도
- 멀티플레이 경쟁
- 아이템 시스템
- 기록 저장(LocalStorage 기반)

등의 기능을 제공합니다.

---

## 🔎 미로 자동 생성 알고리즘
### DFS Recursive Backtracker (깊이우선 백트래커)

**사용 이유**
1. 구현이 간단하고 직관적임
2. JavaScript 기반 웹 구현에 유리
3. 난이도 조절이 쉬움
4. 기능 확장(아이템, 시야 제한 등)에 유연함
   
---

## 🕹️ 게임 기능
### ✅ 스테이지(난이도)
- 미로 크기 증가
- 예시:
   - 1-2: 기본
   - 3-4: 복잡
   - 5-6: 장애물 추가
   - 7-8: 시야 제한
   - 9-10: 몬스터 / 추격자
### ✅ 멀티 플레이(경쟁)
- 실시간 WebSocket 통신 기반
- 같은 미로에서 동시에 경쟁
### ✅ 아이템
- 속도 증가
- 힌트(최단 경로 일부 표시)
- 벽 뚫기
- 순간 이동(랜덤)
### ✅ 기록 저장
- 스테이지별 클리어 시간
- 이동 횟수 저장(LocalStorage)

---

## 🛠️ 개발환경
### 1. 개발 언어 / 기술 스택
- HTML5 / CSS3 / JavaScript
- Node.js
- Express.js
- WebSocket (ws)
- LocalStorage API
  
### 2. 개발 도구
- Visual Studio Code
- Git / GitHub

### 3. 외부 라이브러리
- crypto.randomUUID()
- npm 패키지
   - express: 서버 구성
   - ws: WebSocket 지원
   - nodemon: 자동 서버 재시작

---

## 🕹️ 사용 방법
- WASD 또는 방향키로 이동
- 목표 지점까지 도달하면 클리어
- 스테이지 선택
- 아이템 획득 시 능력 일시 강화 또는 상대 플레이어 방해
- 멀티플레이 모드는 상대와 경쟁

