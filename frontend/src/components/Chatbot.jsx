import React, { useState } from "react";
import { Send, X, Bot, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Chatbot = () => {
  const [textvalue, setTextvalue] = useState("");
  const [message, setMessage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const ask = () => {
    if (!textvalue.trim()) return;
    let botReply = "";
    if (textvalue.toLowerCase().includes("hello")) {
      botReply = "Hi! Welcome to ShopKart 👋";
    } else if (textvalue.toLowerCase().includes("shoes")) {
      botReply = "Sure! I can help you find shoes. 👟";
    } else if (textvalue.toLowerCase().split(" ").includes("kids")) {
      botReply = "Sure! Taking you to Kids's collection 👕";
      navigate("/kids");
    } else if (textvalue.toLowerCase().split(" ").includes("order")) {
      botReply = "Sure! Taking you to Order's page";
      navigate("/orders");
    } else if (textvalue.toLowerCase().split(" ").includes("wishlist")) {
      botReply = "Sure! Taking you to Wishlist page";
      navigate("/wishlist");
    } else if (textvalue.toLowerCase().split(" ").includes("cart")) {
      botReply = "Sure! Taking you to carts page";
      navigate("/cart");
    } else if (textvalue.toLowerCase().split(" ").includes("women")) {
      botReply = "Sure! Taking you to Women's collection 👕";
      navigate("/women");
    } 
    else if (
      textvalue.toLowerCase().split(" ").includes("women") &&
      textvalue.toLowerCase().split(" ").includes("jeans")
    ) 
    {
      botReply = "Sure! Taking you to Women's Jeans collection 👖";
      navigate("/women/Jeans");
    }
//      else if (
//       textvalue.toLowerCase().split(" ").includes("women") &&
//       textvalue.toLowerCase().split(" ").includes("Shirts")
//     ) 
//     {
//       botReply = "Sure! Taking you to Women's shirts collection 👖";
//       navigate("/women/shirts");
//       console.log("WOMEN SHIRT CONDITION");
// console.log(textvalue.toLowerCase().split(" "));
//     }
    
    else if (textvalue.toLowerCase().split(" ").includes("products")) {
      botReply = "Sure! Taking you to All products";
      navigate("/products");
    } else {
      botReply =
        "Sorry, I didn't understand. Try asking about products, shoes or orders.";
    }
    setMessage([
      ...message,
      { text: textvalue, sender: "user" },
      { text: botReply, sender: "bot" },
    ]);
    setTextvalue("");
  };
  return (
    <>
      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-90 max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot size={23} />
              </div>
              <div>
                <h2 className="font-semibold text-[16px]">
                  ShopKart Assistant
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-blue-100">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 transition hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
          {/* Messages */}
          <div className="h-77.5 overflow-y-auto bg-gray-50 p-4">
            {/* Welcome Message */}
            {message.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Sparkles size={26} />
                </div>
                <h3 className="font-semibold text-gray-800"> Hi! 👋 </h3>
                <p className="mt-1 max-w-60 text-sm text-gray-500">
                  I'm your ShopKart assistant. How can I help you today?
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setTextvalue("Show me shoes")}
                    className="rounded-full border bg-white px-3 py-1.5 text-xs text-gray-600 transition hover:border-blue-400 hover:text-blue-600"
                  >
                    👟 Shoes
                  </button>
                  <button
                    onClick={() => setTextvalue("Where is my order?")}
                    className="rounded-full border bg-white px-3 py-1.5 text-xs text-gray-600 transition hover:border-blue-400 hover:text-blue-600"
                  >
                    📦 My Order
                  </button>
                </div>
              </div>
            )}
            {/* Chat Messages */}
            <div className="space-y-3">
              {message.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender === "user" ? "rounded-br-md bg-blue-600 text-white" : "rounded-bl-md bg-white text-gray-700 shadow-sm border"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Input Area */}
          <div className="border-t bg-white p-3">
            <div className="flex items-end gap-2">
              <textarea
                placeholder="Ask me anything..."
                rows="1"
                className="max-h-24 min-h-11 flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                value={textvalue}
                onChange={(e) => setTextvalue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    ask();
                  }
                }}
              />
              <button
                onClick={ask}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-gray-400">
              ShopKart AI Assistant
            </p>
          </div>
        </div>
      )}
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg transition duration-200 hover:scale-110 hover:shadow-xl"
        >
          <Bot size={26} />
        </button>
      )}
    </>
  );
};
export default Chatbot;
