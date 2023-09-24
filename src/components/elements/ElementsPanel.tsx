import React from "react";
import "./elementsPanel.css";

function ElementsPanel() {
	return (
		<>
			<div className="panel restrict-height absolute flex flex-col cursor-default top-[48px] overflow-hidden left-0 h-[100vh] w-[240px] bg-core-grey select-none">
				<div className="flex justify-center items-center text-2xl">Elements</div>
			</div>
		</>
	);
}

export default ElementsPanel;
