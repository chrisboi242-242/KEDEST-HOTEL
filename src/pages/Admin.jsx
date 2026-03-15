import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { FaSyncAlt, FaMoneyBillWave, FaLock, FaKey, FaPowerOff, FaUserCircle, FaCheckCircle } from 'react-icons/fa';

const Admin = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Auth & Success States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const [dbPassword, setDbPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "admin_config");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDbPassword(docSnap.data().portalPassword);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchSettings();

    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
      const roomsData = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
      setRooms(roomsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Calculate Revenue
  const totalRevenue = rooms
    .filter(room => room.isBooked)
    .reduce((sum, room) => sum + (Number(room.price) || 0), 0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPass === dbPassword) {
      setShowSuccess(true); // TRIGGER SUCCESS SCREEN
      setTimeout(() => {
        setIsAuthenticated(true);
        setShowSuccess(false);
      }, 2000);
    } else {
      alert("Invalid Portal Key. Access Denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setInputPass("");
  };

  const updateRoomStatus = async (id, currentStatus) => {
    try {
      const roomRef = doc(db, "rooms", id);
      const updateData = { isBooked: !currentStatus };
      if (currentStatus === true) {
        updateData.bookedBy = "";
        updateData.contactPhone = "";
      }
      await updateDoc(roomRef, updateData);
    } catch (err) {
      alert("Status update failed.");
    }
  };

  const updatePrice = async (id, newPrice) => {
    if (!newPrice || isNaN(newPrice) || newPrice < 0) return;
    try {
      const roomRef = doc(db, "rooms", id);
      await updateDoc(roomRef, { price: Number(newPrice) });
      alert("Rate updated successfully.");
    } catch (err) {
      alert("Price update failed.");
    }
  };

  const changePortalPassword = async () => {
    if (newPassword.length < 6) return alert("Password too weak!");
    try {
      const docRef = doc(db, "settings", "admin_config");
      await updateDoc(docRef, { portalPassword: newPassword });
      setDbPassword(newPassword);
      alert("Master Security Key Updated.");
      setNewPassword("");
    } catch (err) {
      alert("Failed to update password.");
    }
  };

  // --- SUCCESS OVERLAY ---
  if (showSuccess) {
    return (
      <div className="h-screen bg-hotelNavy flex flex-col items-center justify-center p-6 text-center animate-pulse">
        <div className="w-24 h-24 bg-hotelGold rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(212,175,55,0.4)]">
          <FaCheckCircle className="text-hotelNavy text-5xl" />
        </div>
        <h2 className="font-luxury text-4xl italic text-white mb-4">Access Granted</h2>
        <p className="text-hotelGold uppercase tracking-[0.5em] text-xs font-bold">Welcome, Commander</p>
      </div>
    );
  }

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-hotelNavy flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white p-10 shadow-2xl border-t-8 border-hotelGold max-w-sm w-full">
          <FaLock className="text-hotelGold text-4xl mx-auto mb-4" />
          <h2 className="font-luxury text-2xl italic mb-6 text-hotelNavy text-center">Identity Verification</h2>
          <input 
            type="password" 
            placeholder="Enter Master Key"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-hotelGold mb-8 text-center text-lg tracking-widest"
            onChange={(e) => setInputPass(e.target.value)}
          />
          <button type="submit" className="w-full bg-hotelNavy text-hotelGold py-4 font-bold uppercase tracking-widest text-xs hover:bg-black transition-all">
            Authorize Entry
          </button>
        </form>
      </div>
    );
  }

  // --- MAIN ADMIN PANEL ---
  return (
    <div className="bg-[#f4f4f4] min-h-screen p-4 md:p-12 font-sans text-hotelNavy">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 border-b-2 border-hotelGold pb-6 gap-6">
          <div>
            <h1 className="font-luxury text-4xl italic leading-none">Kedest Control Tower</h1>
            <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] mt-2 font-bold">Aba Premium Operations</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-hotelGold">Total Occupancy Revenue</p>
                <p className="text-2xl font-luxury italic">₦{totalRevenue.toLocaleString()}</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-red-100 hover:bg-red-600 hover:text-white transition-all">
                <FaPowerOff /> Logout
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20"><FaSyncAlt className="animate-spin text-hotelGold text-4xl" /></div>
        ) : (
          <div className="space-y-4">
            {rooms.map((room) => (
              <div key={room.docId} className="bg-white p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm border border-gray-100 relative overflow-hidden">
                {room.isBooked && <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>}
                
                <div className="flex items-center gap-6 w-full md:w-1/3">
                  <img src={room.image} className="w-16 h-16 object-cover rounded-sm border" alt="" />
                  <div>
                    <h3 className="font-bold uppercase text-sm tracking-widest leading-tight">{room.name}</h3>
                    {room.isBooked ? (
                        <div className="mt-1 flex items-center gap-2 text-red-600">
                            <FaUserCircle />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase">{room.bookedBy || "Guest"}</span>
                                <span className="text-[9px] text-gray-400">{room.contactPhone}</span>
                            </div>
                        </div>
                    ) : <p className="text-green-600 text-[9px] font-bold uppercase mt-1">Status: Vacant</p>}
                  </div>
                </div>

                <div className="flex flex-col bg-gray-50 px-6 py-2 rounded-sm border w-full md:w-auto">
                  <span className="text-[8px] uppercase font-bold text-gray-400 mb-1">Nightly Rate (₦)</span>
                  <input 
                    type="number" 
                    defaultValue={room.price}
                    onBlur={(e) => updatePrice(room.docId, e.target.value)}
                    className="bg-transparent w-28 font-bold text-hotelNavy outline-none text-lg"
                  />
                </div>

                <button onClick={() => updateRoomStatus(room.docId, room.isBooked)} className={`w-full md:w-48 py-4 text-[10px] font-bold uppercase tracking-widest border transition-all ${room.isBooked ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white' : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}`}>
                  {room.isBooked ? "Check Out Guest" : "Mark Booked"}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 bg-white p-8 border border-gray-200 shadow-lg border-l-8 border-l-hotelGold">
          <div className="flex items-center gap-4 mb-6 text-hotelGold"><FaKey /> <h3 className="font-bold uppercase tracking-widest text-sm text-hotelNavy">Security Settings</h3></div>
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="flex-1 border p-3 outline-none focus:border-hotelGold text-sm" />
            <button onClick={changePortalPassword} className="bg-hotelNavy text-hotelGold px-8 py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-black transition-colors">Update Key</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;