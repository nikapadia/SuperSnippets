import React from "react";
import "./propertiesPanel.css";

function PropertiesPanel() {
	return (
		<>
			<div className="panel-properties restrict-height absolute flex flex-col cursor-default top-[48px] overflow-hidden right-0 h-full w-[240px] bg-core-grey select-none">
            <div className="flex justify-center items-center text-2xl">Properties</div>
			</div>
		</>
	);
}

export default PropertiesPanel;