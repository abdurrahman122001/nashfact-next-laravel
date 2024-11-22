import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill styles

const TextEditor: React.FC = () => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [layout, setLayout] = useState<number | null>(null); // Track the layout selection (columns)

  // Function to add row with columns (1, 2, or 3)
  const addRowWithColumns = (columns: number) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection();
    if (editor && range) {
      const rowHtml = `
        <div class="flex flex-wrap gap-4 my-4 p-4 border border-gray-300 rounded-lg" data-columns="${columns}">
          ${Array(columns)
            .fill('')
            .map(
              () => `
                <div class="flex-1 border-2 border-gray-400 p-4 bg-gray-100 min-h-[100px] flex flex-col justify-start">
                  <p class="text">Add text here...</p>
                  <input type="file" class="image-uploader mt-2 p-2" accept="image/*" />
                </div>`
            )
            .join('')}
        </div>
      `;
      editor.clipboard.dangerouslyPasteHTML(range.index, rowHtml); // Insert HTML at cursor position
      setLayout(columns); // Update the state to reflect the column layout
    }
  };

  // Handle the change in the dropdown for column selection
  const handleDropdownChange = (value: string) => {
    if (value) {
      const columns = parseInt(value, 10);
      addRowWithColumns(columns); // Add the row with selected number of columns
    }
  };

  // Add a custom dropdown to the toolbar
  const addCustomToolbarOption = () => {
    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar && !toolbar.querySelector('.ql-row')) {
      const dropdown = document.createElement('select');
      dropdown.className = 'ql-row border border-gray-300 rounded px-2';
      dropdown.innerHTML = `
        <option value="">Add Row</option>
        <option value="1">1 Column</option>
        <option value="2">2 Columns</option>
        <option value="3">3 Columns</option>
      `;
      dropdown.addEventListener('change', (e: any) => {
        const value = e.target.value;
        handleDropdownChange(value);
        e.target.value = ''; // Reset dropdown selection
      });
      toolbar.appendChild(dropdown);
    }
  };

  useEffect(() => {
    addCustomToolbarOption(); // Add the dropdown for selecting columns to the toolbar
  }, []);

  // Quill modules configuration
  const modules = {
    toolbar: {
      container: [
        [{ font: [] }, { size: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        [{ color: [] }, { background: [] }],
        ['clean'],
      ],
    },
  };

  // Quill formats configuration
  const formats = [
    'font',
    'size',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'color',
    'background',
    'row',
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <ReactQuill
        ref={quillRef}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Start writing here..."
      />
    </div>
  );
};

export default TextEditor;
