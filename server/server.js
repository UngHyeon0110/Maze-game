// server/server.js
const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;

// public 폴더를 정적 파일 제공 경로로 설정
app.use(express.static(path.join(__dirname, "..", "public")));

// 기본 라우트 (옵션, 없어도 됨)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
