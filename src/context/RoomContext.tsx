'use client';

import { createContext, useState, useMemo } from 'react';

interface IRoomContext {
  roomCode?: string;
  roomId?: number;
  nonVoteUserName?: string;
  isVoteFinished?: boolean;
  setRoomCode: React.Dispatch<React.SetStateAction<string>>;
  setRoomId: React.Dispatch<React.SetStateAction<number>>;
  setNonVoteUserName: React.Dispatch<React.SetStateAction<string>>;
  setIsVoteFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RoomContext = createContext<IRoomContext>({
  setRoomCode: () => {},
  setRoomId: () => {},
  setIsVoteFinished: () => {},
  setNonVoteUserName: () => {},
});

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const savedRoomCode = JSON.parse(localStorage.getItem('roomCode')!);
  const savedRoomId = JSON.parse(localStorage.getItem('roomId')!);
  const savedNonVoteUserName = JSON.parse(localStorage.getItem('nonVoteUserName')!);
  const savedIsVoteFinished = JSON.parse(localStorage.getItem('isVoteFinished')!);

  const [roomCode, setRoomCode] = useState<string>(savedRoomCode);
  const [roomId, setRoomId] = useState<number>(savedRoomId);
  const [nonVoteUserName, setNonVoteUserName] = useState<string>(savedNonVoteUserName);
  const [isVoteFinished, setIsVoteFinished] = useState<boolean>(savedIsVoteFinished);

  console.log(roomCode, roomId, nonVoteUserName, isVoteFinished);

  const memoValue = useMemo(() => {
    return {
      roomCode,
      setRoomCode,
      roomId,
      setRoomId,
      nonVoteUserName,
      setNonVoteUserName,
      isVoteFinished,
      setIsVoteFinished,
    };
  }, [roomCode, roomId, nonVoteUserName, isVoteFinished]);

  return <RoomContext.Provider value={memoValue}>{children}</RoomContext.Provider>;
}
