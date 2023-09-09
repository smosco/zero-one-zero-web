'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Entrance() {
  const [code, setCode] = useState<string>('');

  const router = useRouter();
  const submitCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(code);
    // router.push('/vote');
  };
  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-col gap-16 px-6 py-32">
        <form onSubmit={submitCode} className="flex flex-col ">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          />
          <button className="w-full h-16 flex justify-center items-center rounded-md bg-[#eb7a53]">코드 입력</button>
        </form>
        <button
          onClick={() => {
            router.push('/create');
          }}
          className="w-full h-16 flex justify-center items-center rounded-md bg-[#eb7a53]"
        >
          투표 만들러 가기
        </button>
      </div>
    </div>
  );
}
