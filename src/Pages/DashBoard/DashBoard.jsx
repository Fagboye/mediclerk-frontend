import NavbarLoggedIn from "../../Components/Navbar/NavbarLoggedIn";
import ClerkingsList from "../../Components/Dashboard/ClerkingList";

const DashBoard = () => {
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