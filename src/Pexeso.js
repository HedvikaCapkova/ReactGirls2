import { useState } from "react";
import Board from "./components/Board";

export default function Pexeso() {
  return (
    <div className="bg-slate-50 h-screen flex flex-col gap-4 items-center justify-center">
      <Board count={2} />
    </div>
  );
}
