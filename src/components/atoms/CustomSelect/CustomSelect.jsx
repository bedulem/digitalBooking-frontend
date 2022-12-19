import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CustomSelect.css';
import { useEffect } from "react";

const CustomSelect = (props) => {
    const { optionsList, label, required, selectRef } = props;
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    
    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const setSelectedThenCloseDropdown = (value) => {
        if (selectRef) {
            selectRef.current.value = value;
        }
        setSelectedOption(value);
        setIsOptionsOpen(false);
    };

    const handleKeyDown = (index) => (e) => {
        switch (e.key) {
            case " ":
            case "SpaceBar":
            case "Enter":
                e.preventDefault();
                setSelectedThenCloseDropdown(index);
                break;
            default:
                break;
        }
    };

    const handleListKeyDown = (e) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setIsOptionsOpen(false);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedOption(
                    selectedOption - 1 >= 0 ? selectedOption - 1 : optionsList.length - 1
                );
                break;
            case "ArrowDown":
                e.preventDefault();
                setSelectedOption(
                    selectedOption == optionsList.length - 1 ? 0 : selectedOption + 1
                );
                break;
            default:
                break;
        }
    };

    return (
        <div className="wrapper">
            <div className="container">
                {label && <label>{label} {required && <span className='required'>*</span>}</label>}
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOptionsOpen}
                    className={isOptionsOpen ? "expanded" : ""}
                    onClick={toggleOptions}
                    onKeyDown={handleListKeyDown}
                >
                    {optionsList.find(({ value }) => value === selectedOption)?.icon && <FontAwesomeIcon icon={optionsList.find(({ value }) => value === selectedOption)?.icon} />}
                    {' '}
                    {optionsList.find(({ value }) => value === selectedOption)?.label}
                </button>
                <ul
                    className={`options ${isOptionsOpen ? "show" : ""}`}
                    role="listbox"
                    aria-activedescendant={optionsList.find(({ value }) => value === selectedOption)?.value}
                    tabIndex={-1}
                    onKeyDown={handleListKeyDown}
                >
                    {optionsList.map(({ value, label, icon }, index) => (
                        <li
                            id={value}
                            role="option"
                            key={index}
                            aria-selected={selectedOption === value}
                            tabIndex={0}
                            onKeyDown={handleKeyDown(value)}
                            onClick={() => {
                                setSelectedThenCloseDropdown(value);
                            }}
                        >
                            {icon && <FontAwesomeIcon icon={icon} />}{' '}{label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CustomSelect;