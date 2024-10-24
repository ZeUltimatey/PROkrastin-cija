import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../universal/Navbar";
import { Constants } from "../universal/Constants";
import { useEffect, useState } from "react";
import { User } from "../universal/interfaces/User";
import { Sidebar } from "../panel/admin-panel/Sidebar";
import { Spinner } from "../universal/Spinner";
export const PanelLayout = () => {
  const [user, setUser] = useState<User>(null);

  const navigate = useNavigate();

  const selectedTab = window.location.pathname.split("/")[2];

  const getUser = async () => {
    await fetch(`${Constants.API_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        if (data.user_role !== "Admin") {
          navigate("/");
        }
        navigate(
          `/panel/${selectedTab?.length > 0 ? selectedTab : "statistics"}`
        );
        return;
      }
      navigate("/");
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div style={{ backgroundImage: `url(../cat_pattern_bg.jpg)` }}>
      <div className="lg:px-32 bg-background-brown bg-opacity-95 pt-6 min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          {user?.user_role === "Admin" && <Outlet />}
          {!user && (
            <div className="flex w-full place-items-center justify-center gap-2 bg-content-white">
              <Spinner />
              <span className="font-poppins text-xl">Notiek ielāde...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
