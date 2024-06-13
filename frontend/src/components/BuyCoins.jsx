import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function BuyCoins(props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  // Function to fetch user info including coins
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("https://recipe-app-opal-five.vercel.app/user/info", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success(`${res.data.user.coins} coins available!`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      toast.error("Something went wrong!");
    }
  };

  // Function to handle opening the dialog
  const handleButtonClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetchUserInfo();
    setLoading(false);
    setIsDialogOpen(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Function to handle purchasing coins
  const handleBuyCoins = async (amount, cost) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://recipe-app-opal-five.vercel.app/user/buy",
        {
          currency: cost,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          coins: prevUser.coins + parseInt(cost) * 100,
        }));
        toast.success(
          `You have successfully purchased ${amount} coins for $${cost}!`
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error purchasing coins:", error);
      toast.error("Failed to purchase coins. Please try again later.");
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <div onClick={handleButtonClick} className="relative w-8 h-8">
        <div className="absolute inset-0 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-600 flex items-center justify-center">
          <span className="text-lg font-bold text-black">C</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 rounded-full opacity-75 blur-sm"></div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-[24rem] flex flex-col rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col gap-4 p-6">
              <h4 className="text-2xl font-semibold">Buy Coins</h4>
              <p className="mb-3 text-base font-normal">
                Welcome <span className="font-bold">{user.name}</span>! You have{" "}
                {user.coins} coins.
              </p>
              <button
                className={`mb-2 py-3 px-6 rounded-lg bg-green-500 text-white font-bold uppercase transition-all hover:shadow-lg ${
                  loading && "opacity-50 pointer-events-none"
                }`}
                onClick={() => handleBuyCoins(100, 1)}
                disabled={loading}
              >
                Buy 100 coins for $1
              </button>
              <button
                className={`mb-2 py-3 px-6 rounded-lg bg-blue-500 text-white font-bold uppercase transition-all hover:shadow-lg ${
                  loading && "opacity-50 pointer-events-none"
                }`}
                onClick={() => handleBuyCoins(500, 5)}
                disabled={loading}
              >
                Buy 500 coins for $5
              </button>
              <button
                className={`mb-2 py-3 px-6 rounded-lg bg-purple-500 text-white font-bold uppercase transition-all hover:shadow-lg ${
                  loading && "opacity-50 pointer-events-none"
                }`}
                onClick={() => handleBuyCoins(1000, 10)}
                disabled={loading}
              >
                Buy 1000 coins for $10
              </button>
              <button
                className={`mt-4 py-2 px-4 rounded-lg bg-red-500 text-white font-bold uppercase transition-all hover:shadow-lg ${
                  loading && "opacity-50 pointer-events-none"
                }`}
                onClick={handleCloseDialog}
                disabled={loading}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyCoins;
