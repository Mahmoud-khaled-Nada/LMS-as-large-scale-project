import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
type Option = {
    id: string;
    name: string;
    icon?: string;
};

type SingleSelectProps = {
    options: Option[];
    placeholder?: string;
    onChange: (selectedValue: string) => void;
};

const SingleSelect: React.FC<SingleSelectProps> = ({options,placeholder,onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleOptionClick = (value: string) => {
        setSelectedValue(value);
        onChange(value);
        setIsOpen(false);
    };

    const selectedOption = options.find((opt) => opt.name === selectedValue);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={handleToggle}
                className="w-full py-3 px-3 flex items-center bg-white border border-gray-200 rounded-lg text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-neutral-600"
            >
                {selectedOption ? (
                    <div className="flex items-center">
                        {selectedOption.icon && (
                            <img
                                src={selectedOption.icon}
                                alt=""
                                className="w-5 h-5 rounded-full mr-2"
                            />
                        )}
                        {selectedOption.name}
                    </div>
                ) : (
                    placeholder
                )}
                <IoIosArrowDown className="w-5 h-5 ml-auto" />
            </button>

            {isOpen && (
                <div className="absolute mt-2 z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700">
                    {options.map((opt, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(opt.name)}
                            className={`py-2 px-4 text-sm cursor-pointer rounded-lg flex items-center ${
                                selectedValue === opt.name
                                    ? "bg-gray-100 dark:bg-neutral-800"
                                    : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                            } dark:text-neutral-200`}
                        >
                            {opt.icon && (
                                <img
                                    src={opt.icon}
                                    alt=""
                                    className="w-5 h-5 rounded-full mr-2"
                                />
                            )}
                            <span>{opt.name}</span>
                            {selectedValue === opt.name && (
                                <MdOutlineDone className="w-5 h-5 ml-auto text-blue-600 dark:text-blue-500" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SingleSelect;

// call

// const optionss = [
//     { value: '1', label: 'Name', icon: 'https://example.com/icon1.png' },
//     { value: '2', label: 'Email address', icon: 'https://example.com/icon2.png' },
//     { value: '3', label: 'Description', icon: 'https://example.com/icon3.png' },
//     { value: '4', label: 'User ID', icon: 'https://example.com/icon4.png' }
// ];

// const handleSelectionChanges = (selectedValue: string) => {
//     console.log('Selected value:', selectedValue);
// };

//     <SingleSelect options={optionss} placeholder="Select an option..." onChange={handleSelectionChanges} />
