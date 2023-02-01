import React, { ChangeEventHandler, FormEventHandler } from 'react';

interface Props {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const SearchBar: React.FC<Props> = ({ placeholder, value, onChange, onSubmit }) => {
  return (
    <div style={{ maxWidth: '700px', margin: '0px auto', marginTop: 30, padding: 30 }}>
      <form className="flex items-center" onSubmit={onSubmit}>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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

export default SearchBar;
