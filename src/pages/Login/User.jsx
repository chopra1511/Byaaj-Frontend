import {
  Button,
  CircularProgress,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import { IOSSwitch } from "../../components/utils/ToggleSwitch";
import Footer from "../../components/Footer/Footer";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../queries/UserQueries";
import Loading from "../../components/utils/Loading";
import { LOGOUT_USER } from "../../mutations/UserMutations";
import { useNavigate } from "react-router";
import { DarkModeContext } from "../../components/utils/DarkModeContext";

const SettingsList = ({ icon, title, toggle, darkMode, setDarkMode }) => {
  return (
    <div
      className={`flex items-center justify-between pb-3 border-b ${
        darkMode ? "border-slate-600" : "border-slate-300"
      } last:border-0 last:pb-0`}
    >
      <div className="flex gap-3 items-center">
        <div
          className={`w-8 h-8 ${
            darkMode ? "bg-white" : "bg-slate-600"
          }  rounded-full flex items-center justify-center`}
        >
          <i
            className={`fi ${icon} ${
              darkMode ? "text-slate-600" : "text-white"
            } pt-0.5`}
          ></i>
        </div>
        <h1
          className={`text-sm ${
            darkMode ? "text-white" : "text-slate-700"
          }  font-Poppins font-semibold`}
        >
          {title}
        </h1>
      </div>

      {toggle ? (
        <div>
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ ml: 2 }}
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            }
          />
        </div>
      ) : (
        <IconButton>
          <i
            className={`fi fi-br-angle-small-right text-sm pt-1 px-1.5 ${
              darkMode ? "text-white" : "text-slate-600"
            } `}
          ></i>
        </IconButton>
      )}
    </div>
  );
};

const User = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const { data, loading } = useQuery(CURRENT_USER);
  const user = data?.currentUser;

  const [logoutUser, { loading: logoutLoadin }] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      navigate("/");
    },
  });

  const handleLogout = async () => {
    await logoutUser(); // Perform logout
    await client.resetStore();
  };

  const buttonStyles = {
    borderRadius: "10px",
    fontFamily: "Poppins",
    textTransform: "capitalize",
    fontSize: "16px",
    padding: "8px 24px",
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`h-screen p-5 overflow-hidden ${
        darkMode ? "bg-slate-900 text-white" : ""
      }`}
    >
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <i className="fi fi-rr-book-bookmark pt-1"></i>
          <h1 className="text-sm font-Poppins font-semibold">{user?.name}</h1>
          <i className="fi fi-br-angle-small-down pt-1 cursor-pointer"></i>
        </div>
      </div>

      <div
        className={`mt-5 py-3 ${
          darkMode ? "bg-slate-700" : "bg-white"
        }  rounded-lg drop-shadow-xl flex items-center justify-between`}
      >
        <div className="flex items-center">
          <div className="px-3">
            <h1
              className={`${
                darkMode ? "bg-white text-slate-600" : "bg-slate-600 text-white"
              }  text-xl uppercase w-12 h-12 rounded-full flex items-center justify-center  font-Lemon`}
            >
              {user?.name.charAt(0)}
            </h1>
          </div>

          <div>
            <h1 className="font-Poppins text-base capitalize font-semibold">
              {user?.name}
            </h1>
            <h1
              className={`font-Poppins text-[12px] ${
                darkMode ? "text-slate-300" : "text-slate-600"
              } `}
            >
              {user?.phone}
            </h1>
          </div>
        </div>

        <div className="px-3">
          <IconButton>
            <i
              className={`fi fi-sr-pen-circle pt-1 px-2 ${
                darkMode ? "text-white" : "text-slate-600"
              }  text-2xl cursor-pointer`}
            ></i>
          </IconButton>
        </div>
      </div>

      <div
        className={`mt-10 p-5 ${
          darkMode ? "bg-slate-700" : "bg-white"
        }  drop-shadow-xl rounded-xl flex flex-col gap-5`}
      >
        <SettingsList
          icon={"fi-sr-moon-stars"}
          title={"Dark Mode"}
          toggle={true}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <SettingsList
          icon={"fi-sr-settings"}
          title={"Settings"}
          darkMode={darkMode}
        />
        <SettingsList
          icon={"fi-br-interrogation"}
          title={"Help & Support"}
          darkMode={darkMode}
        />
        <SettingsList
          icon={"fi-br-info"}
          title={"About Us"}
          darkMode={darkMode}
        />
      </div>

      <div className="lg:w-1/4 fixed bottom-20 left-5 right-5">
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogout}
          sx={{ ...buttonStyles, backgroundColor: "#ef4444" }}
        >
          {logoutLoadin ? (
            <CircularProgress size={"30px"} color="white" />
          ) : (
            "Logout"
          )}
        </Button>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default User;
