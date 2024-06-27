"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [moleIndex, setMoleIndex] = useState<number>();
const randomIndex = () => {
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * 9);
  } while (randomNum === moleIndex); 
  setMoleIndex(randomNum);
};

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      randomIndex();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setScore((prev) => prev + 1);
  };
  console.log(moleIndex);
  return (
    <>
      <h1>Score:{score}</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-2.5 w-[600px] h-[600px] m-auto border-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="relative">
            <div>
              <Image
                width={1024}
                height={1024}
                alt="hole"
                src={require("@/app/hole.png")}
                className="w-full h-full object-cover"
              />
              {index === moleIndex && (
                <div onClick={handleClick}>
                  <Image
                    width={512}
                    height={512}
                    alt="mole"
                    src={require("@/app/mole.png")}
                    className="absolute inset-0 w-[64px] h-[64px] m-auto"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
