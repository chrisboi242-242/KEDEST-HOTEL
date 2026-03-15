import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { FaSyncAlt, FaMoneyBillWave, FaLock, FaKey, FaPowerOff, FaUserCircle, FaCheckCircle, FaExclamationTriangle, FaFileDownload, FaEye, FaEyeSlash } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Admin = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Auth & UI States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const [dbPassword, setDbPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false); // To see what they are typing
  
  // High-End UX States
  const [processingId, setProcessingId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "admin_config");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDbPassword(docSnap.data().portalPassword);
        }
      } catch (err) {
        console.error("Security Fetch Error:", err);
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

  const totalRevenue = rooms
    .filter(room => room.isBooked)
    .reduce((sum, room) => sum + (Number(room.price) || 0), 0);

  const showToast = (msg, type = "success") => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPass === dbPassword) {
      setShowSuccess(true);
      setTimeout(() => {
        setIsAuthenticated(true);
        setShowSuccess(false);
      }, 2000);
    } else {
      showToast("Access Denied: Invalid Key", "error");
    }
  };

  const updateRoomStatus = async (id, currentStatus) => {
    setProcessingId(id);
    try {
      const roomRef = doc(db, "rooms", id);
      const updateData = { 
        isBooked: !currentStatus,
        lastUpdated: new Date().toISOString()
      };
      if (currentStatus === true) {
        updateData.bookedBy = "";
        updateData.contactPhone = "";
      }
      await updateDoc(roomRef, updateData);
      showToast(currentStatus ? "Room Released" : "Room Secured", "success");
    } catch (err) {
      showToast("Sync Failed", "error");
    } finally {
      setProcessingId(null);
    }
  };

  const updatePrice = async (id, newPrice) => {
    // ERROR DETECTION: Prevent trash values
    if (!newPrice || isNaN(newPrice) || Number(newPrice) <= 0) {
      showToast("Invalid Price: Use numbers > 0", "error");
      return;
    }
    setProcessingId(id);
    try {
      const roomRef = doc(db, "rooms", id);
      await updateDoc(roomRef, { 
        price: Number(newPrice),
        lastUpdated: new Date().toISOString()
      });
      showToast("Price Updated", "success");
    } catch (err) {
      showToast("Sync Failed", "error");
    } finally {
      setProcessingId(null);
    }
  };

  const changePortalPassword = async () => {
    // DETECTION: Minimum 6 chars
    if (newPassword.length < 6) return showToast("Too short! Use 6+ chars", "error");
    try {
      const docRef = doc(db, "settings", "admin_config");
      await updateDoc(docRef, { portalPassword: newPassword });
      setDbPassword(newPassword);
      showToast("Vault Updated", "success");
      setNewPassword("");
    } catch (err) {
      showToast("Update Failed", "error");
    }
  };

  const generateAuditPDF = () => {
    try {
      const doc = new jsPDF();
      const today = new Date().toLocaleDateString();
      doc.setFontSize(22);
      doc.setTextColor(184, 134, 11); 
      doc.text("KEDEST", 14, 20);
      const bookedRooms = rooms.filter(r => r.isBooked);
      if (bookedRooms.length === 0) return showToast("No active bookings", "error");
      const tableData = bookedRooms.map(r => [r.name, r.bookedBy || "Guest", r.contactPhone || "N/A", `N${Number(r.price || 0).toLocaleString()}`, r.lastUpdated ? new Date(r.lastUpdated).toLocaleTimeString() : "N/A"]);
      autoTable(doc, { startY: 45, head: [['ROOM', 'GUEST', 'CONTACT', 'RATE', 'TIME']], body: tableData, headStyles: { fillColor: [1, 22, 39], textColor: [184, 134, 11] }});
      const finalY = doc.lastAutoTable?.finalY || 45;
      doc.setFillColor(1, 22, 39);
      doc.rect(14, finalY + 10, 182, 15, 'F');
      doc.setTextColor(184, 134, 11);
      doc.text(`TOTAL REVENUE: N${totalRevenue.toLocaleString()}`, 20, finalY + 20);
      doc.save(`Kedest-Audit-${today}.pdf`);
      showToast("Audit Exported");
    } catch (err) { showToast("PDF Error", "error"); }
  };

  if (showSuccess) {
    return (
      <div className="h-screen bg-hotelNavy flex flex-col items-center justify-center p-6 text-center animate-pulse text-white font-sans">
        <FaCheckCircle className="text-hotelGold text-7xl mb-8 shadow-2xl" />
        <h2 className="font-luxury text-4xl italic mb-4 text-white">Access Granted</h2>
        <p className="text-hotelGold uppercase tracking-[0.5em] text-xs font-bold">Welcome, Commander</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-hotelNavy flex items-center justify-center p-6 font-sans">
        <form onSubmit={handleLogin} className="bg-white p-10 shadow-2xl border-t-8 border-hotelGold max-w-sm w-full text-center relative">
          <FaLock className="text-hotelGold text-4xl mx-auto mb-4" />
          <h2 className="font-luxury text-2xl italic mb-6 text-hotelNavy">Identity Verification</h2>
          <div className="relative mb-8">
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="Enter Master Key"
              className={`w-full border-b py-3 outline-none text-center text-lg tracking-[0.3em] transition-colors ${inputPass.length > 0 ? 'border-hotelGold' : 'border-gray-300'}`}
              value={inputPass}
              onChange={(e) => setInputPass(e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)} 
              className="absolute right-0 top-4 text-gray-400 hover:text-hotelGold"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="w-full bg-hotelNavy text-hotelGold py-4 font-bold uppercase tracking-widest text-xs hover:bg-black transition-all">
            Authorize Entry
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f4f4] min-h-screen p-4 md:p-12 font-sans text-hotelNavy pb-32">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 border-b-2 border-hotelGold pb-6 gap-6">
          <div>
            <h1 className="font-luxury text-4xl italic text-hotelNavy">Kedest Control Tower</h1>
            <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] mt-2 font-bold">Aba Premium Operations</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <button onClick={generateAuditPDF} className="flex items-center gap-2 bg-hotelGold text-hotelNavy px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-white border border-hotelGold transition-all shadow-md"><FaFileDownload /> Daily Audit</button>
            <div className="text-center md:text-right border-l md:border-l-2 border-gray-200 pl-4 md:pl-6">
                <p className="text-[10px] uppercase font-bold text-hotelGold mb-1">Live Revenue</p>
                <p className="text-2xl font-luxury italic leading-none">N{totalRevenue.toLocaleString()}</p>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-red-100 hover:bg-red-600 hover:text-white transition-all"><FaPowerOff /></button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20"><FaSyncAlt className="animate-spin text-hotelGold text-4xl" /></div>
        ) : (
          <div className="space-y-4">
            {rooms.map((room) => (
              <div key={room.docId} className="bg-white p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                {room.isBooked && <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>}
                <div className="flex items-center gap-6 w-full md:w-1/3">
                  <div className="relative shrink-0 mx-auto md:mx-0">
                    <img src={room.image} className="w-16 h-16 object-cover rounded-sm border grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                    {processingId === room.docId && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><FaSyncAlt className="animate-spin text-hotelGold" /></div>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold uppercase text-sm tracking-widest leading-tight">{room.name}</h3>
                    {room.isBooked ? (
                        <div className="mt-1 flex items-center justify-center md:justify-start gap-2 text-red-600">
                            <FaUserCircle className="text-xs" />
                            <div className="flex flex-col overflow-hidden text-left"><span className="text-[10px] font-bold uppercase truncate">{room.bookedBy || "Guest"}</span><span className="text-[9px] text-gray-400">{room.contactPhone}</span></div>
                        </div>
                    ) : <p className="text-green-600 text-[9px] font-bold uppercase mt-1 tracking-tighter">Status: Available</p>}
                  </div>
                </div>

                <div className={`flex flex-col px-6 py-2 rounded-sm border w-full md:w-auto transition-colors duration-300 ${room.price <= 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                  <span className="text-[8px] uppercase font-bold text-gray-400 mb-1">Rate (N)</span>
                  <div className="flex items-center justify-center gap-2">
                    <FaMoneyBillWave className={room.price <= 0 ? 'text-red-500' : 'text-hotelGold'} />
                    <input 
                      type="number" 
                      defaultValue={room.price}
                      disabled={processingId === room.docId}
                      onBlur={(e) => updatePrice(room.docId, e.target.value)}
                      className={`bg-transparent w-28 font-bold outline-none text-lg text-center ${room.price <= 0 ? 'text-red-600' : 'text-hotelNavy'}`}
                    />
                  </div>
                </div>

                <button 
                  disabled={processingId === room.docId}
                  onClick={() => updateRoomStatus(room.docId, room.isBooked)} 
                  className={`w-full md:w-48 py-4 text-[10px] font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-3 ${room.isBooked ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white' : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'}`}
                >
                  {processingId === room.docId ? <FaSyncAlt className="animate-spin" /> : (room.isBooked ? "Check Out" : "Mark Booked")}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 bg-white p-8 border border-gray-200 shadow-lg border-l-8 border-l-hotelGold">
          <div className="flex items-center gap-4 mb-6 text-hotelGold"><FaKey /> <h3 className="font-bold uppercase tracking-widest text-sm text-hotelNavy font-sans">Vault Security</h3></div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input 
                type={showPass ? "text" : "password"} 
                placeholder="New Master Key" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className={`w-full border p-3 outline-none text-sm font-mono transition-colors ${newPassword.length > 0 && newPassword.length < 6 ? 'border-red-500 focus:border-red-500' : 'focus:border-hotelGold'}`} 
              />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400"><FaEye /></button>
              {newPassword.length > 0 && newPassword.length < 6 && <p className="text-[8px] text-red-500 mt-1 uppercase font-bold tracking-widest">Weak Key: Use 6+ Characters</p>}
            </div>
            <button onClick={changePortalPassword} className={`px-8 py-3 font-bold uppercase text-[10px] tracking-widest transition-all ${newPassword.length >= 6 ? 'bg-hotelNavy text-hotelGold hover:bg-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Update Vault</button>
          </div>
        </div>

        <div className="mt-12 text-center pb-10">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-2 font-bold">System Issues?</p>
          <a href="https://wa.me/2348067073060" className="text-hotelGold text-[10px] font-bold uppercase tracking-[0.3em] hover:text-hotelNavy transition-colors inline-block border-b border-transparent hover:border-hotelNavy">Contact Technical Architect</a>
        </div>
      </div>

      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${notification.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
        <div className={`px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border backdrop-blur-md ${notification.type === "success" ? "bg-hotelNavy/95 border-hotelGold text-white" : "bg-red-600 border-red-400 text-white"}`}>
          {notification.type === "success" ? <FaCheckCircle className="text-hotelGold" /> : <FaExclamationTriangle className="text-white" />}
          <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{notification.message}</span>
        </div>
      </div>
    </div>
  );
};

export default Admin;