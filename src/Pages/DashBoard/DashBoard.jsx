import NavbarLoggedIn from "../../Components/Navbar/NavbarLoggedIn";
import ClerkingsList from "../../Components/Dashboard/ClerkingList";
import { useAuth } from "../../context/AuthContext";

const DashBoard = () => {
    const { user } = useAuth();
    console.log(user);
    return ( 
        <div>

            <NavbarLoggedIn />
            <div>
                <ClerkingsList />
            </div>
        </div>
    )
}

export default DashBoard;