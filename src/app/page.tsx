'use client';

import { getVoteAPI } from '@/api';
import { RoomCodeContext } from '@/context/RoomCodeContext';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useContext } from 'react';

export default function Entrance() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get('roomCode');
  const { setRoomCode, roomCode, setRoomId } = useContext(RoomCodeContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { roomId, roomCode } = await getVoteAPI(param || '');
      setRoomCode!(roomCode);
      setRoomId!(roomId);
      // router.push(`/participant?${new URLSearchParams({ roomCode: roomCode }).toString()}`);
      roomId && router.push(`/participant?roomCode=${roomCode}`);
    } catch (error) {
      setIsError(true);
      setErrorMessage('코드가 유효하지 않아요!');
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-col gap-16 px-6 py-32">
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode!(e.target.value)}
              placeholder="참여 코드를 입력해주세요"
              required
              className="h-16 mt-1 block w-full px-3 py-2 bg-white border-2 border-indigo-200 outline-none focus:border-indigo-400 rounded-lg text-md placeholder-gray-400"
            />
            {isError && <p className="text-gray-200 font-md">{errorMessage}</p>}
          </div>
          <button className="w-full h-16 flex justify-center items-center rounded-md bg-indigo-500 text-white">
            코드 입력
          </button>
        </form>
        <button
          onClick={() => {
            router.push('/make');
          }}
          className="w-full h-16 flex justify-center items-center rounded-md bg-indigo-500 text-white"
        >
          투표 만들러 가기
        </button>
      </div>
    </div>
  );
}
