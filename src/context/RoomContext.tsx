'use client';

import { createContext, useState } from 'react';

interface IRoomContext {
  roomCode?: string;
  roomId?: number;
  nonVoteUserName?: string;
  setRoomCode?: React.Dispatch<React.SetStateAction<string>>;
  setRoomId?: React.Dispatch<React.SetStateAction<number>>;
  setNonVoteUserName?: React.Dispatch<React.SetStateAction<string>>;
}

export const RoomContext = createContext<IRoomContext>({});

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [roomCode, setRoomCode] = useState<string>('');
  const [roomId, setRoomId] = useState<number>(0);
  const [nonVoteUserName, setNonVoteUserName] = useState<string>('');

  console.log(roomCode, roomId, nonVoteUserName);
  return (
    <RoomContext.Provider value={{ roomCode, setRoomCode, roomId, setRoomId, nonVoteUserName, setNonVoteUserName }}>
      {children}
    </RoomContext.Provider>
  );
}
