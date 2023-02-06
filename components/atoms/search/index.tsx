import React, { ChangeEventHandler, FormEventHandler } from 'react';

interface Props {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const InputBar: React.FC<Props> = ({ placeholder, value, onChange, onSubmit }) => {
  return (
    <div style={{ maxWidth: '700px', margin: '0px auto', marginTop: 30, padding: 30 }}>
      <form className="flex items-center" onSubmit={onSubmit}>
        <div className="relative w-full">
          <input
            value={value}
            onChange={onChange}
            type="text"
            id="voice-search"
            className="bg-gray-50 border-2 border-black text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 rounded-full"
            placeholder={placeholder}
            required
          />
        </div>
        <button type="submit" className="border-2 border-black inline-flex rounded-full items-center py-2.5 px-3 ml-2 text-sm font-medium text-black focus:outline-none hover:bg-black hover:text-white duration-500">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputBar;
