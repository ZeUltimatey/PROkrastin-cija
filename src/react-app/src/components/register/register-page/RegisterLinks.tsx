export const RegisterLinks = () => {
  return (
    <div className="flex justify-center">
      <p className="text-sm text-center text-gray-500">
        Tev jau ir profils?{" "}
        <a
          href="/login"
          className="text-[#3e2a19] hover:underline font-semibold"
        >
          Ienākt
        </a>
      </p>
    </div>
  );
};
