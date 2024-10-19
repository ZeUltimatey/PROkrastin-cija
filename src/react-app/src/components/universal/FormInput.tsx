interface Props {
  placeholder?: string;
  customClass?: string;
  type?: string;
  id?: string;
  onChange: (e: any) => void;
  value: any;
  disabled?: boolean;
}

export const FormInput = (props: Props) => {
  return (
    <input
      id={props.id}
      type={props.type ?? "text"}
      className={` ${
        props.customClass ?? props.disabled
          ? "cursor-not-allowed bg-gray-200 mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          : "mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm"
      }`}
      placeholder={props.placeholder ?? ""}
      onChange={(e) => props.onChange(e)}
      disabled={props.disabled}
      value={props.value}
    />
  );
};
