'use client';

import { useSearchParams } from 'next/navigation';
import { createContext, useState } from 'react';

interface IRoomContext {
  roomCode?: string;
  roomId?: string;
  setRoomCode?: React.Dispatch<React.SetStateAction<string>>;
  setRoomId?: React.Dispatch<React.SetStateAction<string>>;
}

export const RoomCodeContext = createContext<IRoomContext>({});

export function RoomCodeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const param = searchParams.get('roomCode');
  const [roomCode, setRoomCode] = useState<string>(param || '');
  const [roomId, setRoomId] = useState<string>('');

  return (
    <RoomCodeContext.Provider value={{ roomCode, setRoomCode, roomId, setRoomId }}>{children}</RoomCodeContext.Provider>
  );
}
