import { ItemCard } from "../ItemCard";

export const SpecialOffers = () => {
  return (
    <div className="p-12 bg-[#EDEAE1] h-auto flex flex-col gap-8">
      <h1 className="text-4xl font-poppins font-bold">Īpašie piedāvājumi 🔥</h1>
      <div className="grid grid-cols-5 place-items-center">
        <ItemCard
          id={1}
          title="virsraksts"
          description="apraksts"
          price={3.99}
        />
      </div>
    </div>
  );
};
