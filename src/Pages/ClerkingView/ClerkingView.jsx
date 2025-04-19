import NavbarLoggedIn from "../../Components/Navbar/NavbarLoggedIn";
import ClerkingDetails from "../../Components/Clerking/ClerkingDetails";
import ActionButtons from "../../Components/Clerking/ActionButtons";


const ClerkingView = () => {
    return (
        <div>
            <NavbarLoggedIn />
            {/* Add margin-top to account for fixed navbar height */}
            <div className="container mx-auto p-4 mt-20">
                {/*action buttons*/}
                <div className="flex justify-end mb-4">
                    <ActionButtons />
                </div>
                {/*clerking details*/}
                <div>
                    <ClerkingDetails />
                </div>
            </div>
        </div>
    )
}

export default ClerkingView;
