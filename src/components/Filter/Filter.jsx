import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

const FilterList = ({ title, isSelected, onClick }) => {
  return (
    <h1
      className={`text-sm font-Poppins px-3 py-1 w-fit rounded-md border-2 cursor-pointer 
      ${
        isSelected
          ? "border-white bg-gray-200 text-black"
          : "border-gray-300 hover:border-black"
      }`}
      onClick={() => onClick(title)}
    >
      {title}
    </h1>
  );
};

const Filter = ({ onClose, darkMode }) => {
  const [selectedFilter, setSelectedFilter] = useState("All"); 
  const [selectedSort, setSelectedSort] = useState("latest"); 

   const handleFilterClick = (title) => {
     setSelectedFilter(title);
  };
  

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
        className={`${
          darkMode ? "bg-slate-700 text-white" : "bg-white"
        } p-5 w-full rounded-t-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b pb-3">
          <h1 className="text-sm font-Poppins font-semibold">Filter by type</h1>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            {["All", "You'll Get", "You'll Give", "Settled Balance"].map(
              (title) => (
                <FilterList
                  key={title}
                  title={title}
                  isSelected={selectedFilter === title}
                  onClick={handleFilterClick}
                />
              )
            )}
          </div>
        </div>

        <div className="mt-3">
          <FormControl>
            <h1 className="text-sm font-Poppins font-semibold">Select</h1>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={selectedSort} // Controlled component
              name="radio-buttons-group"
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              {["latest", "highest", "lowest", "name"].map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={value}
                  control={
                    <Radio
                      sx={{
                        color: darkMode ? "white" : "#334155",
                        "&.Mui-checked": {
                          color: darkMode ? "white" : "#334155",
                        },
                      }}
                    />
                  }
                  label={
                    <span
                      style={{
                        color: darkMode ? "white" : "black",
                        fontWeight: "500",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                      }}
                    >
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
            sx={{
              ...buttonStyles,
              backgroundColor: darkMode ? "white" : "#334155",
              color: darkMode ? "black" : "white",
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
