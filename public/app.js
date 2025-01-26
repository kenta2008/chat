// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

// Firebaseの構成
const firebaseConfig = {
    apiKey: "AIzaSyC9YSSFTMqq7dggfIjstuT6duD7p9hvOGw",
    authDomain: "realtimechat-33131.firebaseapp.com",
    databaseURL: "https://realtimechat-33131-default-rtdb.firebaseio.com",
    projectId: "realtimechat-33131",
    storageBucket: "realtimechat-33131.firebasestorage.app",
    messagingSenderId: "916068318632",
    appId: "1:916068318632:web:1cbd5ddfe75dc7ddc1719d",
    measurementId: "G-SNLVE6C3E4"
  };
  
  // Firebaseの初期化
  import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  // DOM要素
  const messagesDiv = document.getElementById("messages");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  
  // メッセージを送信
  sendButton.addEventListener("click", async () => {
    const message = messageInput.value.trim();
    if (message) {
      try {
        await push(ref(database, "messages"), { text: message, timestamp: Date.now() });
        messageInput.value = "";
      } catch (error) {
        console.error("メッセージ送信エラー:", error);
      }
    }
  });
  
  // メッセージを受信
  onChildAdded(ref(database, "messages"), (snapshot) => {
    try {
      const message = snapshot.val();
      const messageElement = document.createElement("div");
      messageElement.textContent = message.text;
      messageElement.className = "other";
      messagesDiv.appendChild(messageElement);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
      console.error("メッセージ受信エラー:", error);
    }
  });