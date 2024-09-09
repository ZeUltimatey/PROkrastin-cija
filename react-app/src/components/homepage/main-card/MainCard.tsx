import { Brands } from "./Brands";
import { Button } from "./Button";
import { TitleCard } from "./TitleCard";

export const MainCard = () => {
  return (
    <>
      <div className="bg-[#C2AE9A] flex w-full h-[32vw] p-12 justify-between">
        <div className="flex flex-col gap-12">
          <TitleCard />
          <div className="flex gap-6">
            <Button isInfoButton={false} />
            <Button isInfoButton={true} />
          </div>
        </div>
        <Brands />
      </div>
    </>
  );
};
