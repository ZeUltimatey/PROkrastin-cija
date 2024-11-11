export const Pagination = ({
  pagination,
  onNavigate,
}: {
  pagination: any;
  onNavigate: (url: string) => void;
}) => {
  return (
    <div className="flex gap-2 font-poppins">
      {pagination.links.map((link: any) => (
        <button
          onClick={() => onNavigate(link.url)}
          className="text-center w-14 h-10 bg-light-brown disabled:brightness-90 rounded-md shadow-sm "
        >
          {link.label === "&laquo; Previous" ? (
            <i className="fa-solid fa-angles-left"></i>
          ) : link.label === "Next &raquo;" ? (
            <i className="fa-solid fa-angles-right"></i>
          ) : (
            link.label
          )}
        </button>
      ))}
    </div>
  );
};
