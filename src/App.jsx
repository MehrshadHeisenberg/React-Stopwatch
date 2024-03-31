import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("notCounting");
  const [time, setTime] = useState(0);

  function handleToggleTimer(action) {
    if (action === "start") setStatus("counting");
    if (action === "pause") setStatus("paused");

    if (action === "reset") {
      setStatus("notCounting");
      setTime(0);
    }
  }

  function handleCounting() {
    setTime((t) => t + 1);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Main>
        <ProjectName />
        <Timer status={status} onCounting={handleCounting} time={time} />
        <ActionPanel
          status={status}
          onToggleTimer={handleToggleTimer}
          time={time}
        />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

function ProjectName() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center font-bold mb-10">
      <h1 className="text-4xl">1- React Stopwatch</h1>
      <h2 className="text-xl">useState, useEffect</h2>
    </div>
  );
}

function Timer({ status, onCounting, time }) {
  const seconds = `${Math.floor(time % 60)}`.padStart(2, 0);
  const minutes = `${Math.floor(time / 60)}`.padStart(2, 0);

  useEffect(
    function () {
      if (status !== "counting") return;

      const timer = setInterval(() => {
        onCounting();
      }, 1000);

      return () => clearInterval(timer);
    },
    [status, onCounting]
  );

  return (
    <p className="mb-16 text-center text-2xl">{`${minutes}:${seconds}`}</p>
  );
}

function ActionPanel({ time, onToggleTimer }) {
  return (
    <div className="flex items-center justify-evenly">
      <Button onClick={() => onToggleTimer("start")}>Start</Button>
      {time !== 0 && (
        <Button onClick={() => onToggleTimer("reset")}>Reset</Button>
      )}
      <Button onClick={() => onToggleTimer("pause")}>Pause</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button
      className="bg-slate-400 text-lg text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-gray-200 transition-all duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;
