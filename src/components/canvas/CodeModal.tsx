import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
// import "codemirror/keymap/sublime";
// import "codemirror/theme/monokai.css";

import "./codemodal.css";

const CodeModal = ({ closeModal }) => {
	const [text, setText] = React.useState("");
    // setText("const a = 1;\nconst b = 2;\nconst c = a + b;\nconsole.log(c);");

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(text);
	};

	const saveCode = () => {
        const code = text;
        console.log(code);
        closeModal(code);
    };

    let test = "print('Hello, world!')";

	return (
		<div>
			<div className="modal-background">
				<div className="modal">
					<div className="modal-header">
						<h2>Edit codeblock</h2>
					</div>
					<div className="modal-body">
						{/* <textarea
							className="modal-textarea"
							value={text}
							readOnly={false}
							onChange={handleChange}
						></textarea> */}
                        <CodeMirror
                            value={test}
                            onChange={(value) => { setText(value); }}
                            extensions={[python()]}
                            basicSetup={{autocompletion: true}}
                            theme="dark"
                        />
					</div>
					<div className="modal-footer">
                        {/* Add a language dropdown */}
                        <select className="modal-select">
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="c">C</option>
                            <option value="c++">C++</option>
                            <option value="c#">C#</option>
                            <option value="go">Go</option>
                            <option value="rust">Rust</option>
                            <option value="ruby">Ruby</option>
                        </select>
                        <div>
                            <button
                                className="modal-button focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={copyToClipboard}
                            >
                                Copy
                            </button>
                            <button
                                className="modal-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={saveCode}
                            >
                                Save
                            </button>
                            <button
                                className="modal-button focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CodeModal;