import { Brands } from "./Brands";
import { Button } from "./Button";
import { TitleCard } from "./TitleCard";

export const MainCard = () => {
  return (
    <>
      <div className="bg-cat-bg-image bg-no-repeat bg-center bg-cover flex w-full h-[38vw] p-8 px-10 justify-between">
        <div className="flex flex-col gap-8 place-self-center">
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
