'use client';

import Button from '@/components/Button';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type PenaltyProps = {
  nonParticipantList: string[];
};

function Penalty(props: PenaltyProps) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<string>();
  const [selectedUserName, setSelectedUserName] = useState<string>(props.nonParticipantList[0]);

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  const onCaptureClick = () => {
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
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-xl font-bold text-center">미참여자 상장</h2>
      <ul className="flex justify-center gap-3">
        {props.nonParticipantList.map((person, idx) => {
          return (
            <Button key={idx} onClick={() => setSelectedUserName(person)}>
              {person}
            </Button>
          );
        })}
      </ul>
      <div ref={captureRef} className="flex justify-center items-center relative mx-auto text-sm">
        <Image src="/image/frame.jpg" alt="price frame image" width={300} height={350} />
        <div className="absolute inset-0 flex flex-col items-center text-center">
          <p className="text-2xl font-bold absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            상장
          </p>
          <p className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ top: '35%' }}>
            미참여자 : {selectedUserName}
          </p>
          <p
            className="w-full absolute left-1/2 transform text-[12px] -translate-x-1/2 -translate-y-1/2"
            style={{ top: '52%' }}
          >
            위 사람은 팀원들의 닦달에도
            <br />
            꿋꿋이 투표를 하지 않은 용기에
            <br /> 이 상장을 드립니다.
          </p>
          <p
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12px]"
            style={{ top: `75%` }}
          >
            {date}
          </p>
        </div>
      </div>
      <Button onClick={onCaptureClick}>다운로드</Button>
    </div>
  );
}

export default Penalty;
