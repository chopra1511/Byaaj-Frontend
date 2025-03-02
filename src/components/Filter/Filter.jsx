import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

const Filter = ({ onClose }) => {
  const buttonStyles = {
    borderRadius: "10px",
    fontFamily: "Poppins",
    textTransform: "capitalize",
    fontSize: "16px",
    padding: "8px 24px",
  };

  return (
    <div
      className="h-screen lg:w-1/4 text-black fixed inset-0 flex flex-col justify-end z-20 bg-black bg-opacity-60"
      onClick={() => {
        onClose(false);
      }}
    >
      <div
        className=" bg-white p-5 w-full rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b pb-3">
          <h1 className="text-sm font-Poppins font-semibold">Filter by type</h1>
          <div className="mt-2 flex flex-wrap gap-2 items-center text-black">
            <h1 className="text-sm font-Poppins px-3 py-1 w-fit rounded-md border-2 cursor-pointer hover:border-black">
              All
            </h1>
            <h1 className="text-sm font-Poppins px-3 py-1 w-fit rounded-md border-2 cursor-pointer hover:border-black">
              You'll Get
            </h1>
            <h1 className="text-sm font-Poppins px-3 py-1 w-fit rounded-md border-2 cursor-pointer hover:border-black">
              You'll Give
            </h1>
            <h1 className="text-sm font-Poppins px-3 py-1 w-fit rounded-md border-2 cursor-pointer hover:border-black">
              Settled Balance
            </h1>
          </div>
        </div>

        <div className="mt-3">
          <FormControl>
            <h1 className="text-sm font-Poppins font-semibold">Select</h1>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="latest"
              name="radio-buttons-group"
            >
              {["latest", "highest", "lowest", "name"].map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={value}
                  control={
                    <Radio
                      sx={{
                        color: "#334155", // Default color
                        "&.Mui-checked": { color: "#334155" }, // White when selected
                          }}
                          onChange={(e) => {
                              console.log(e.target.value)
                          }}
                    />
                  }
                  label={
                    <span style={{ color: "black", fontWeight: "500", fontSize:"14px", fontFamily:"Poppins" }}>
                      {value === "latest"
                        ? "Latest"
                        : value === "highest"
                        ? "Highest Amount"
                        : value === "lowest"
                        ? "Lowest Amount"
                        : "By Name (A-Z)"}
                    </span>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>

        <div className="mt-5">
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ ...buttonStyles, backgroundColor: "#334155" }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
