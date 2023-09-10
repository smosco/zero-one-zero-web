'use client';
import axios from 'axios';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Penalty() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<string>();
  const [name, setName] = useState<string>();
  useEffect(() => {
    setDate(new Date().toLocaleDateString());
    const getData = async () => {
      // @todo : 서버와의 연결
      //const { data } = await axios.get('url');
      //setName(data.name);
    };
    getData();
  }, []);

  const handleCapture = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        // canvas 객체에는 캡쳐된 이미지가 담겨 있습니다.
        // 이 canvas 객체에서 toDataURL 함수를 호출하여 data URL을 얻습니다.
        const imgDataUrl = canvas.toDataURL();

        // a 태그를 생성하고 href 속성에 data URL을 설정합니다.
        const link = document.createElement('a');
        link.href = imgDataUrl;

        // download 속성에 파일 이름을 지정합니다.
        link.download = 'capture.png';

        // a 태그의 click 이벤트를 프로그래밍 방식으로 발생시킵니다.
        link.click();
      });
    }
  };
  return (
    <div className="relative h-screen text-xs">
      <div
        className="bg-black flex justify-center mt-4 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ top: '7%' }}
      >
        <button className="text-white z-10" onClick={handleCapture}>
          캡쳐하기
        </button>
      </div>
      <div className="flex h-full justify-center items-center">
        <div ref={captureRef} className="relative mx-auto border-black border">
          <Image src="/image/appointment.jpg" alt="Your description" width="320" height="423" />
          <div className="absolute inset-0">
            <div
              className="text-black p-10 text-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: '40%' }}
            >
              미참여자 : {name}
            </div>
            <div
              className="text-black text-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: '55%' }}
            >
              위 사람은 투표에 미참여
              <br />
              하였으므로
              <br /> 이 상장을 드립니다.
            </div>
            <div className="text-black  text-center absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              상장
            </div>
            <div
              className="text-black p-10  text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
              style={{ top: `80%` }}
            >
              {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
