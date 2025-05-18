"use client";
import React, { useState, useEffect } from "react";
import { FaComment, FaPaperPlane, FaTimes } from "react-icons/fa";
import "./Chatbot.scss";

const Chatbot: React.FC = () => {
  // State for chat visibility (if chat window is open or closed)
  const [isOpen, setIsOpen] = useState(false);

  // State for user's current input
  const [query, setQuery] = useState("");

  // State for loading indicator (dots while waiting for response)
  const [isLoading, setIsLoading] = useState(false);

  // State for chat messages
  const [messages, setMessages] = useState<
    Array<{
      text: string;
      sender: "user" | "bot";
    }>
  >([]);

  // State for notification badge (notification when chat is closed)
  const [hasNotification, setHasNotification] = useState(true);

  // EVENT HANDLERS -----------------------------------------------------------
  /**
   * Handles when user submits a question
   * @param e - The form submission event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // prevents page refresh
    if (!query.trim()) return; // ignores empty queries

    // Add user message to chat
    setMessages((prev) => [...prev, { text: query, sender: "user" }]);
    setIsLoading(true);

    // Simulate bot response (replace with real API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "What hafen vella?", // Mock response haha to change :)
          sender: "bot",
        },
      ]);

      // Reset states
      setIsLoading(false);
      setQuery("");
    }, 800);
  };

  // SIDE EFFECTS ------------------------------------------------------------
  // Runs once when component loads
  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        text: "Hello! I'm your FAQ assistant. How can I help you?",
        sender: "bot",
      },
    ]);
  }, []); // Empty array = runs only once

  // CHAT TOGGLE HANDLER -----------------------------------------------------
  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNotification(false);
  };

  // RENDER ------------------------------------------------------------------
  return (
    <div className="chatbot-wrapper">
      {/* Floating Chat Button with Notifs */}
      <div
        className={`chatbot-button ${isOpen ? "open" : ""}`}
        onClick={isOpen ? () => setIsOpen(false) : handleOpenChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes className="icon" /> : <FaComment className="icon" />}
        {hasNotification && !isOpen && (
          <span className="notification-badge">1</span>
        )}
      </div>

      {/* Chat Window (conditionally shown) */}
      <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>FAQ Assistant</h3>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat">
            <FaTimes />
          </button>
        </div>

        {/* Message History Area */}
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">{message.text}</div>
            </div>
          ))}

          {/* Shown when loading (waiting for bot response)*/}
          {isLoading && (
            <div className="message bot">
              <div className="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="chatbot-input">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
            disabled={isLoading}
            aria-label="Type your question"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            aria-label="Send message"
          >
            <FaPaperPlane className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
