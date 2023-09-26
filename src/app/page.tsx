'use client';

import { getVoteAPI } from '@/api';
import { RoomContext } from '@/context/RoomContext';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useContext } from 'react';

export default function Entrance() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomCodeParam = searchParams.get('roomCode');
  const { roomCode, setRoomCode, setRoomId } = useContext(RoomContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await getVoteAPI(roomCodeParam || roomCode || '');
      setRoomCode(data.roomCode);
      setRoomId(data.roomId);
      // 쿼리 스트링을 활용하기로 함
      // localStorage.setItem('roomCode', JSON.stringify(data.roomCode));
      // localStorage.setItem('roomId', JSON.stringify(data.roomId));

      data.roomId &&
        router.push(
          data.overed
            ? `/result/?roomCode=${data.roomCode}&roomId=${data.roomId}`
            : `/participant/?roomCode=${data.roomCode}&roomId=${data.roomId}`,
        );
    } catch (error) {
      setIsError(true);
      setErrorMessage('코드가 유효하지 않아요!');
    }
  };

  return (
    <div className="h-screen flex flex-col gap-16 px-8 py-32">
      <form onSubmit={onSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={roomCodeParam || roomCode}
            onChange={(e) => setRoomCode!(e.target.value)}
            placeholder="참여 코드를 입력해주세요"
            required
            className="h-16 mt-1 block w-full px-3 py-2 bg-white border-2 border-indigo-200 outline-none focus:border-indigo-400 rounded-lg text-md placeholder-gray-400"
          />
          {isError && <p className="text-gray-300 font-md">{errorMessage}</p>}
        </div>
        <button className="w-full h-16 flex justify-center items-center rounded-md bg-indigo-500 text-white">
          투표 입장
        </button>
      </form>
      <button
        onClick={() => {
          router.push('/make');
        }}
        className="w-full h-16 flex justify-center items-center rounded-md bg-indigo-500 text-white"
      >
        투표 만들기
      </button>
    </div>
  );
}
