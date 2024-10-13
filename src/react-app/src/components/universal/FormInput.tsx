interface Props {
  placeholder?: string;
  customClass?: string;
  type?: string;
  id?: string;
  onChange: (e: any) => void;
  value: any;
}

export const FormInput = (props: Props) => {
  return (
    <input
      id={props.id}
      type={props.type ?? "text"}
      className={` ${
        props.customClass ??
        "mt-1 w-full px-4 py-2 border accent-accent-brown font-poppins border-gray-300 rounded-md shadow-sm"
      }`}
      placeholder={props.placeholder ?? ""}
      onChange={(e) => props.onChange(e)}
      value={props.value}
    />
  );
};
