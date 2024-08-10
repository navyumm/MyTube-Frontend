import React from "react";

function Container({ children }) {
    return (
        <div className="w-full sm:px-5 px-3 pt-5">
            {children}
        </div>
    );
}

export default Container;