import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import rudra from "../images/70338b1bb848c183bfa80d4f88888f71-removebg-preview.png";

function Japnam() {
  const [totalChants, setTotalChants] = useState(0);
  const [malaCount, setMalaCount] = useState(0);
  const [currentChants, setCurrentChants] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const minSwipeDistance = 50;

  // Timer Effect
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Current Time Effect
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (Math.abs(e.touches[0].clientY - touchStartY) > minSwipeDistance) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const distance = touchStartY - touchEndY;
  
    if (Math.abs(distance) >= minSwipeDistance) {
      if (!timerRunning) {
        setTimerRunning(true);
      }
      
      if (distance > 0) {
        setCurrentChants((prevChants) => {
          const newChants = prevChants + 1;
  
          if (newChants === 108) {
            setMalaCount((prevMala) => prevMala + 1);
            setCurrentChants(0); // Reset to 0 only after updating Mala count
          } else {
            return newChants;
          }
  
          return 0;
        });
  
        setTotalChants((prev) => prev + 1);
      } else {
        setCurrentChants((prev) => {
          if (prev === 0 && malaCount > 0) {
            setMalaCount((prevMala) => prevMala - 1);
            return 107; // If decreasing from a new Mala, set count back to 107
          }
          return Math.max(0, prev - 1);
        });
  
        setTotalChants((prev) => Math.max(0, prev - 1));
      }
    }
  };
  

  const resetCounter = () => {
    setTotalChants(0);
    setMalaCount(0);
    setCurrentChants(0);
    setElapsedTime(0);
    setTimerRunning(false);
  };

  const toggleTimer = () => {
    setTimerRunning((prev) => !prev);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <h1 className="text-3xl font-bold mb-2">Mala Chant Counter</h1>

      {/* Current Time */}
      <p className="text-lg text-gray-300 mb-2">Current Time: {currentTime}</p>

      {/* Three Circles for Counts */}
      <div className="flex space-x-6 mb-4">
        {/* Mala Count */}
        <div className="w-24 h-24 bg-gray-700 flex items-center flex-column justify-center rounded-full shadow-lg">
          <p className=" font-bold">Mala: </p>
          <p className=" font-bold">{malaCount}</p>
        </div>

        {/* Total Chants */}
        <div className="w-24 h-24 bg-gray-700 flex items-center flex-column justify-center rounded-full shadow-lg">
          <p className=" font-bold">Chants:</p>
          <p className=" font-bold"> {totalChants}</p>
        </div>

        {/* Chants in Current Mala */}
        <div className="w-24 h-24 bg-gray-700 flex items-center justify-center rounded-full shadow-lg">
          <p className=" font-bold">{currentChants}/108</p>
        </div>
      </div>

      {/* Image Swiping */}
      <div
        className="w-40 h-40 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center shadow-lg relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div animate={{ y: -(currentChants % 108) * 128 + 64 }} transition={{ type: "spring", stiffness: 50 }}>
          {[...Array(218)].map((_, index) => (
            <img key={index} src={rudra} alt="🕉" className="w-32 h-32" />
          ))}
        </motion.div>
      </div>

      {/* Timer Display */}
      <p className="mt-4 text-lg text-gray-200">Time: {formatTime(elapsedTime)}</p>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 ${
            timerRunning ? "bg-yellow-500 hover:bg-yellow-700" : "bg-green-500 hover:bg-green-700"
          }`}
        >
          {timerRunning ? "Pause Timer" : "Start Timer"}
        </button>

        <button
          onClick={resetCounter}
          className="px-6 py-2 bg-red-600 hover:bg-red-800 rounded-lg text-lg font-semibold transition duration-300"
        >
          Reset
        </button>
      </div>

      {/* Instructions */}
      <p className="mt-4 text-sm text-gray-300 text-center">
        Swipe up ↑ to increase count <br />
        Swipe down ↓ to decrease count
      </p>
    </div>
  );
}

export default Japnam;


