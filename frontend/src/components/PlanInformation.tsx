import useUser from "@/hooks/useUser";
import UserService from "@/services/UserService";

const PlanInformation = () => {
    const { user, setUser } = useUser();

    const handleSubscribeClick = async () => {
        try {
            const data = await UserService.subscribe();
            setUser(data);
        } catch (error) {
            console.error("Subscription failed:", (error as Error).message);
        }
    };

    const handleCancelSubscriptionClick = async () => {
        try {
            const data = await UserService.cancelSubscription();
            setUser(data);
        } catch (error) {
            console.error("Cancellation failed:", (error as Error).message);
        }
    };

    return (
        <div>
            <h1>Current Plan</h1>
            {user?.userType === "Standard" ? (
                <div>
                    <p>Your current plan: Standard</p>
                    {user?.cards.length > 0 ? (
                        <>
                            <button style={buttonStyle} onClick={handleSubscribeClick}>
                                Purchase Premium
                            </button>
                            <p style={{ color: 'red' }}>Note: This will make a payment from your default card.</p>
                        </>
                    ) : (
                        <p style={{ color: 'red' }}>Please add a card to subscribe to Premium.</p>
                    )}
                </div>
            ) : (
                <div>
                    <button style={buttonStyle} onClick={handleCancelSubscriptionClick}>
                        Switch to Standard
                    </button>
                    <p style={{ color: 'red' }}>Note: Your current subscription is non-refundable.</p>
                </div>
            )}
        </div>
    );
};

const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '5px',
    marginRight: '1rem',
    fontSize: '1rem',
    cursor: 'pointer',
}

export default PlanInformation;
