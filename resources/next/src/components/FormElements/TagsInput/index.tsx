import { useState } from "react";

const TagsInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent default Enter or space behavior
      if (inputValue.trim()) {
        setTags([...tags, inputValue.trim()]); // Add the tag
        setInputValue(""); // Clear the input
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="tag-input-container">
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button
              className="remove-btn"
              onClick={() => handleRemoveTag(index)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Insert tags"
        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-3 rounded-md text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary "
      />
    </div>
  );
};

export default TagsInput;
