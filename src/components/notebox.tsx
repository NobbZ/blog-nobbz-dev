import * as React from "react";

// TODO: move this into proper CSS
const backgroundImage = `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="2.25em" height="2.25em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"%3E%3Cpath fill="rgb(52, 152, 219)" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"%2F%3E%3C%2Fsvg%3E')`;
const borderRadius = "0.75rem";
const borderStyle = "solid";
const borderColor = "#3498db";
const borderWidth = "2px";
const overflow = "hidden";
const paddingX = 50 - 4.5;
const lineHeight = "1.25rem";
const backgroundRepeat = "no-repeat";
const backgroundPosition = "left 9px top 9px";
const backgroundColor = "#f0f7fb";

const width = 625;
const left = (600 - width) / 2 - paddingX - 2;

const boxShadow =
  "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px";

const style = {
  width: `${width}px`,
  position: "relative" as React.CSSProperties["position"],
  left: `${left}px`,
  backgroundImage,
  borderRadius,
  borderStyle,
  borderColor,
  borderWidth,
  overflow,
  //   paddingTop: paddingY,
  //   paddingBottom: paddingY,
  paddingLeft: `${paddingX}px`,
  paddingRight: `${paddingX}px`,
  lineHeight,
  backgroundRepeat,
  backgroundPosition,
  backgroundColor,
  boxShadow,
};

const NoteBox = ({ children }) => {
  return <div style={style}>{children}</div>;
};

export default NoteBox;
