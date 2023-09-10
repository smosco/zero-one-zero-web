'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Entrance() {
  const [code, setCode] = useState<string>('');

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/participant');
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-col gap-16 px-6 py-32">
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="참여 코드를 입력해주세요"
            className="h-16 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 hover:border-[#8c70d7] rounded-md text-md shadow-sm placeholder-slate-400"
          />
          <button className="w-full h-16 flex justify-center items-center rounded-md bg-[#8c70d7] text-white">
            코드 입력
          </button>
        </form>
        <button
          onClick={() => {
            router.push('/make');
          }}
          className="w-full h-16 flex justify-center items-center rounded-md bg-[#8c70d7] text-white"
        >
          투표 만들러 가기
        </button>
      </div>
    </div>
  );
}
