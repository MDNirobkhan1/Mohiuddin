import { MdMenu } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useUser from "../../Security/useUser";
import { FaUserCircle } from "react-icons/fa";
import useSmallScreen from "../../Hooks/useSmallScreen";
import { useCart } from "../../Page/Cart/CartContext";
import './style.css';

const NavbarTop = () => {
  const { cartItems } = useCart();
  const { open, setOpen, sidebarRef } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userData, ,refetch] = useUser();
  const imgUrl = `https://littleaccount.com/uploads/userProfile/`


  const [isTooltipVisible, setTooltipVisible] = useState(false);

  // Handle mouse enter and leave events
  const handleMouseEnter = () => {
      setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
      setTooltipVisible(false);
  };

  const handleLogout = async () => {
    
    try {
      const res = await axiosSecure('/api/logout')
    if(res.data){
      navigate('/login')
      localStorage.removeItem('token')
      toast.success('Logout Successfully')
      window.location.reload();
      refetch()
    }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

 
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
  if(isSmallScreen){
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }
  }, [open, isSmallScreen]);

  useEffect(() => {
    if(isSmallScreen){
      setOpen(false)
    } else{
      setOpen(true)
    }
  }, [isSmallScreen, setOpen])

  return (
    <div className="bg-white py-pt_primary text-_white w-full shadow-md border-b-1 ">
      <ul className="flex gap-gap_primary justify-end px-pt_secondary ">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold  lg:hidden">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black"
          />
        </div>
        
        <Link to="/cart">
        <div className="relative hidden lg:block">
            <i
                className="zmdi zmdi-shopping-cart-plus text-slate-900 text-3xl cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {cartItems.length}
            </i>

            {isTooltipVisible && (
                <div className="absolute z-10 bg-white border text-slate-900  border-gray-300 rounded-md shadow-md p-2 mt-1 right-0 w-48">
                    <h3 className="font-semibold text-sm">Cart Items: {cartItems.length}</h3>
                    {cartItems.length > 0 ? (
                        <ul className="text-sm">
                            {cartItems.map((item, index) => (
                              <>
                                <li>{item.trainer_data.name}</li>
                              <li key={index} className="py-1">
                                    Courses Name: {item.course_name}
                                </li>
                                <div className="flex">
                                <li><span className="line-through text-gray-400 text-sm">
                                 Tk {item.regular_price}
                                </span></li>
                                <li><span className="text-green-600 text-md font-bold ml-2">
                                        -{item.discount_price}%
                                    </span></li>
                                </div>
                                
                                
                              </>
                              
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-xs">Your cart is empty.</p>
                    )}
                </div>
            )}
        </div>
        </Link>
        
       
        <div
          className="flex flex-col items-center justify-center text-text_sm font-semibold relative group"
        >
          <div className="flex items-center gap-10">
            
            <h1 className="text-blue-500 text-xl font-medium">{userData?.userData.name}</h1>
         {userData?.userData.image ? 
         <img
            className="w-[40px] h-[40px] rounded-full"
            src={`${imgUrl}${userData.userData.image}`}
            alt=""
              /> : 
              
          <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black" />}
          </div>
          
          <div className="absolute top-10 right-3 bg-_white shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 group-hover:scale-100 transition-transform duration-300 transform origin-top-right scale-0">
          
            {userData && <Link
              to="/profile"
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
            >
              Profile
            </Link>}
            {userData ? <Link
            onClick={handleLogout}
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
            >
              Logout
            </Link> : 
            <Link
            to='/login'
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
            >
              Login
            </Link>}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavbarTop;
