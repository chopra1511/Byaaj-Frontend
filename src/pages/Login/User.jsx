import { Button, CircularProgress, FormControlLabel, IconButton } from "@mui/material";
import React from "react";
import { IOSSwitch } from "../../components/utils/ToggleSwitch";
import Footer from "../../components/Footer/Footer";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../queries/UserQueries";
import Loading from "../../components/utils/Loading";
import { LOGOUT_USER } from "../../mutations/UserMutations";
import { useNavigate } from "react-router";

const User = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
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
    <div className="h-screen p-5 overflow-hidden">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <i className="fi fi-rr-book-bookmark pt-1"></i>
          <h1 className="text-sm font-Poppins font-semibold">{user?.name}</h1>
          <i className="fi fi-br-angle-small-down pt-1 cursor-pointer"></i>
        </div>
      </div>

      <div className="mt-5 py-3 bg-white rounded-lg drop-shadow-xl flex items-center justify-between">
        <div className="flex items-center">
          <div className="px-3">
            <h1 className="bg-slate-600 text-xl uppercase w-12 h-12 rounded-full flex items-center justify-center text-white font-Lemon">
              {user?.name.charAt(0)}
            </h1>
          </div>

          <div>
            <h1 className="font-Poppins text-base capitalize font-semibold">
              {user?.name}
            </h1>
            <h1 className="font-Poppins text-[12px] text-slate-600">
              {user?.phone}
            </h1>
          </div>
        </div>

        <div className="px-3">
          <IconButton>
            <i className="fi fi-sr-pen-circle pt-1 px-2 text-slate-600 text-2xl cursor-pointer"></i>
          </IconButton>
        </div>
      </div>

      <div className="mt-10 p-5 bg-white drop-shadow-xl rounded-xl flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b-2">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <i className="fi fi-sr-moon-stars text-white pt-0.5"></i>
            </div>
            <h1 className="text-sm text-slate-700 font-Poppins font-semibold">
              Dark Mode
            </h1>
          </div>

          <div>
            <FormControlLabel control={<IOSSwitch sx={{ ml: 2 }} />} />
          </div>
        </div>

        <div className="flex items-center justify-between pb-3 border-b-2">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <i className="fi fi-sr-settings text-white pt-0.5"></i>
            </div>
            <h1 className="text-sm text-slate-700 font-Poppins font-semibold">
              Settings
            </h1>
          </div>

          <IconButton>
            <i className="fi fi-br-angle-small-right text-sm pt-1 px-1.5 text-slate-600"></i>
          </IconButton>
        </div>

        <div className="flex items-center justify-between pb-3 border-b-2 ">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <i className="fi fi-br-interrogation text-white pt-0.5"></i>
            </div>
            <h1 className="text-sm text-slate-700 font-Poppins font-semibold">
              Help & Support
            </h1>
          </div>

          <IconButton>
            <i className="fi fi-br-angle-small-right text-sm pt-1 px-1.5 text-slate-600"></i>
          </IconButton>
        </div>

        <div className="flex items-center justify-between pb-3 border-b-2 last:border-0">
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <i className="fi fi fi-br-info text-white pt-0.5"></i>
            </div>
            <h1 className="text-sm text-slate-700 font-Poppins font-semibold">
              About Us
            </h1>
          </div>

          <IconButton>
            <i className="fi fi-br-angle-small-right text-sm pt-1 px-1.5 text-slate-600"></i>
          </IconButton>
        </div>
      </div>

      <div className="lg:w-1/4 fixed bottom-20 left-5 right-5">
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogout}
          sx={{ ...buttonStyles, backgroundColor: "#ef4444" }}
        >
          {logoutLoadin ? <CircularProgress size={"30px"} color="white" /> : "Logout"}
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default User;
