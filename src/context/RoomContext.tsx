'use client';

import { createContext, useState, useMemo } from 'react';

interface IRoomContext {
  roomCode?: string;
  roomId?: number;
  nonVoteUserName?: string;
  setRoomCode: React.Dispatch<React.SetStateAction<string>>;
  setRoomId: React.Dispatch<React.SetStateAction<number>>;
  setNonVoteUserName: React.Dispatch<React.SetStateAction<string>>;
}

export const RoomContext = createContext<IRoomContext>({
  setRoomCode: () => {},
  setRoomId: () => {},
  setNonVoteUserName: () => {},
});

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const savedRoomCode = '';
  const savedRoomId = 0;
  const savedNonVoteUserName = '';

  // const savedRoomCode = JSON.parse(localStorage.getItem('roomCode')!);
  // const savedRoomId = JSON.parse(localStorage.getItem('roomId')!);
  // const savedNonVoteUserName = JSON.parse(localStorage.getItem('nonVoteUserName')!);

  const [roomCode, setRoomCode] = useState<string>(savedRoomCode);
  const [roomId, setRoomId] = useState<number>(savedRoomId);
  const [nonVoteUserName, setNonVoteUserName] = useState<string>(savedNonVoteUserName);

  console.log(roomCode, roomId, nonVoteUserName);

  const memoValue = useMemo(() => {
    return {
      roomCode,
      setRoomCode,
      roomId,
      setRoomId,
      nonVoteUserName,
      setNonVoteUserName,
    };
  }, [roomCode, roomId, nonVoteUserName]);

  return <RoomContext.Provider value={memoValue}>{children}</RoomContext.Provider>;
}
