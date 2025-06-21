export const Input = ({ label, placeholder, name, type, error, ...props }) => {
  return (
    <div className="flex flex-col mb-6 w-full">
      <label className="mb-1 font-light" htmlFor={name}>
        {label}
      </label>
      <input
        className="border-none bg-[#374151] py-2 px-4 rounded-md focus:outline-none"
        type={type}
        placeholder={placeholder}
        name={name}
        {...props}
      />

      {error && <span className="text-red-300 text-sm">{error}</span>}
    </div>
  );
};
