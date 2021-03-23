import React, { useState } from "react";

export default function DropDownMenu({ actions, menuColor, menuTopMargin }) {
  const [menuHidden, setMenuHidden] = useState("hidden")

  return (
    <div className="dropdown-menu">
      <div className="navbar-menu" onClick={() => menuHidden === "hidden" ? setMenuHidden("visible") : setMenuHidden("hidden")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={menuColor}><path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" /></svg>
      </div>
      <div className="navbar-dropdown" style={{ visibility: menuHidden, top: menuTopMargin }}>
        {actions.map(function (action, index) {
          return <a href={action.link} key={index} ><div className="navbar-dropdown-item" onClick={() => { setMenuHidden("hidden"); action.action() }}>{action.name}</div></a>
        })}
      </div>
    </div>
  );
}