'use client';

import { getVoteAPI } from '@/api';
import Button from '@/components/Button';
import { RoomContext } from '@/context/RoomContext';
import Image from 'next/image';
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
    <div className="container flex flex-col justify-around">
      <Image src="/image/banner.svg" width={500} height={500} alt="greeting image" className="block" />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={roomCodeParam || roomCode}
          onChange={(e) => setRoomCode!(e.target.value)}
          placeholder="참여 코드를 입력해주세요"
          required
          className="h-16 w-full px-3 py-2 bg-white border-2 border-indigo-200 outline-none focus:border-indigo-400 rounded-lg text-md placeholder-gray-400 mb-2"
        />
        {isError && <p className="text-red-400 text-sm ml-1">{errorMessage}</p>}

        <Button className="w-full h-16">투표 입장</Button>
      </form>
      <Button
        className="w-full h-16"
        onClick={() => {
          router.push('/make');
        }}
      >
        투표 만들기
      </Button>
    </div>
  );
}
