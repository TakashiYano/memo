type LabelColorObject = {
  background: string;
  border: string;
  colorName: string;
  text: string;
};

type LabelColorObjects = {
  [key: string]: LabelColorObject;
};

export const labelColorObjects: LabelColorObjects = {
  "#7BE4FF": {
    background: "#7BE4FF0D",
    border: "#7BE4FF66",
    colorName: "blue",
    text: "#007E9E",
  },
  "#7CFF7B": {
    background: "#7CFF7B0D",
    border: "#7CFF7B66",
    colorName: "green",
    text: "#01A800",
  },
  "#CE88EF": {
    background: "#CE88EF0D",
    border: "#CE88EF66",
    colorName: "purple",
    text: "#B759E3",
  },
  "#EF8C43": {
    background: "#EF8C430D",
    border: "#EF8C4366",
    colorName: "orange",
    text: "#F37417",
  },
  "#FF5D99": {
    background: "#FF5D990D",
    border: "#FF5D9966",
    colorName: "red",
    text: "#B20042",
  },
  "#FFD234": {
    background: "#FFD2340D",
    border: "#FFD23466",
    colorName: "yellow",
    text: "#947300",
  },
  "custom color": {
    background: "#D8D7D50D",
    border: "#D8D7D566",
    colorName: "custom color",
    text: "#A5A4A1",
  },
};
